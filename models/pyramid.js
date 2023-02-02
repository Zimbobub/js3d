import { rectangle } from "./shapes.js";
import { Poly } from "../renderer/mesh.js";

export function createPyramid(size) {
    let mesh = []

    //base
    {
        const rect = rectangle([
            [0 - size / 2, 0 - size / 2, 0 - size / 2],
            [0 - size / 2, 0 - size / 2, 0 + size / 2],
            [0 + size / 2, 0 - size / 2, 0 - size / 2],
            [0 + size / 2, 0 - size / 2, 0 + size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    //tower
    mesh.push(new Poly([
        [0 - size / 2, 0 - size / 2, 0 - size / 2],
        [0 - size / 2, 0 - size / 2, 0 + size / 2],
        [0, size / 2, 0],
    ]))
    mesh.push(new Poly([
        [0 - size / 2, 0 - size / 2, 0 - size / 2],
        [0 + size / 2, 0 - size / 2, 0 - size / 2],
        [0, size / 2, 0],
    ]))
    mesh.push(new Poly([
        [0 + size / 2, 0 - size / 2, 0 + size / 2],
        [0 - size / 2, 0 - size / 2, 0 + size / 2],
        [0, size / 2, 0],
    ]))
    mesh.push(new Poly([
        [0 - size / 2, 0 - size / 2, 0 - size / 2],
        [0 + size / 2, 0 - size / 2, 0 - size / 2],
        [0, size / 2, 0],
    ]))

    return mesh;
}
