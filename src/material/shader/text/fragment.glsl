in vec2 vUv;
out vec4 fragColor;
void main(void) {
    vec4 texture = texture(diffuse, vUv);
    fragColor = vec4(texture.rgb, texture.a * opacity);
}