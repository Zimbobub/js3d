import { scene } from "../main.js";

export class Vec {
    constructor(x, y, z) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0;
    }
}

export class Poly {
    constructor(points) {
        this.points = []
        points.forEach(point => {
            //if (point.isArray) {
            this.points.push(new Vec(
                (point.x ? point.x : point[0]),
                (point.y ? point.y : point[1]),
                (point.z ? point.z : point[2])
            ));
            //}
            //else {
            //    this.points.push(new Vec(point.x, point.y, point.z));
            //}
        });
    }
}

export class Mesh {
    constructor(polygons, pipeline, clr) {
        this.polygons = polygons;
        this.pos = new Vec(0, 0, 0); // position
        this.vel = new Vec(0, 0, 0); // velocity
        this.rot = new Vec(0, 0, 0); // rotation
        this.rotVel = new Vec(0, 0, 0); // rotational velocity
        this.scale = new Vec(1, 1, 1); // scale

        this.pipeline = pipeline || 'solid';
        this.clr = clr ? clr : '#ffffff';
        this.physics = false;

        scene.meshes.push(this);
    }

    transform(point) {
        scale(point, this.scale);
        translate(point, this.pos);
        rotate(point, this.rot);

    }
}

function translate(point, position) {
    point.x += position.x;
    point.y += position.y;
    point.z += position.z;
}

function rotate(point, rotation) {
    const sin = new Vec(
        Math.sin(rotation.x),
        Math.sin(rotation.y),
        Math.sin(rotation.z)
    );
    const cos = new Vec(
        Math.cos(rotation.x),
        Math.cos(rotation.y),
        Math.cos(rotation.z)
    );

    let temp1, temp2;

    temp1 = cos.x * point.y + sin.x * point.z;
    temp2 = -sin.x * point.y + cos.x * point.z;
    point.y = temp1;
    point.z = temp2;

    temp1 = cos.y * point.x + sin.y * point.z;
    temp2 = -sin.y * point.x + cos.y * point.z;
    point.x = temp1;
    point.z = temp2;

    temp1 = cos.z * point.x + sin.z * point.y;
    temp2 = -sin.z * point.x + cos.z * point.y;
    point.x = temp1;
    point.y = temp2;
}


function scale(point, scale) {
    point.x = point.x * scale.x;
    point.y = point.y * scale.y;
    point.z = point.z * scale.z;
}