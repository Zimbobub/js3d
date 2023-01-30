
import { Poly } from "../mesh.js";

export function rectangle(points) {
    return [new Poly([
        points[0],
        points[1],
        points[2]
    ]),
    new Poly([
        points[1],
        points[2],
        points[3]
    ])]
}
