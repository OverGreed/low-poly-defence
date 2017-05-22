import {Container} from 'webgl-core/engine/object/mesh/Container';
import {Instance} from 'webgl-core/engine/object/mesh/Instance';

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
        const struct = {};
        for(let item of data) {
            const {entity, type, ...options} = item;
            const hash = entity + type;
            if(!struct[hash]){
                struct[hash] = {
                    entity,
                    type,
                    instances: []
                };
            }
            struct[hash].instances.push({type, ...options});
        }

        Object.keys(struct).forEach((key)=> {
            const {entity, type, instances} = struct[key];
            if(entity === 'lamp') {
                instances.forEach((instance) => {
                    const mesh = new this.options[entity](this._context, {
                        type,
                        ...instance
                    });
                    if(mesh.light) {
                        this._scene.lights.push(mesh.light);
                    }
                    if(mesh.bound){
                        this.container.children.add(mesh.bound);
                    }
                    this.container.children.add(mesh);
                });
            } else {
                const mesh = new this.options[entity](this._context, {
                    type,
                    instance: new Instance(this._context, {
                        data: instances
                    })
                });
                this.container.children.add(mesh);
            }
        });
    }

}