import {Mesh} from 'webgl-core/engine/object/mesh';
import {CubeGeometry} from 'webgl-core/engine/geometry/CubeGeometry';
import {CubeTexture} from 'webgl-core/engine/material/texture/CubeTexture';
import SkyCubeMaterial from '../material/SkyCubeMaterial';

export default class SkyCubeMesh extends Mesh {
    /**
     *
     * @param {Context} context
     * @param {Object} options
     */
    constructor(context, options = {}) {
        super({
            shadow: {
                drop: false,
                receive: false
            },
            ...options,
            geometry: new CubeGeometry(context),
            material: new SkyCubeMaterial(context, {
                face: context.gl.FRONT,
                textures: {
                    diffuse: new CubeTexture(context, {
                        flipY: 0,
                        wrapS: context.gl.CLAMP_TO_EDGE,
                        wrapT: context.gl.CLAMP_TO_EDGE
                    }).load([
                        'textures/skyCube/right.png',
                        'textures/skyCube/left.png',
                        'textures/skyCube/top.png',
                        'textures/skyCube/bottom.png',
                        'textures/skyCube/back.png',
                        'textures/skyCube/front.png',
                    ])
                }
            })
        });
    }
}
