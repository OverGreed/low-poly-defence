import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';

import {InstanceMaterial} from 'webgl-core/engine/material/deferred/InstanceMaterial';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import {prepareData} from 'webgl-core/engine/helpers/geometry';
import {BlendingOneOne} from 'webgl-core/engine/material/blending/one-one';
import {BlendingOne} from 'webgl-core/engine/material/blending/one';
import {BlendingOpacity} from 'webgl-core/engine/material/blending/opacity';

import crateA from './data/asset/create-a.json';
import crateB from './data/asset/create-b.json';

let __geometry = {},
    __material;

export const CRATE_A = 'A';
export const CRATE_B = 'B';

const geometry = {
    [CRATE_A]: crateA,
    [CRATE_B]: crateB
};

export default class CrateMesh extends Mesh {
    constructor(context, {
        type = CRATE_A,
        ...options
    } = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: CrateMesh.getGeometry(context, type),
            material: CrateMesh.getMaterial(context)
        });
    }

    static getGeometry(context, type) {
        if(!__geometry[type]) {
            const data = prepareData(geometry[type]);
            __geometry[type] = new SeparateGeometry(context, {
                attributes: {
                    vertex: { component: 3 },
                    uv: { component: 2 },
                    normal: { component: 3 }
                },
                size: data.vertex.length / 3,
                data
            });
        }
        return __geometry[type];
    }

    static getMaterial(context) {
        const gl = context.gl;
        if(!__material) {
            __material = new InstanceMaterial(context, {
                blending: (gl) => gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA),
                face: gl.BACK,
                textures: {
                    diffuse: new Texture(context, { flipY: 1 }).load('textures/asset/diffuse.png'),
                    emit: new Texture(context, { flipY: 1 }).load('textures/asset/emit.png'),
                    normal: new Texture(context, { flipY: 1 }).load('textures/asset/normal.png')
                }
            })
        }
        return __material;
    }

}
