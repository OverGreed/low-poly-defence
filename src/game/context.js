import {Context} from 'webgl-core/engine/context/Context';

const canvas = document.getElementById('game');
const context = new Context(canvas, {
    dpi: false,
    antiAlias: false,
    alpha: false,
    debug: true
});

export default context;