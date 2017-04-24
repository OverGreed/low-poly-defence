import vec3 from 'gl-vec3/fromValues';
import {Renderer} from 'webgl-core/engine/render/Renderer';
import {DisplayPlugin} from 'webgl-core/engine/render/plugin/DisplayPlugin';
import {DepthPlugin} from 'webgl-core/engine/render/plugin/DepthPlugin';
import {DepthCamera} from 'webgl-core/engine/object/camera/DepthCamera';
import context from './context';

const display = new DisplayPlugin(context);
const depth = new DepthPlugin(context, {
    width: 1024,
    height: 1024,
    basis: 0.0005,
    max: 5,
    camera: new DepthCamera(context, {
        eye: vec3(2, 2, 2),
        scale: 1.0
    })
});

const renderer = new Renderer(context, {
    composer: (scene, meshes) => {
        let start = performance.now();
        depth.execute(scene, meshes);
        let end = performance.now();
        const lights = [],
              shadows = [];
        for(let light of scene.lights) {
            if(!light.active) {
                continue;
            }
            lights.push(light);
            if(light.shadow) {
                shadows.push(light.texture)
            }
            if(light === 20) {
                break;
            }

        }

        display.execute(scene, meshes, {
            lights,
            shadows,
            size: depth.size,
            basis: depth.basis
        });
        let end1 = performance.now();
        document.getElementById('debug').innerHTML = `
            Depth Plugin Time: ${(end - start).toFixed(4)}<br>
            Display Plugin Time: ${(end1 - end).toFixed(4)}<br>
            Render Calls: ${context.rc}
        `;

    }
});

export default renderer;