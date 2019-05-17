import Point from "./point.js";
import AABB from "./aabb.js";
import QuadTree from "./quadtree.js"


export default class GameOfLife {
    constructor() {
        let p = new Point(0, 0);
        let aabb = new AABB(p, 10000);
        this.world = new QuadTree(1, aabb);
    }

    update() {
        let p = new Point(0, 0);
        let aabb = new AABB(p, this.world.boundary.width);
        let updatedWorld = new QuadTree(1, aabb);
    
        let cells = {};

        this.world.points.forEach(
            (cell, index) => {

                let bound = 80;
                
                for (let i of [-1, 0, 1]) {                            
                    let x = cell.x + i;
                    if (x > bound) {
                        x = -bound;
                    }
                    if (x < -bound) {
                        x = bound;
                    }
                    if (!(x in cells)) {
                        cells[x] = {};
                    }
                    for (let j of [-1, 0, 1]) {
                        let y = cell.y + j;
                        if (y > bound) {
                            y = -bound;
                        }
                        if (y < -bound) {
                            y = bound;
                        }
                        if (i === 0 && j === 0) {
                            if (!(cell.y in cells[cell.x])) {
                                cells[cell.x][cell.y] = {"population": 0, "value": 1};
                            } else {
                                cells[cell.x][cell.y]["value"] = 1;
                            }
                        } else {
                            if (!(y in cells[x])) {
                                cells[x][y] = {"population": 1, "value": 0};
                            } else {
                                cells[x][y]["population"] += 1;
                            }
                        }
                    }
                }
            }
        )

        Object.keys(cells).forEach(
            (x, index) => {
                Object.keys(cells[x]).forEach(
                    (y, index) => {
                        if ((cells[x][y]["value"] === 1 && cells[x][y]["population"] === 2) || cells[x][y]["population"] === 3) {
                            let cell = new Point(parseInt(x), parseInt(y));
                            updatedWorld.insert(cell);
                        }
                    }
                )
            }
        )
    
        this.world = updatedWorld;
    }

    addCreature(creature, x, y) {
        for(let i = 0; i < creature.length; i++) {
            for(let j = 0; j < creature[i].length; j++) {
                if (creature[i][j]) {
                    this.world.insert(new Point(x + i, y + j));
                }
            }
        }
    }
}

export function glider() {
    return [[1, 0, 1], [0, 1, 1], [0, 1, 0]];
}

export function shoe() {
	return [[1, 1, 1], [0, 0, 1], [1, 1, 1]];
}

export function line() {
    return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
}