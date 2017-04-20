varying vec3 vVertex;
void main() {
    vVertex = vertex;
    vVertex.z =  -vVertex.z;

    gl_Position = (VPMatrix * vec4(vertex, 1.0)).xyww;
}
