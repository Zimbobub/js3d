import { renderScene } from "./render.js";

import { Mesh } from "./mesh.js"
import { Camera } from "./camera.js"
import { Light } from "./light.js";
/*------------------------------------------------*/
import { createCube } from "./models/cube.js";
import { createPyramid } from "./models/pyramid.js";
import { createSphere } from "./models/sphere.js";
/*------------------------------------------------*/

export let scene = {
    meshes: [],
    lights: [],
    camera: new Camera({ x: 0, y: 0, z: -100 }, 8)
}

let cube = new Mesh(createCube(100, 'yellow'));
let pyramid = new Mesh(createPyramid(50, 'purple'));
let sphere = new Mesh(createSphere(12, 50));

let light = new Light(100, { x: -250, y: 50, z: 0 });
let light2 = new Light(100, { x: 150, y: 100, z: 0 });

/*--------------------------------------------------------*/

cube.pos.x = -200;

function animate(time) {
    cube.rot.x += 0.01;
    cube.rot.y += 0.01;
    //cube.rot.z += 0.01;

    //cube.pos.x = Math.sin(time / 1000) * 80;

    pyramid.pos.x = 200
    //sphere.pos.x = -200

    pyramid.rot.y += 0.05;

    sphere.rot.x += 0.01;
    sphere.rot.y += 0.01;

    renderScene(scene);
    requestAnimationFrame(animate)
}

animate(0);

//cube.rot.x = 0.8;
//cube.rot.y = 0.8;
//renderScene(scene);