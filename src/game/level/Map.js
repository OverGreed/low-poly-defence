import {Container} from 'webgl-core/engine/object/mesh/Container';

export default class Map {
    constructor(context, scene, options) {
        this._context = context;
        this._scene = scene;
        this.options = options;
        this.container = new Container(context);
    }

    /**
     *
     * @param {Array<Object>} data
     */
    load(data = []) {
        console.log(data.length)
        for(let item of data) {
            this.add(item);
        }
    }

    add(item) {
        const {entity, ...options} = item;
        const mesh = new this.options[entity](this._context, options);
        this.container.children.add(mesh);
        if(mesh.light) {
            this._scene.lights.push(mesh.light)
        }
    }

    remove(mesh) {

    }
}