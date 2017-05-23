out vec2 vUv;
void main(void) {
    vUv = uv;
    vec4 position = MMatrix * vec4(vertex, 1.0);
    gl_Position = VPMatrix * position;
}