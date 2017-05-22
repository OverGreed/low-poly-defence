import vec3 from 'gl-vec3/fromValues';
import {Renderer} from 'webgl-core/engine/render/Renderer';
import {DisplayPlugin} from 'webgl-core/engine/render/plugin/DisplayPlugin';
import {ShadowPlugin} from 'webgl-core/engine/render/plugin/ShadowPlugin';
import {DeferredPlugin} from 'webgl-core/engine/render/plugin/DeferredPlugin';
import {LightPlugin} from 'webgl-core/engine/render/plugin/LightPlugin';
import {CompositPlugin} from 'webgl-core/engine/render/plugin/CompositPlugin';
import {DepthCamera} from 'webgl-core/engine/object/camera/DepthCamera';
import context from './context';

const light = new LightPlugin(context);
const composit = new CompositPlugin(context);

const deferred = new DeferredPlugin(context);
const depth = new ShadowPlugin(context, {
    width: 1024,
    height: 1024,
    basis: 0.0005,
    max: 5,
    camera: new DepthCamera(context, {
        eye: vec3(2, 2, 2),
        scale: 1.0
    })
});


const game = (scene, meshes) => {

    // Draw Opaque - start
    // Draw Deferred shading textures
    deferred.execute(scene, meshes);
    // Draw Shadow textures
    depth.execute(scene, meshes);



    // Draw Light Textures
    light.execute(scene, meshes, {
        deferred: deferred.renderBuffer,
        shadowSize: depth.size,
        basis: depth.basis
    });
    // Draw Opaque - end

    // Draw Transparent - start
    // TODO implement transparent draw
    // Draw Transparent - end

    composit.execute(scene, [], {
        diffuseMap: deferred.renderBuffer.diffuseMap,
        lightMap: light.renderBuffer.texture.location,
        emitMap: deferred.renderBuffer.emitMap
    });


    // TODO: FXAA
};


const renderer = new Renderer(context, {
    composers: { game }
});

export default renderer;