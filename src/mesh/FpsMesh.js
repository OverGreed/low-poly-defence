import TextMesh from './TextMesh';

export default class FpsMesh extends TextMesh {
    constructor(context, options){
        super(context, { text: 'fps 0', ...options });
        this._fps = 0;
        this._spent = 0;
    }
    tick(step) {
        this._spent += step;
        this._fps++;
        if(this._spent >= 1000) {
            this.geometry.text = this.getText();
            this._spent = 0;
            this._fps = 0;
        }
    }

    getText() {
        return `fps ${this._fps}`;
    }
}