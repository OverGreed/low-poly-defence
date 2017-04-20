import {Material} from 'webgl-core/engine/material/Material';
import {BlendingOne} from 'webgl-core/engine/material/blending/one';
import {Uniform} from 'webgl-core/engine/material/program/data/Uniform';
import fragment from './shader/text/fragment.glsl';
import vertex from './shader/text/vertex.glsl';

const program = {
    attributes: [
        {name: 'vertex', type: 'vec3'},
        {name: 'uv', type: 'vec2'}
    ],
    uniforms: [
        {name: 'VPMatrix', type: 'mat4', source: Uniform.scene('camera','final'), fragment: false},
        {name: 'MMatrix', type: 'mat4', source: Uniform.mesh('final'), fragment: false},
        {name: 'opacity', type: 'float', source: Uniform.mesh('material', 'opacity'), vertex: false},
        {name: 'diffuse', index: 0, type: 'sampler2D', source: Uniform.texture('diffuse'), vertex: false}
    ],
    shader: {
        fragment: {
            precision: 'highp',
            source: fragment
        },
        vertex: {
            precision: 'highp',
            source: vertex
        }
    }
};
export default class TextMaterial extends Material {
    constructor(context, options) {
        super(context, {
            transparent: true,
            blending: BlendingOne,
            program,
            ...options,
        });
    }
}