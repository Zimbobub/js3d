import { rectangle } from "./shapes.js";
import { Vec, Poly } from "../renderer/mesh.js";

export function createSphere(resolution, radius) {
    let mesh = [];

    const circle = createLatitudes(resolution, radius);

    let latitudes = [];
    for (let i = 0; i < (circle.length/* / 2*/); i++) {
        latitudes.push(circle[i]);
    }

    //console.log(latitudes);

    let points = [];

    latitudes.forEach(point => {
        points.push(createCircle(resolution, point.x, point.y));
    });
    points.push(points[0]);

    for (let i = 1; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
            /*console.log([
                [points[i][j].x, points[i][j].y, points[i][j].z],
                [points[i][j + 1].x, points[i][j + 1].y, points[i][j + 1].z],
                [points[i - 1][j].x, points[i - 1][j].y, points[i - 1][j].z],
                [points[i - 1][j + 1].x, points[i - 1][j + 1].y, points[i - 1][j + 1].z]
            ]);*/
            if (j == points[i].length) {
                const rect = rectangle([
                    [points[i][j].x, points[i][j].y, points[i][j].z],
                    [points[i][j + 1].x, points[i][j + 1].y, points[i][j + 1].z],
                    [points[i - 1][j].x, points[i - 1][j].y, points[i - 1][j].z],
                    [points[i - 1][j + 1].x, points[i - 1][j + 1].y, points[i - 1][j + 1].z]
                ]);
                mesh.push(rect[0], rect[1]);
            } else {
                const rect = rectangle([
                    [points[i][j].x, points[i][j].y, points[i][j].z],
                    [points[i][0].x, points[i][0].y, points[i][0].z],
                    [points[i - 1][j].x, points[i - 1][j].y, points[i - 1][j].z],
                    [points[i - 1][0].x, points[i - 1][0].y, points[i - 1][0].z]
                ]);
                mesh.push(rect[0], rect[1]);
            }


            //console.log(i, j);


        }
        //points[i].push(points[i, points[i, 0]]);
    }

    /*
    // adds the first point to the end of the points list so the last point can connect back to the start
    circle.push(circle[0]);

    for (let i = 0; i < circle.length - 1; i++) {
        mesh.push(new Poly([
            [0, 0, 0],
            [circle[i].x, circle[i].y, 0],
            [circle[i + 1].x, circle[i + 1].y, 0]
        ]));
    }
    */
    //console.log(mesh);

    return mesh;
}


function createLatitudes(resolution, radius) {

    let points = [];
    let angle = 0;

    for (let i = 0; i < resolution; i++) {
        let point = new Vec();

        point.x = Math.sin(toRadians(angle)) * radius;
        point.y = Math.cos(toRadians(angle)) * radius;
        points.push(point);

        angle += 360 / resolution;
    }

    return points;
}


function createCircle(resolution, radius, height) {

    let points = [];
    let angle = 0;

    for (let i = 0; i < resolution; i++) {
        let point = new Vec();

        point.x = Math.sin(toRadians(angle)) * radius;
        point.y = height;
        point.z = Math.cos(toRadians(angle)) * radius;
        points.push(point);

        angle += 360 / resolution;
    }

    return points;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
