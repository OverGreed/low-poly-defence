varying vec3 vVertex;
void main() {
    gl_FragColor = textureCube(diffuse, vVertex);
}
