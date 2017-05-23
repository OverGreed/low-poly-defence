import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import {DeferredMaterial} from 'webgl-core/engine/material/deferred/Material';
import data from './test.json';

for(const key of Object.keys(data)) {
    data[key] = new Float32Array(data[key]);
}
let __material,
    __geometry;
export default class ObjMesh extends Mesh {
    constructor(context, options = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: ObjMesh.getGeometry(context),
            material: ObjMesh.getMaterial(context)
        });
    }

    static getMaterial(context) {
        if(!__material) {
            __material = new DeferredMaterial(context, {
                textures: {
                    diffuse: new Texture(context, { flipY: 1 }).load('textures/asset/diffuse.png'),
                    emit: new Texture(context, { flipY: 1 }).load('textures/asset/emit.png')
                }
            })
        }
        return __material;
    }

    static getGeometry(context) {
        if(!__geometry) {
            __geometry = new SeparateGeometry(context, {
                attributes: {
                    vertex: { component: 3 },
                    uv: { component: 2 },
                    normal: { component: 3 }
                },
                size: data.vertex.length / 3,
                data
            });
        }
        return __geometry;
    }
}
