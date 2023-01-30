
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

export function renderScene(scene) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    scene.meshes.forEach(mesh => {
        //if (mesh.pos.z < 0 - scene.camera.pos.z) return; // if mesh behind camera dont render
        drawMesh(mesh, scene);
    });
}

function drawMesh(mesh, scene) {
    context.strokeStyle = mesh.clr;
    context.fillStyle = mesh.clr;

    let sortedPolygons = [];

    mesh.polygons.forEach(polygon => {
        const projectedPolygon = polygon.points.map(point => ({ ...point }));

        projectedPolygon.forEach(point => {
            mesh.transform(point);
            scene.camera.transform(point);
        });

        renderPolygon(projectedPolygon, sortedPolygons);
    });

    sortByZIndex(sortedPolygons, scene); // sorts the polygons by their distance to the camera
    sortedPolygons.forEach(polygon => {
        drawPolygon(polygon, scene);
    });

}

function renderPolygon(polygon, sortedPolygons) {
    polygon.forEach(point => {
        offsetToCentre(point);
    });
    sortedPolygons.push(polygon);
}

function drawPolygon(polygon, scene) {
    //context.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    brightness(polygon, scene);

    //console.log(polygon);
    //console.log(`%c ████████████████████████████`, `color: ${context.fillStyle}`);

    context.beginPath();
    const first = polygon[0];
    context.moveTo(first.x, first.y);
    polygon.forEach(point => {
        context.lineTo(point.x, point.y);
    });
    context.lineTo(first.x, first.y);
    context.fill();

}

function offsetToCentre(point) {
    point.x += canvas.width / 2;
    point.y += canvas.height / 2;
}

function brightness(polygon, scene) {
    let brightness = 0;

    for (let i = 0; i < scene.lights.length; i++) {
        let dist = getDistance(polygon.midpoint, scene.lights[i].pos);
        brightness += Math.round((scene.lights[i].brightness - (dist / 2) + 32) * 4);
    }

    let clr = `#${brightness.toString(16)}${brightness.toString(16)}${brightness.toString(16)}`
    context.fillStyle = clr;

}

function getDistance(point1, point2) {
    return Math.sqrt(
        (point1.x - point2.x) * (point1.x - point2.x) +
        (point1.y - point2.y) * (point1.y - point2.y) +
        (point1.z - point2.z) * (point1.z - point2.z)
    )
}

function getMidpoint(points) {
    let x = 0;
    let y = 0;
    let z = 0;

    points.forEach(point => {
        x += point.x;
    });
    points.forEach(point => {
        y += point.y;
    });
    points.forEach(point => {
        z += point.z;
    });

    return {
        x: x / points.length,
        y: y / points.length,
        z: z / points.length
    }
}

function sortByZIndex(polygons, scene) {
    polygons.forEach(polygon => {
        polygon.midpoint = getMidpoint(polygon);
        polygon.distanceToCamera = getDistance(polygon.midpoint, scene.camera.pos);
    });

    polygons.sort((a, b) => {
        if (a.midpoint.z > b.midpoint.z) return 1;
        if (a.midpoint.z < b.midpoint.z) return -1;
        return 0;
    });
}