import { Vec } from "./mesh.js";

function translate(point, camPos) {
    point.x += camPos.x;
    point.y += camPos.y;
    point.z += camPos.z;
}

function perspective(point, distance) {
    const fov = point.z + distance;
    point.x /= fov;
    point.y /= fov;
}

function zoom(point, factor) {
    const scale = Math.pow(factor, 2);
    point.x *= scale;
    point.y *= scale;
}

export class Camera {
    constructor(pos, zoom) {
        this.pos = new Vec(pos.x, pos.y, 0 - pos.z);
        this.zoom = zoom;
    }

    transform(point) {
        translate(point, this.pos)
        perspective(point, this.pos.z);
        zoom(point, this.zoom);
    }
}