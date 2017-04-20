varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vPosition;

void main(void) {
    vUv = uv;
    vNormal = NMatrix * normal;
    vPosition = MMatrix * vec4(vertex, 1.0);
    #ifdef USE_MORPH
       vNormal = mix(vNormal, NMatrix * normalMorph, morph);
       vPosition = mix(vPosition, MMatrix * vec4(vertexMorph, 1.0), morph);
    #endif
    gl_Position = VPMatrix * vPosition;
}

