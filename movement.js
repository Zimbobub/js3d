import { keys } from "./input.js";

export function move(mesh, speed) {
    if (keys.includes('a') && mesh.pos.x > -300) {
        mesh.pos.x -= speed;
    }
    if (keys.includes('d') && mesh.pos.x < 300) {
        mesh.pos.x += speed;
    }
}