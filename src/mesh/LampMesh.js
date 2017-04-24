import {Mesh} from 'webgl-core/engine/object/mesh';
import {SeparateGeometry} from 'webgl-core/engine/geometry/SeparateGeometry';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import GeneralMaterial from '../material/GeneralMaterial';
import {prepareData} from 'webgl-core/engine/helpers/geometry';
import {PointLight} from 'webgl-core/engine/object/light/PointLight';
import vec3 from 'gl-vec3/fromValues';
import transformMat4 from 'gl-vec3/transformMat4';
import lampA from './data/asset/lamp-a.json';
import lampB from './data/asset/lamp-b.json';

let __material,
    __geometry = {};

export const LAMP_A = 'A';
export const LAMP_B = 'B';

const geometry = {
    [LAMP_A]: lampA,
    [LAMP_B]: lampB
};

const lightA = vec3(0.0, 0.2, 0.0);
const lightB = vec3(0.0, 1.0, 0.0);

export default class LampMesh extends Mesh {
    constructor(context, {
        type = LAMP_A,
        light = {
            power: 1,
            distance: 6,
            color: vec3(0.5882, 0.93333, 1.0)
        },
        ...options
    } = {}) {
        super({
            shadow: {
                drop: true,
                receive: true
            },
            ...options,
            geometry: LampMesh.getGeometry(context, type),
            material: LampMesh.getMaterial(context)
        });
        this.light = new PointLight(context, light);
        this.type = type;
        this.light.active = this.active;
    }

    get active() {
        return this.__active;
    }

    set active(active) {
        this.__active = active;
        if(this.light) {
            this.light.active = active;
        }
    }

    matrix(parent) {
        super.matrix(parent);
        transformMat4(this.light.position, this.type === LAMP_A ? lightA : lightB, this.final);
        return this;
    }

    static getMaterial(context) {
        if(!__material) {
            __material = new GeneralMaterial(context, {
                textures: {
                    diffuse: new Texture(context, { flipY: 1 }).load('textures/asset/diffuse.png'),
                    emit: new Texture(context, { flipY: 1 }).load('textures/asset/emit.png'),
                    normal: new Texture(context, { flipY: 1 }).load('textures/asset/normal.png')
                }
            })
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
