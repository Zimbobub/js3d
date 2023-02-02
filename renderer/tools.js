
export function offsetToCentre(point) {
    point.x += canvas.width / 2;
    point.y += canvas.height / 2;
}

export function getDistance(point1, point2) {
    return Math.sqrt(
        (point1.x - point2.x) * (point1.x - point2.x) +
        (point1.y - point2.y) * (point1.y - point2.y) +
        (point1.z - point2.z) * (point1.z - point2.z)
    )
}

export function getMidpoint(points) {
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

export function sortByZIndex(polygons, scene) {
    polygons.forEach(polygon => {
        polygon.midpoint = getMidpoint(polygon);
        polygon.distanceToCamera = getDistance(polygon.midpoint, scene.camera.pos);
    });

    polygons.sort((b, a) => {
        if (a.midpoint.z > b.midpoint.z) return 1;
        if (a.midpoint.z < b.midpoint.z) return -1;
        return 0;
    });
}

export function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}

export function rand(min, max) {
    return (Math.random() * (max - min) + min);
}

export function randS(seed, min, max) {
    const rng = Math.seedrandom(seed.toString());
    return rng() * (max - min) + min;
}