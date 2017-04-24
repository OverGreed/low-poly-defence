import vec3 from 'gl-vec3/fromValues';
import add from 'gl-vec3/add';
import normalize from 'gl-vec3/normalize';
import {Scene} from 'webgl-core/engine/scene/Scene';
import {PerspectiveCamera} from 'webgl-core/engine/object/camera/PerspectiveCamera';
import context from '../context';
import SkyCubeMesh from '../../mesh/SkyCubeMesh';
import LampMesh from '../../mesh/LampMesh';
import CrateMesh from '../../mesh/CrateMesh';
import WallMesh from '../../mesh/WallMesh';
import FloorMesh from '../../mesh/FloorMesh';
import BridgeMesh from '../../mesh/BridgeMesh';
import {Container} from 'webgl-core/engine/object/mesh/Container';

import {AmbientLight} from 'webgl-core/engine/object/light/AmbientLight';
import {DirectionalLight} from 'webgl-core/engine/object/light/DirectionalLight';
import {SpotLight} from 'webgl-core/engine/object/light/SpotLight';
import {toRad} from 'webgl-core/engine/helpers/math';

import {Mesh} from 'webgl-core/engine/object/mesh/Mesh';
import {Instance} from 'webgl-core/engine/object/mesh/Instance';
import InstanceMaterial from '../../material/InstanceMaterial';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import Map from '../level/Map';

class Game extends Scene {
    tick(diff){
        super.tick(diff);
        this.meshes[0].rotate.y += diff * 0.0005;
    }
}

const center = vec3(0.0,0.0,0.0);
const pos = vec3(3.5, 3.5, -3.5);
const dir = vec3(-1.5, -1.5, 1.5);
add(center, pos, dir);
//add(this.camera.center, this.position, this.direction);
const game = new Game(context,  {
    camera: new PerspectiveCamera(context, {
        perspective: true,
        eye: vec3(-7.5, 7.5, 7.5),
        //eye: vec3(3.5, 3.5, 0.0),
        center: vec3(-1.5, -1.5, 0.0),
        //eye: clone(pos),
        //center: clone(center),
        fov: 45
    })
});

const map = new Map(context, game, {
    wall: WallMesh,
    floor: FloorMesh,
    lamp: LampMesh,
    crate: CrateMesh,
    bridge: BridgeMesh
});

map.container.position.x = -7;
map.container.position.z = 3;

const container = new Container();
container.children.add(map.container);
game.meshes.push(container);

map.load([
    {entity: 'wall', type:'A'},
    {entity: 'wall', type:'B', position: [3,0,0]},
    {entity: 'wall', type:'C', position: [-1,0,0]},
    {entity: 'wall', type:'D', position: [-1,0,-5], rotate:[0,toRad(-90),0]},
    {entity: 'wall', type:'D', position: [-2,0,-2]},
    {entity: 'wall', type:'C', position: [-3,0,-2]},
    {entity: 'wall', type:'C', position: [-3,0,-4], rotate:[0,toRad(-90),0]},
    {entity: 'wall', type:'C', position: [-1,0,-6], rotate:[0,toRad(-90),0]},
    {entity: 'wall', type:'A', position: [6,0,0]},
    {entity: 'wall', type:'C', position: [7,0,0], rotate:[0,toRad(90),0]},
    {entity: 'wall', type:'A', position: [-3,0,-3], rotate:[0,toRad(-90),0]},
    {entity: 'wall', type:'C', position: [7,0,-6], rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'A', position: [6,0,-6], rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'B', position: [3,0,-6], rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'A', position: [0,0,-6], rotate:[0,toRad(180),0]},
    {entity: 'lamp', type:'B', position: [14,0,-1]},
    {entity: 'lamp', type:'B', position: [14,0,-5]},
    {entity: 'lamp', type:'A', position: [-1,0,-6]},
    {entity: 'lamp', type:'A', position: [-1,0,0]},

    //{entity: 'lamp', type:'B', position: [-1,0,-3]},
    {entity: 'lamp', type:'B', position: [5,0,-4]},
    {entity: 'lamp', type:'B', position: [5,0,-2]},

    {entity: 'floor', type:'B', position: [0,0,-1], rotate:[0, 0, 0]},
    {entity: 'floor', type:'A', position: [-2,0,-3], rotate:[0, toRad(-90), 0]},
    {entity: 'floor', type:'C', position: [0,0,-3], rotate:[0, toRad(90), 0]},
    {entity: 'floor', type:'B', position: [0,0,-5], rotate:[0, toRad(-90), 0]},
    {entity: 'floor', type:'C', position: [2,0,-1], rotate:[0, toRad(180), 0]},
    {entity: 'floor', type:'A', position: [2,0,-3]},
    {entity: 'floor', type:'C', position: [2,0,-5]},
    {entity: 'floor', type:'C', position: [4,0,-1], rotate:[0, toRad(180), 0]},
    {entity: 'floor', type:'A', position: [4,0,-3]},
    {entity: 'floor', type:'C', position: [4,0,-5]},
    {entity: 'floor', type:'B', position: [6,0,-1], rotate:[0, toRad(90), 0]},
    {entity: 'floor', type:'C', position: [6,0,-3]},
    {entity: 'floor', type:'B', position: [6,0,-5], rotate:[0, toRad(180), 0]},

    {entity: 'wall', type:'C', position: [1,0,3]},
    {entity: 'wall', type:'C', position: [1,0,3],rotate:[0,toRad(90),0]},
    {entity: 'wall', type:'C', position: [1,0,3],rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'C', position: [1,0,3],rotate:[0,toRad(-90),0]},
    {entity: 'lamp', type:'B', position: [1,0,3]},
    {entity: 'wall', type:'E', position: [1,0,1]},

    {entity: 'wall', type:'C', position: [5,0,3]},
    {entity: 'wall', type:'C', position: [5,0,3],rotate:[0,toRad(90),0]},
    {entity: 'wall', type:'C', position: [5,0,3],rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'C', position: [5,0,3],rotate:[0,toRad(-90),0]},
    {entity: 'lamp', type:'B', position: [5,0,3]},
    {entity: 'wall', type:'E', position: [5,0,1]},

    {entity: 'wall', type:'C', position: [5,0,-9]},
    {entity: 'wall', type:'C', position: [5,0,-9],rotate:[0,toRad(90),0]},
    {entity: 'wall', type:'C', position: [5,0,-9],rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'C', position: [5,0,-9],rotate:[0,toRad(-90),0]},
    {entity: 'lamp', type:'B', position: [5,0,-9]},
    {entity: 'wall', type:'E', position: [5,0,-8]},

    {entity: 'wall', type:'C', position: [1,0,-9]},
    {entity: 'wall', type:'C', position: [1,0,-9],rotate:[0,toRad(90),0]},
    {entity: 'wall', type:'C', position: [1,0,-9],rotate:[0,toRad(180),0]},
    {entity: 'wall', type:'C', position: [1,0,-9],rotate:[0,toRad(-90),0]},
    {entity: 'lamp', type:'B', position: [1,0,-9]},
    {entity: 'wall', type:'E', position: [1,0,-8]},

    {entity: 'crate', type:'A', position: [-3,0,-3.7], rotate:[0,toRad(15),0]},
    {entity: 'crate', type:'A', position: [-3,0,-2.3], rotate:[0,toRad(-55),0]},
    {entity: 'crate', type:'A', position: [-3,1,-3], rotate:[0,toRad(0),0]},
    {entity: 'crate', type:'B', position: [14,0,-3],rotate:[0,toRad(-90),0]},
    {entity: 'bridge', type:'A', position: [7, 0, -3],rotate: [0, toRad(90), 0]},
    {entity: 'bridge', type:'B', position: [9, 0, -3],rotate: [0, toRad(90), 0]},
    {entity: 'bridge', type:'A', position: [13, 0, -3],rotate: [0, toRad(-90), 0]},
    {entity: 'wall', type:'C', position: [13,0, 0]},
    {entity: 'wall', type:'C', position: [13,0, -6],rotate: [0, toRad(-90), 0]},
    {entity: 'wall', type:'A', position: [14,0, -6],rotate: [0, toRad(180), 0]},
    {entity: 'wall', type:'C', position: [15,0, -6],rotate: [0, toRad(180), 0]},
    {entity: 'wall', type:'B', position: [15,0, -4],rotate: [0, toRad(90), 0]},
    {entity: 'wall', type:'C', position: [15,0, 0],rotate: [0, toRad(90), 0]},
    {entity: 'wall', type:'A', position: [14,0, 0]},
    {entity: 'wall', type:'A', position: [15,0, -1],rotate: [0, toRad(90), 0]},
    {entity: 'floor', type:'A', position: [14,0,-5]},
    {entity: 'floor', type:'A', position: [14,0,-3]},
    {entity: 'floor', type:'A', position: [14,0,-1]},
]);


game.lights.push(new AmbientLight(context, {
    color: vec3(0.6, 0.6, 0.6)
}));

game.lights.push(new DirectionalLight(context, {
    shadow: true,
    color: vec3(1.0, 1.0, 1.0),
    direction: vec3(-1.5, -1.5, -1.5)
}));

/*
game.lights.push(new PointLight(context, {
    color: vec3(1.0, 1.0, 1.0),
    position: vec3(1.5, 1.5, 0.0),
    distance: 5
}));
*/

const spot = new SpotLight(context, {
    color: vec3(1.0, 1.0, 1.0),
    position: pos,
    direction: dir,
    distance: 15,
    angle: 70,
    penumbra: 2,
    shadow: true,
    power: 2
});

normalize(spot.direction, spot.direction);

//game.lights.push(spot);
/*
const test = new Mesh({
    shadow: {
        drop: true,
        receive: true
    },
    instance: new Instance(context, {
        component: 16,
        data:[
            {position: [0,0.5,0], rotate:[0,  toRad(-90), 0]},
            {position: [2,0.5,0]},
        ]
    }),
    material: new InstanceMaterial(context, {
        textures: {
            diffuse: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/diffuse.png'),
            normal: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/normal.png'),
            emit: new Texture(context, { flipY: 1, anisotropy: 16 }).load('textures/platform/emit.png')
        }
    }),
    geometry: WallMesh.getGeometry(context, 'A')
});
game.meshes.push(test);
*/
game.meshes.push(new SkyCubeMesh(context));
export default game;