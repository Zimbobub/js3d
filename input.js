import { scene } from "./main.js";


/*
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    console.log(event.key);

    switch (event.key) {
        case "ArrowDown":
            move('z', '+');
            break;
        case "ArrowUp":
            move('z', '-');
            break;
        case "ArrowLeft":
            move('x', '+');
            break;
        case "ArrowRight":
            move('x', '-');
            break;
        case " ":
            jump();
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }


    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window

function move(axis, dir) {
    if (dir == '+') {
        scene.meshes[0].vel[axis] = 5;
    } else {
        scene.meshes[0].vel[axis] = -5;
    }

}

function jump() {
    scene.meshes[0].vel.y += 25;
}
*/

export let keys = [];

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    if (keys.indexOf(event.key) == -1) {
        keys.push(event.key);
    }
    //console.clear();
    //console.log(keys);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    keys.splice(keys.indexOf(event.key), 1);

    //console.clear();
    //console.log(keys);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

// clears the keys list when unfocused
window.addEventListener('blur', function (event) {
    keys = [];
    //console.clear();
    //console.log(keys);
});

