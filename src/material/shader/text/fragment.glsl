varying vec2 vUv;
void main(void) {
    vec4 texture = texture2D(diffuse, vUv);
    gl_FragColor = vec4(texture.rgb, texture.a * opacity);
}