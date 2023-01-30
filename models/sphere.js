import { rectangle } from "./shapes.js";
import { Vec, Poly } from "../mesh.js";

export function createSphere(resolution, radius) {

    //console.log(360 / resolution);

    let mesh = [];

    const circle = createLatitudes(resolution, radius);





    //console.log(circle);

    let latitudes = [];

    for (let i = 0; i < (circle.length / 2); i++) {
        //console.log(circle[i]);
        latitudes.push(circle[i]);
    }

    //console.log(latitudes);

    let points = [];

    latitudes.forEach(point => {
        points.push(createCircle(resolution, point.x, point.y));
    });
    points.push(points[0]);

    //points[points.length - 1].forEach(point => {
    //    point.y = 0 - point.y;
    //});

    console.log(points);


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


            console.log(i, j);


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

        //console.log(point.x, point.y, angle);
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

        //console.log(point.x, point.y, angle);
    }

    return points;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

/*
function createGeometry(n, circumradius) {

    // Generate the vertices of the n-gon.
    for (i = 1; i <= n; i++) {
        mesh.push(new Vec(
            circumradius * Math.sin((Math.PI / n) + (i * ((2 * Math.PI) / n))),
            circumradius * Math.cos((Math.PI / n) + (i * ((2 * Math.PI) / n))),
            0
        ));
    }


}





function icosahedron(r) {
    r = r || 0.5;

    const phi = (1 + Math.sqrt(5)) / 2;
    const a = 1 / 2;
    const b = 1 / (2 * phi);

    var vertices = [
        new Vec(0, b, -a),
        new Vec(b, a, 0),
        new Vec(-b, a, 0),
        new Vec(0, b, a),
        new Vec(0, -b, a),
        new Vec(-a, 0, b),
        new Vec(a, 0, b),
        new Vec(0, -b, -a),
        new Vec(a, 0, -b),
        new Vec(-a, 0, -b),
        new Vec(b, -a, 0),
        new Vec(-b, -a, 0)
    ];



    return vertices

    vertices = vertices.map(function (v) { return v.normalize().scale(r); })


}


*/