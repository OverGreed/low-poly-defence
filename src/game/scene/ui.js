import vec3 from 'gl-vec3/fromValues';
import {Scene} from 'webgl-core/engine/scene/Scene';
import {Camera2D} from 'webgl-core/engine/object/camera/Camera2D';
import context from '../context';
import FpsMesh from '../../mesh/FpsMesh';

const ui = new Scene(context, {
    camera: new Camera2D(context, {
        eye: vec3(0, 0, 1.0)
    })
});

export const fps = new FpsMesh(context);
ui.meshes.push(fps);

export default ui;