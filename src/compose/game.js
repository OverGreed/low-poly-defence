export const game = (scene, meshes) => {
    depth.execute(scene, meshes); // Calculate shadows
    // TODO: Create Deferred textures
    // TODO: Draw Light
    // TODO: FXAA

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

};