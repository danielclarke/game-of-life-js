import Point from "./point.js"
import AABB from "./aabb.js";

export default class QuadTree {
    constructor(capacity, boundary) {
        this.capacity = capacity;
        this.boundary = boundary;
        this.points = [];
        this.ne = null;
        this.nw = null;
        this.se = null;
        this.sw = null;
    }

    insert(point) {
        this.points.push(point);
        return true;
        
        // if(!this.boundary.contains(point)) {
        //     return false;
        // }

        // if(this.points.length < this.capacity && this.nw === null) {
        //     this.points.push(point);
        //     return true;
        // }

        // if (this.nw === null) {
        //     this.subdivide();
        // }
        // if (this.nw.insert(point)) {
        //     this.points.push(point);
        //     return true;
        // }
        // if (this.ne.insert(point)) {
        //     this.points.push(point);
        //     return true;
        // }
        // if (this.se.insert(point)) {
        //     this.points.push(point);
        //     return true;
        // }
        // if (this.sw.insert(point)) {
        //     this.points.push(point);
        //     return true;
        // }
        
        // return false;
    }

    subdivide() {
        let halfWidth = this.boundary.width / 2;
        let x = this.boundary.point.x;
        let y = this.boundary.point.y;

        this.nw = new QuadTree(this.capacity, new AABB(new Point(x - halfWidth, y + halfWidth), halfWidth));
        this.ne = new QuadTree(this.capacity, new AABB(new Point(x + halfWidth, y + halfWidth), halfWidth));
        this.se = new QuadTree(this.capacity, new AABB(new Point(x + halfWidth, y - halfWidth), halfWidth));
        this.sw = new QuadTree(this.capacity, new AABB(new Point(x - halfWidth, y - halfWidth), halfWidth));

        for (let point of this.points) {
            if (this.nw.insert(point)) {

            } else if (this.ne.insert(point)) {

            } else if (this.se.insert(point)) {

            } else if (this.sw.insert(point)) {

            }
        }
        // this.points = [];
    }

    query(range) {
        let contained = []
        if (this.nw === null) {
            this.points.forEach(
                (point, index) => {
                    if(range.contains(point)) {
                        contained.push(point);
                    }
                }
            )
            return contained;
        }
        if (range.intersects(this.nw.boundary)) {
            this.nw.query(range).forEach(
                (point, index) => {
                    if(range.contains(point)) {
                        contained.push(point);
                    }
                }
            )
        }
        if (range.intersects(this.ne.boundary)) {
            this.ne.query(range).forEach(
                (point, index) => {
                    if(range.contains(point)) {
                        contained.push(point);
                    }
                }
            )
        }
        if (range.intersects(this.se.boundary)) {
            this.se.query(range).forEach(
                (point, index) => {
                    if(range.contains(point)) {
                        contained.push(point);
                    }
                }
            )
        }
        if (range.intersects(this.sw.boundary)) {
            this.sw.query(range).forEach(
                (point, index) => {
                    if(range.contains(point)) {
                        contained.push(point);
                    }
                }
            )
        }
        return contained;
    }

    hash() {
        this.points.forEach(
            (point, index) => {
                
            }
        )
    }
}