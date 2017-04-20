import {Material} from 'webgl-core/engine/material/Material';
import {Uniform} from 'webgl-core/engine/material/program/data/Uniform';
import fragment from './shader/skyCube/fragment.glsl';
import vertex from './shader/skyCube/vertex.glsl';

const program = {
    attributes: [
        {name: 'vertex', type: 'vec3'}
    ],
    uniforms: [
        {name: 'VPMatrix', type: 'mat4', source: Uniform.scene('camera','rotateFinal'), fragment: false},
        {name: 'diffuse', index: 0, type: 'samplerCube', source: Uniform.texture('diffuse'), vertex: false}
    ],
    shader: {
        fragment: {
            precision: 'mediump',
            source: fragment
        },
        vertex: {
            precision: 'highp',
            source: vertex
        }
    }
};

export default class SkyCubeMaterial extends Material {
    constructor(context, options) {
        super(context, {
            transparent: false,
            program,
            ...options,
        });
    }
}