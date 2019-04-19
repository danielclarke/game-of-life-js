export default class AABB {
    constructor (point, width) {
        this.point = point;
        this.width = width;
    }

    contains (point) {
        return this.point.x - this.width <= point.x &&
        this.point.y - this.width <= point.y &&
        point.x < this.point.x + this.width &&
        point.y < this.point.y + this.width;
    }

    intersects (aabb) {
        return !(
            aabb.point.x + aabb.width < this.point.x - this.width ||
            aabb.point.y + aabb.width < this.point.y - this.width ||
            this.point.x + this.width < aabb.point.x - aabb.width ||
            this.point.y + this.width < aabb.point.y - aabb.width
        );
    }
}