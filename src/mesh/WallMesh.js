import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import InstanceMaterial from '../material/InstanceMaterial';
import {prepareData} from 'webgl-core/engine/helpers/geometry';

import wallA from './data/platform/wall-a.json';
import wallB from './data/platform/wall-b.json';
import wallC from './data/platform/wall-c.json';
import wallD from './data/platform/wall-d.json';
import wallE from './data/platform/wall-e.json';


let __material,
    __geometry = {};

export const WALL_A = 'A';
export const WALL_B = 'B';
export const WALL_C = 'C';
export const WALL_D = 'D';
export const WALL_E = 'E';

const geometry = {
    [WALL_A]: wallA,
    [WALL_B]: wallB,
    [WALL_C]: wallC,
    [WALL_D]: wallD,
    [WALL_E]: wallE,
};

export default class WallMesh extends Mesh {
    constructor(context, {
        type = WALL_A,
        ...options
    } = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: WallMesh.getGeometry(context, type),
            material: WallMesh.getMaterial(context)
        });
    }

    static getMaterial(context) {
        if(!__material) {
            __material = new InstanceMaterial(context, {
                textures: {
                    diffuse: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/diffuse.png'),
                    normal: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/normal.png'),
                    emit: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/emit.png')
                }
            });
            window.m = __material;
        }
        return __material;
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
}
