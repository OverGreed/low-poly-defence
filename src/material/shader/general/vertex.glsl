varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vPosition;

void main(void) {
    vUv = uv;
    vNormal = normal;
    vec4 position = vec4(vertex,1.0);
    #ifdef USE_INSTANCE
        position = IMMatrix * position;
        vNormal = INMatrix * vNormal;
    #endif
    vNormal = NMatrix * vNormal;

    vPosition = MMatrix * position;
    #ifdef USE_MORPH
       vNormal = mix(vNormal, NMatrix * normalMorph, morph);
       vPosition = mix(vPosition, MMatrix * vec4(vertexMorph, 1.0), morph);
    #endif
    gl_Position = VPMatrix * vPosition;
}

