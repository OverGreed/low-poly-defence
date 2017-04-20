import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import MorphMaterial from '../material/MorphMaterial';
import data from './door.json';

for(const target of Object.keys(data)) {
    for(const key of Object.keys(data[target])) {
        data[target][key] = new Float32Array(data[target][key]);
    }
}

let __material,
    __geometry;
export default class DoorMesh extends Mesh {
    constructor(context, options = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: DoorMesh.getGeometry(context),
            material: DoorMesh.getMaterial(context)
        });
    }

    static getMaterial(context) {
        if(!__material) {
            __material = new MorphMaterial(context, {
                textures: {
                    diffuse: new Texture(context, { flipY: 1 }).load('textures/door/diffuse.png')
                }
            })
        }
        return __material;
    }

    static getGeometry(context) {
        if(!__geometry) {
            __geometry = new SeparateGeometry(context, {
                morph: true,
                source: 'open',
                target: 'close',
                attributes: {
                    vertex: { component: 3, morph: true },
                    uv: { component: 2 },
                    normal: { component: 3, morph: true }
                },
                size: data.open.vertex.length / 3,
                data
            });
        }
        return __geometry;
    }
}
