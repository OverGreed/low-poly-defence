#extension GL_OES_standard_derivatives : enable
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vLightPos;
varying vec4 vPosition;

const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));

float unpackDepth(const in vec4 rgbaDepth) {
  return dot(rgbaDepth, bitShift);
}

float shadowMap(sampler2D texture, vec3 light) {
    return max(1. -smoothstep(0.002, 0.003, light.z-texture2D(texture, light.xy).r), 0.1);
}

float texture2DCompare(sampler2D depths, vec2 uv, float compare){
    float depth = unpackDepth(texture2D(depths, uv));
    return step(compare, depth);
}

float texture2DShadowLerp(sampler2D depths, vec2 size, vec2 uv, float compare){
    vec2 texelSize = vec2(1.0)/size;
    vec2 f = fract(uv*size+0.5);
    vec2 centroidUV = floor(uv*size+0.5)/size;

    float lb = texture2DCompare(depths, centroidUV+texelSize*vec2(0.0, 0.0), compare);
    float lt = texture2DCompare(depths, centroidUV+texelSize*vec2(0.0, 1.0), compare);
    float rb = texture2DCompare(depths, centroidUV+texelSize*vec2(1.0, 0.0), compare);
    float rt = texture2DCompare(depths, centroidUV+texelSize*vec2(1.0, 1.0), compare);
    float a = mix(lb, lt, f.y);
    float b = mix(rb, rt, f.y);
    float c = mix(a, b, f.x);
    return c;
}

float PCF(sampler2D depths, vec2 size, vec2 uv, float compare){
    float result = 0.0;
    for(int x=-1; x<=1; x++) {
        for(int y=-1; y<=1; y++) {
            vec2 off = vec2(x, y) / size *2.0;
            result += texture2DShadowLerp(depths, size, uv+off, compare);
        }
    }
    return result / 9.0;
}

float getShadow(Light light, int pos) {
    float shade = 1.0;
    for(int num =0; num<MAX_SHADOW; num++) {
        if(num!=pos) {
            continue;
        }
        vec4 lightPosRaw = light.matrix * vPosition;
        vec3 lightPos = (lightPosRaw.xyz/lightPosRaw.w) / 2.0 + 0.5;
        shade =  max(PCF(shadows[num], shadowSize, lightPos.xy, lightPos.z - basis), 0.1);
    }

    return shade;
}

vec3 getDirectionLight(Light light, vec3 normal, vec3 viewDir) {
    vec3 lightDir = normalize(light.direction);
    vec3 halfwayDir = normalize(lightDir + viewDir);

    float diff = max(dot(normal, -lightDir), 0.0);
    float specular = pow(max(dot(normal, -halfwayDir), 0.0), shininess);

    return light.color * ( diff + specular);
}

vec3 getPointLight(Light light, vec3 normal, vec3 viewDir, vec3 position) {
    vec3 lightDir = position - light.position;
    float distanceToLight = length(lightDir);
    lightDir = normalize(lightDir);

    float spot = light.type == 4 ? smoothstep(
        light.angle,
        light.angle - light.penumbra,
        degrees(acos(dot(lightDir, light.direction)))
    ) : 1.0;

    if(spot > 0.0) {
        vec3 halfwayDir = normalize(lightDir + viewDir);

        float diff = max(dot(normal, -lightDir), 0.0);
        float specular = pow(max(dot(normal, -halfwayDir), 0.0), shininess);

        float distance = 1.0 - min( ( length(distanceToLight) / light.distance ), 1.0 );

        return light.color * ( diff + specular) * distance * spot;
    }
    return vec3( 0.0, 0.0, 0.0);
}

vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
    vec3 q0 = dFdx( eye_pos.xyz );
    vec3 q1 = dFdy( eye_pos.xyz );
    vec2 st0 = dFdx( uv.st );
    vec2 st1 = dFdy( uv.st );
    vec3 S = normalize( q0 * st1.t - q1 * st0.t );
    vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
    vec3 N = normalize( surf_norm );
    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;
    mapN.xy = normalScale * mapN.xy;
    mat3 tsn = mat3( S, T, N );
    return normalize( tsn * mapN );
}

mat3 cotangent_frame(vec3 N, vec3 p, vec2 uv)
{
    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx( p );
    vec3 dp2 = dFdy( p );
    vec2 duv1 = dFdx( uv );
    vec2 duv2 = dFdy( uv );

    // solve the linear system
    vec3 dp2perp = cross( dp2, N );
    vec3 dp1perp = cross( N, dp1 );
    vec3 T = normalize(dp2perp * duv1.x + dp1perp * duv2.x);
    vec3 B = normalize(dp2perp * duv1.y + dp1perp * duv2.y);

    // construct a scale-invariant frame
    float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );
    return mat3( normalize(T) * invmax, B * invmax, N );
}

vec3 perturb_normal( vec3 N, vec3 V, vec2 texcoord ) {
    // assume N, the interpolated vertex normal and
    // V, the view vector (vertex to eye)
    vec3 map = texture2D(normalMap, texcoord ).xyz;
    map = map  * 2.0 - 1.0;
    map.xy = normalScale * map.xy;
    mat3 TBN = cotangent_frame(N, -V, texcoord);
    return normalize(TBN * map);
}

void main(void) {
    vec4 emit = texture2D(emissiveMap, vUv);

    vec4 texture = texture2D(diffuseMap, vUv);
    vec3 position = vec3(vPosition);
    vec3 normal = perturbNormal2Arb(vPosition.xyz, vNormal, vUv); // perturb_normal(normalize(vNormal), -normalize(vec3(vPosition)), vUv);//

    vec3 viewDir = -normalize(camera - position);

    vec3 power = vec3(0.0, 0.0, 0.0);
    int pos = 0;
    for(int num = 0; num < MAX_LIGHT; num++) {
        if(num==lightCount) {
            break;
        }
        Light light = lights[num];
        if(light.type == 1 ) { //abmient
            power += light.color;
        } else {
            vec3 color = vec3(0.0, 0.0, 0.0);
            float shade = 1.0;

            if(shadow && light.shadow && pos< MAX_SHADOW) {
                shade = getShadow(light, pos);
                pos++;
            }
            if(shade > 0.0) {
                if(light.type == 2) { // Directional
                    color = getDirectionLight(light, normal, viewDir);
                } else if(light.type == 3 ||light.type ==4) { // Point
                    color = getPointLight(light, normal, viewDir, position);
                }
                color *= light.power * shade;
            }
            power += color;
        }
    }

    gl_FragColor = vec4((texture.rgb * power) + emit.rgb * emit.a, texture.a * opacity);
    //gl_FragColor = vec4(normal, 1.0);
}