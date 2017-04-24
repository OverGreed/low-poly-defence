import {Material} from 'webgl-core/engine/material/Material';
import {Uniform} from 'webgl-core/engine/material/program/data/Uniform';
import fragment from './shader/general/fragment.glsl';
import vertex from './shader/general/vertex.glsl';

const program = {
    define: {
        fragment:[
            'MAX_LIGHT 20',
            'MAX_SHADOW 5'
        ],
        vertex: [
            'USE_INSTANCE'
        ]
    },
    attributes: [
        {name: 'vertex', type: 'vec3'},
        {name: 'normal', type: 'vec3'},
        {name: 'uv', type: 'vec2'},
        {name: 'IMMatrix', type: 'mat4'},
        {name: 'INMatrix', type: 'mat3'}
    ],
    uniforms: [
        {name: 'VPMatrix', type: 'mat4', source: Uniform.scene('camera', 'final'), fragment: false},
        {name: 'camera', type:'vec3', source: Uniform.scene('camera', 'eye'), vertex: false},
        {name: 'MMatrix', type: 'mat4', source: Uniform.mesh('final'), fragment: false},
        {name: 'NMatrix', type: 'mat3', source: Uniform.mesh('normal'), fragment: false},
        {name: 'opacity', type: 'float', source: Uniform.mesh('material', 'opacity'), vertex: false},
        {name: 'shininess', type: 'float', source: Uniform.mesh('material', 'shininess'), vertex: false},
        {name: 'diffuseMap', index: 0, type: 'sampler2D', source: Uniform.texture('diffuse'), vertex: false},
        {name: 'normalMap', index: 1, type: 'sampler2D', source: Uniform.texture('normal'), vertex: false},
        {name: 'normalScale',type: 'float', source: Uniform.mesh('material', 'normal'), vertex: false},
        {name: 'emissiveMap', index: 2, type: 'sampler2D', source: Uniform.texture('emit'), vertex: false},
        {name: 'shadowSize', type: 'vec2', source: Uniform.data('size'), vertex: false},
        {name: 'shadow', type: 'bool', source: Uniform.mesh('shadow', 'receive'), vertex: false},
        {name: 'basis', type: 'float', source: Uniform.data('basis'), vertex: false},
        {name: 'shadows', index: 3, array: 5, type: 'sampler2D', source: Uniform.data('shadows'), vertex: false},
        {name: 'lights', type: {
            name: 'Light',
            data: [
                { name: 'type', type: 'int' },
                { name: 'color', type: 'vec3' },
                { name: 'direction', type: 'vec3' },
                { name: 'angle', type: 'float' },
                { name: 'penumbra', type: 'float' },
                { name: 'position', type: 'vec3' },
                { name: 'power', type: 'float' },
                { name: 'distance', type: 'float' },
                { name: 'shadow', type: 'bool' },
                { name: 'matrix', type: 'mat4' }
            ]
        },  array: 20, source: Uniform.data('lights'), vertex: false},

        {name:'lightCount', type:'int', source: Uniform.scene('lights', 'length'), vertex: false }
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
export default class InstanceMaterial extends Material {
    constructor(context, {
        shininess = 50,
        normal = 1.0,
        ...options
    }) {
        super(context, {
            program,
            ...options,
        });
        this.shininess = shininess;
        this.normal = normal;
    }
}