import Point from "./point.js"

export default class AABB {
    constructor (point, width, height) {
        this.point = point;
        this.width = width;
        this.height = height === undefined ? width : height;
        this.origin = new Point(point.x - width, point.y - height);
    }

    contains (point) {
        return this.point.x - this.width <= point.x &&
        this.point.y - this.height <= point.y &&
        point.x < this.point.x + this.width &&
        point.y < this.point.y + this.height;
    }

    intersects (aabb) {
        return !(
            aabb.point.x + aabb.width < this.point.x - this.width ||
            aabb.point.y + aabb.height < this.point.y - this.height ||
            this.point.x + this.width < aabb.point.x - aabb.width ||
            this.point.y + this.height < aabb.point.y - aabb.height
        );
    }
}