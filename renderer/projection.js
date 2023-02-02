import { offsetToCentre, sortByZIndex } from "./tools.js";
import { drawPolygon } from "./render.js";

export const canvas = document.getElementById('canvas');
export const context = canvas.getContext('2d');

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

export function renderScene(scene) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    scene.meshes.forEach(mesh => {
        if (mesh.pos.z < 0 - scene.camera.pos.z) return; // if mesh behind camera dont render
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
    // sorts the polygons by their distance to the camera
    sortByZIndex(sortedPolygons, scene);
    sortedPolygons.forEach(polygon => {
        drawPolygon(polygon, mesh, scene);
    });
}

function renderPolygon(polygon, sortedPolygons) {
    polygon.forEach(point => {
        offsetToCentre(point);
    });
    sortedPolygons.push(polygon);
}