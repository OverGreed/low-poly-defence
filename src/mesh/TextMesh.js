import vec3 from 'gl-vec3/fromValues';
import {Mesh} from 'webgl-core/engine/object/mesh';
import {GlyphGeometry} from 'webgl-core/engine/geometry/GlyphGeometry';
import {Texture} from 'webgl-core/engine/material/texture/Texture';
import UiMaterial from '../material/UiMaterial';
import {glyph} from '../material/text/glyph';

let __diffuse = null;

export default class TextMesh extends Mesh {
    constructor(context, {
        text = '',
        ...options
    } = {}) {
        super({
            scale: vec3(5, 5, 5),
            shadow: {
                drop: false,
                receive: false
            },
            ...options,
            geometry: new GlyphGeometry(context, {
                text: text,
                glyph: glyph
            }),
            material: new UiMaterial(context, {
                face: context.gl.BACK,
                textures: {
                    diffuse: TextMesh.getDiffuseGlyph(context)
                }
            })
        });
    }

    set text(text) {
        this.geometry.text = text;
    }

    get text() {
        return this.geometry.text;
    }

    static getDiffuseGlyph(context) {
        if(!__diffuse) {
            __diffuse = new Texture(context, {
                flipY: false,
                anisotropy: 1,
                min: context.gl.NEAREST,
                mag: context.gl.NEAREST,
                wrapS: context.gl.CLAMP_TO_EDGE,
                wrapT: context.gl.CLAMP_TO_EDGE
            }).load('textures/text/8x8-font.png');
        }
        return __diffuse
    }
}