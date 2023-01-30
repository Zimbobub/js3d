import { scene } from "./main.js";
import { Vec } from "./mesh.js";

export class Light {
    constructor(brightness, clr, pos) {
        this.brightness = brightness ? brightness : 100;
        this.clr = clr ? clr : '#ffffff';
        this.pos = pos ? pos : new Vec(0, 0, 0);

        scene.lights.push(this);
    }
}