import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import WallMesh from './WallMesh';
import {prepareData} from 'webgl-core/engine/helpers/geometry';

import floorA from './data/platform/floor-a.json';
import floorB from './data/platform/floor-b.json';
import floorC from './data/platform/floor-c.json';
import floorD from './data/platform/floor-d.json';


const __geometry = {};

export const FLOOR_A = 'A';
export const FLOOR_B = 'B';
export const FLOOR_C = 'C';
export const FLOOR_D = 'D';

const geometry = {
    [FLOOR_A]: floorA,
    [FLOOR_B]: floorB,
    [FLOOR_C]: floorC,
    [FLOOR_D]: floorD,
};

export default class FloorMesh extends Mesh {
    constructor(context, {
        type = FLOOR_A,
        ...options
    } = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: FloorMesh.getGeometry(context, type),
            material: WallMesh.getMaterial(context)
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
}
