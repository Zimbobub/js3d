/*-------------------RENDER----------------------*/

import { renderScene } from "./renderer/projection.js";
import { Mesh } from "./renderer/mesh.js"
import { Camera } from "./renderer/camera.js"
import { Light } from "./renderer/light.js";

/*-------------------MODELS----------------------*/

import { createCube } from "./models/cube.js";
import { createPyramid } from "./models/pyramid.js";
import { createSphere } from "./models/sphere.js";
import { createRectPrism } from "./models/rectPrism.js";

/*-------------------PHYSICS---------------------*/

import { calculatePhysics } from "./physics.js";
import { move } from "./movement.js";

/*--------------------TOOLS----------------------*/

import { rand } from './renderer/tools.js';

/*--------------------SCENE----------------------*/

export let scene = {
    meshes: [],
    lights: [],
    camera: new Camera({ x: 0, y: 100, z: -100 }, 8),
    //pipeline: 'solid',
    ambientLight: 50
};

/*-------------------MESHES----------------------*/

let ground = new Mesh(createCube(100), 'solid', '#999999');

let obstacle1 = new Mesh(createCube(100), 'solid', '#ee0000');
let obstacle2 = new Mesh(createCube(100), 'solid', '#ee0000');
let obstacle3 = new Mesh(createCube(100), 'solid', '#ee0000');
let obstacle4 = new Mesh(createCube(100), 'solid', '#ee0000');
let obstacle5 = new Mesh(createCube(100), 'solid', '#ee0000');
let obstacle6 = new Mesh(createCube(100), 'solid', '#ee0000');

let player = new Mesh(createSphere(20, 50), 'shaded', '#715c99');

let light = new Light(250, { x: 0, y: 100, z: 100 });
//let light2 = new Light(100, { x: 150, y: 100, z: 0 });

/*-----------------------------------------------*/

ground.pos = { x: 0, y: 100, z: 1000 }
ground.scale = { x: 7, y: 1, z: 22 }

//player.physics = true;
//player.pos = { x: 0, y: 0, z: 0 }
//player.scale = { x: 0.5, y: 1, z: 1 }

/*-------------------ANIMATE---------------------*/

function animate(time) {

    player.rot.x += 0.1;
    move(player, 20);
    //calculatePhysics();

    scene.camera.pos.x = 0 - player.pos.x;
    //light.pos = { x: player.pos.x, y: scene.camera.pos.y, z: scene.camera.pos.z }

    if (obstacle1.pos.z < 0) { nextObstacle(obstacle1) }
    else { obstacle1.pos.z -= 20 }

    if (obstacle2.pos.z < 0) { nextObstacle(obstacle2) }
    else { obstacle2.pos.z -= 20 }

    if (obstacle3.pos.z < 0) { nextObstacle(obstacle3) }
    else { obstacle3.pos.z -= 20 }

    if (obstacle4.pos.z < 0) { nextObstacle(obstacle4) }
    else { obstacle4.pos.z -= 20 }

    if (obstacle5.pos.z < 0) { nextObstacle(obstacle5) }
    else { obstacle5.pos.z -= 20 }

    if (obstacle6.pos.z < 0) { nextObstacle(obstacle6) }
    else { obstacle6.pos.z -= 20 }


    renderScene(scene);
    fps(time);
    requestAnimationFrame(animate);
}

function nextObstacle(obs) {
    let x = Math.floor(rand(-3, 3)) * 100;
    console.log(x);
    obs.pos = {
        x: x,
        y: 0,
        z: 1000
    }
}

let prevTime = 0;
function fps(time) {
    document.getElementById('fps').innerText = `Player: ${JSON.stringify([
        player.pos,
        player.rot,
        player.vel
    ])}
    Blocks: ${JSON.stringify([
        obstacle1.pos.x / 100,
        obstacle2.pos.x / 100,
        obstacle3.pos.x / 100,
        obstacle4.pos.x / 100,
        obstacle5.pos.x / 100,
        obstacle6.pos.x / 100
    ])}`;
    //document.getElementById('fps').innerText = `${Math.round(1000 / (time - prevTime))}FPS`
    prevTime = time;
    //console.log(Math.floor(1000 / time));
}

animate(0);