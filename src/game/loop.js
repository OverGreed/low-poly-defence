import ui from './scene/ui';
import game from './scene/game';
import renderer from './renderer';
import context from './context';

let _prev = 0;
const loop = (time = 0) => {
    const diff = time - _prev;

    game.tick(diff);
    ui.tick(diff);
    context.rc = 0;
    renderer
        .clear()
        .render(game)
        .render(ui);
    _prev = time;
    window.requestAnimationFrame(loop);
};

export default loop;