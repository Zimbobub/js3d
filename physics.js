import { scene } from "./main.js";

const conf = {
    gravity: { x: 0, y: -1.5, z: 0 },
    friction: { x: 0.1, y: 0, z: 0.1 },
    floor: { x: -1000, y: 0, z: -1000 },
    ceiling: { x: 1000, y: 1000, z: 1000 },
}

export function calculatePhysics() {
    scene.meshes.forEach(mesh => {
        if (mesh.physics) {
            calculateGravity(mesh);
            calculateFriction(mesh);
            calculateVelocity(mesh);
            clamp(mesh);
        }
    });
}

function calculateGravity(mesh) {
    mesh.vel.x += conf.gravity.x;
    mesh.vel.y += conf.gravity.y;
    mesh.vel.z += conf.gravity.z;
}

function calculateFriction(mesh) {
    calculateFrictionOnAxis(mesh, 'x');
    calculateFrictionOnAxis(mesh, 'y');
    calculateFrictionOnAxis(mesh, 'z');
    /*
    mesh.vel.x = mesh.vel.x * conf.friction.x;
    mesh.vel.y = mesh.vel.y * conf.friction.y;
    mesh.vel.z = mesh.vel.z * conf.friction.z;
    */
    /*
    mesh.vel.x = changeByPercentage(mesh.vel.x, conf.friction.x);
    mesh.vel.y = changeByPercentage(mesh.vel.y, conf.friction.y);
    mesh.vel.z = changeByPercentage(mesh.vel.z, conf.friction.z);

    function changeByPercentage(value, percent) {
        value = (value * (percent));
    }
    */
    function calculateFrictionOnAxis(mesh, axis) {
        if (mesh.vel[axis] > conf.friction[axis]) {
            mesh.vel[axis] -= conf.friction[axis];
        }
        else if (mesh.vel[axis] < 0 - conf.friction[axis]) {
            mesh.vel[axis] += conf.friction[axis];
        }
        //else {
        //    mesh.vel[axis] = 0;
        //}
    }
}

function calculateVelocity(mesh) {
    mesh.pos.x += mesh.vel.x;
    mesh.pos.y += mesh.vel.y;
    mesh.pos.z += mesh.vel.z;
}

function clamp(mesh) {
    if (mesh.pos.x < conf.floor.x) { mesh.pos.x = conf.floor.x; mesh.vel.x = 0; }
    if (mesh.pos.y < conf.floor.y) { mesh.pos.y = conf.floor.y; mesh.vel.y = 0; }
    if (mesh.pos.z < conf.floor.z) { mesh.pos.z = conf.floor.z; mesh.vel.z = 0; }

    if (mesh.pos.x > conf.ceiling.x) { mesh.pos.x = conf.ceiling.x; mesh.vel.x = 0; }
    if (mesh.pos.y > conf.ceiling.y) { mesh.pos.y = conf.ceiling.y; mesh.vel.y = 0; }
    if (mesh.pos.z > conf.ceiling.z) { mesh.pos.z = conf.ceiling.z; mesh.vel.z = 0; }
}