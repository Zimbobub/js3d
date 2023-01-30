import { rectangle } from "./shapes.js";
import { Poly } from "../mesh.js";

export function createCube(size) {
    let mesh = [];

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
    //sides
    {
        const rect = rectangle([
            [0 - size / 2, 0 - size / 2, 0 - size / 2],
            [0 - size / 2, 0 - size / 2, 0 + size / 2],
            [0 - size / 2, 0 + size / 2, 0 - size / 2],
            [0 - size / 2, 0 + size / 2, 0 + size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    {
        const rect = rectangle([
            [0 + size / 2, 0 - size / 2, 0 - size / 2],
            [0 + size / 2, 0 - size / 2, 0 + size / 2],
            [0 + size / 2, 0 + size / 2, 0 - size / 2],
            [0 + size / 2, 0 + size / 2, 0 + size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }

    {
        const rect = rectangle([
            [0 - size / 2, 0 - size / 2, 0 - size / 2],
            [0 + size / 2, 0 - size / 2, 0 - size / 2],
            [0 - size / 2, 0 + size / 2, 0 - size / 2],
            [0 + size / 2, 0 + size / 2, 0 - size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    {
        const rect = rectangle([
            [0 - size / 2, 0 - size / 2, 0 + size / 2],
            [0 + size / 2, 0 - size / 2, 0 + size / 2],
            [0 - size / 2, 0 + size / 2, 0 + size / 2],
            [0 + size / 2, 0 + size / 2, 0 + size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
        //console.log(rect);
    }
    //top
    {
        const rect = rectangle([
            [0 - size / 2, 0 + size / 2, 0 - size / 2],
            [0 - size / 2, 0 + size / 2, 0 + size / 2],
            [0 + size / 2, 0 + size / 2, 0 - size / 2],
            [0 + size / 2, 0 + size / 2, 0 + size / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }

    console.log([
        [0 - size / 2, 0 + size / 2, 0 - size / 2],
        [0 - size / 2, 0 + size / 2, 0 + size / 2],
        [0 + size / 2, 0 + size / 2, 0 - size / 2],
        [0 + size / 2, 0 + size / 2, 0 + size / 2]
    ]);

    return mesh;
}