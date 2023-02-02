import { rectangle } from "./shapes.js";
import { Poly } from "../renderer/mesh.js";

export function createRectPrism(length, width, height) {
    let mesh = [];

    //base
    {
        const rect = rectangle([
            [0 - length / 2, 0 - height / 2, 0 - width / 2],
            [0 - length / 2, 0 - height / 2, 0 + width / 2],
            [0 + length / 2, 0 - height / 2, 0 - width / 2],
            [0 + length / 2, 0 - height / 2, 0 + width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    //sides
    {
        const rect = rectangle([
            [0 - length / 2, 0 - height / 2, 0 - width / 2],
            [0 - length / 2, 0 - height / 2, 0 + width / 2],
            [0 - length / 2, 0 + height / 2, 0 - width / 2],
            [0 - length / 2, 0 + height / 2, 0 + width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    {
        const rect = rectangle([
            [0 + length / 2, 0 - height / 2, 0 - width / 2],
            [0 + length / 2, 0 - height / 2, 0 + width / 2],
            [0 + length / 2, 0 + height / 2, 0 - width / 2],
            [0 + length / 2, 0 + height / 2, 0 + width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }

    {
        const rect = rectangle([
            [0 - length / 2, 0 - height / 2, 0 - width / 2],
            [0 + length / 2, 0 - height / 2, 0 - width / 2],
            [0 - length / 2, 0 + height / 2, 0 - width / 2],
            [0 + length / 2, 0 + height / 2, 0 - width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }
    {
        const rect = rectangle([
            [0 - length / 2, 0 - height / 2, 0 + width / 2],
            [0 + length / 2, 0 - height / 2, 0 + width / 2],
            [0 - length / 2, 0 + height / 2, 0 + width / 2],
            [0 + length / 2, 0 + height / 2, 0 + width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
        //console.log(rect);
    }
    //top
    {
        const rect = rectangle([
            [0 - length / 2, 0 + height / 2, 0 - width / 2],
            [0 - length / 2, 0 + height / 2, 0 + width / 2],
            [0 + length / 2, 0 + height / 2, 0 - width / 2],
            [0 + length / 2, 0 + height / 2, 0 + width / 2]
        ]);
        mesh.push(rect[0], rect[1]);
    }

    return mesh;
}