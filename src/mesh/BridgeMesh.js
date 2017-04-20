import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import WallMesh from './WallMesh';
import {prepareData} from 'webgl-core/engine/helpers/geometry';

import bridgeA from './data/platform/bridge-a.json';
import bridgeB from './data/platform/bridge-b.json';

let __geometry = {};

export const BRIDGE_A = 'A';
export const BRIDGE_B = 'B';

const geometry = {
    [BRIDGE_A]: bridgeA,
    [BRIDGE_B]: bridgeB
};

export default class BridgeMesh extends Mesh {
    constructor(context, {
        type = BRIDGE_A,
        ...options
    } = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: BridgeMesh.getGeometry(context, type),
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
