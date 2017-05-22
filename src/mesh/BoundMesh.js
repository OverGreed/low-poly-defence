import {Mesh} from 'webgl-core/engine/object/mesh';
import {SphereGeometry} from 'webgl-core/engine/geometry/SphereGeometry';
import GeneralMaterial from '../material/GeneralMaterial';
import {Texture} from 'webgl-core/engine/material/texture/Texture';

let __geometry,
    __material;

export default class BoundMesh extends Mesh {
    constructor(context, {distance, ...options} = {
    }) {
        super({
            ...options,
            geometry: BoundMesh.getGeometry(context),
            material: BoundMesh.getMaterial(context)
        });
        this.scale.x = distance;
        this.scale.y = distance;
        this.scale.z = distance;
    }

    static getGeometry(context) {
        if(!__geometry) {
            __geometry = new SphereGeometry(context, {
                latitude: 10,
                longitude: 10,
            });
        }
        return __geometry;
    }

    static getMaterial(context) {
        if(!__material) {
            __material = new GeneralMaterial(context, {
                face: context.gl.FRONT,
                textures: {
                    diffuse: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/dummy/tile.jpg'),
                    normal: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/normal.png'),
                    emit: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/emit.png')
                }
            });
            window.m = __material;
        }
        return __material;
    }
}
