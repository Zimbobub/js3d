import { getDistance, clamp, randS } from './tools.js'
import { canvas, context } from './projection.js'

export function drawPolygon(polygon, mesh, scene) {
    let drawMode = 'fill';
    //console.log(mesh.pipeline);
    switch (mesh.pipeline) {
        case 'shaded':
            context.fillStyle = brightness(polygon, scene);
            //console.log(brightness(polygon, scene));
            break;

        case 'solid':
            break;

        case 'random':
            context.fillStyle = `#${randS(polygon.distanceToCamera.toString(), 0, 16777215)}`;
            break;

        case 'wireframe':
            drawMode = 'line';
            break;

        default:
            break;
    }

    context.beginPath();
    const first = polygon[0];
    context.moveTo(first.x, first.y);
    polygon.forEach(point => {
        context.lineTo(point.x, point.y);
    });
    context.lineTo(first.x, first.y);

    drawMode == 'fill' ? context.fill() : context.stroke();
}

function brightness(polygon, scene) {
    let brightness = 0;

    /*for (let i = 0; i < scene.lights.length; i++) {
        let dist = getDistance(polygon.midpoint, scene.lights[i].pos);
        brightness += Math.round((scene.lights[i].brightness - (dist / 2) + 32) * 4);
    }*/
    let dist = getDistance(polygon.midpoint, scene.lights[0].pos);
    brightness = Math.round(scene.lights[0].brightness - dist);
    brightness += scene.ambientLight;
    brightness = clamp(brightness, 0, 255);

    //console.log(scene.lights[0].pos);

    //console.log(dist);


    let clr = `#${brightness.toString(16)}${brightness.toString(16)}${brightness.toString(16)}`;
    //console.log(clr);
    return clr;
}