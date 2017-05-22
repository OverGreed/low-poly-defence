import {Mesh} from 'webgl-core/engine/object/mesh';
import {PlaneUIGeometry} from 'webgl-core/engine/geometry/PlaneUIGeometry';
import UiMaterial from '../material/UiMaterial';

let __geometry;
export default class PlaneMesh extends Mesh {
    constructor(context, options = {}) {
        super({
            ...options,

            geometry: PlaneMesh.getGeometry(context),
            material: new UiMaterial(context, {
                face: context.gl.FRONT,
                textures: {

                }
            })
        });
    }

    static getGeometry(context) {
        if(!__geometry) {
            __geometry = new PlaneUIGeometry(context, {
                width: 300,
                height: 200
            });
        }
        return __geometry;
    }
}
