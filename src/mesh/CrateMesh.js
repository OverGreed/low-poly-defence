import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import LampMesh from './LampMesh';
import {prepareData} from 'webgl-core/engine/helpers/geometry';

import crateA from './data/asset/create-a.json';
import crateB from './data/asset/create-b.json';

let __geometry = {};

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
            material: LampMesh.getMaterial(context)
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
