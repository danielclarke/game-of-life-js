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
        let updated_world = new QuadTree(1, aabb);
    
        let cells = {};
        
        // this.world.query(this.world.boundary).forEach(
        // this.world.points.forEach(
        //     (cell, index) => {
        //         if (!(cell.x in cells)) {
        //             cells[cell.x] = {};
        //         }
        //         cells[cell.x][cell.y] = 1;
    
        //         if (!(cell.x - 1 in cells)) {
        //             cells[cell.x - 1] = {};
        //         }
        //         if (!(cell.x + 1 in cells)) {
        //             cells[cell.x + 1] = {};
        //         }
    
        //         if (!(cell.y - 1 in cells[cell.x - 1])) {
        //             cells[cell.x - 1][cell.y - 1] = 0;
        //         }
        //         if (!(cell.y - 1 in cells[cell.x])) {
        //             cells[cell.x][cell.y - 1] = 0;
        //         }
        //         if (!(cell.y - 1 in cells[cell.x + 1])) {
        //             cells[cell.x + 1][cell.y - 1] = 0;
        //         }
        //         if (!(cell.y in cells[cell.x - 1])) {
        //             cells[cell.x - 1][cell.y] = 0;
        //         }
        //         if (!(cell.y in cells[cell.x])) {
        //             cells[cell.x][cell.y] = 0;
        //         }
        //         if (!(cell.y in cells[cell.x + 1])) {
        //             cells[cell.x + 1][cell.y] = 0;
        //         }
        //         if (!(cell.y + 1 in cells[cell.x - 1])) {
        //             cells[cell.x - 1][cell.y + 1] = 0;
        //         }
        //         if (!(cell.y + 1 in cells[cell.x])) {
        //             cells[cell.x][cell.y + 1] = 0;
        //         }
        //         if (!(cell.y + 1 in cells[cell.x + 1])) {
        //             cells[cell.x + 1][cell.y + 1] = 0;
        //         }
        //     }
        // )
        
        // Object.keys(cells).forEach(
        //     (x, index) => {
        //         Object.keys(cells[x]).forEach(
        //             (y, index) => {
        //                 let cell = new Point(parseInt(x), parseInt(y));
        //                 let population = this.world.query(new AABB(cell, 1.5)).length - cells[x][y];
        //                 if ((cells[x][y] === 1 && population === 2) || population === 3) {
        //                     updated_world.insert(cell);
        //                 }
        //             }
        //         )
        //     }
        // )
    
        // this.world = updated_world;

        this.world.points.forEach(
            (cell, index) => {

                if (!(cell.x in cells)) {
                    cells[cell.x] = {};
                }
                if (!(cell.x - 1 in cells)) {
                    cells[cell.x - 1] = {};
                }
                if (!(cell.x + 1 in cells)) {
                    cells[cell.x + 1] = {};
                }
    
                if (!(cell.y in cells[cell.x])) {
                    cells[cell.x][cell.y] = {"population": 0, "value": 1};
                } else {
                    cells[cell.x][cell.y]["value"] = 1;
                }
                
                if (!(cell.y - 1 in cells[cell.x - 1])) {
                    cells[cell.x - 1][cell.y - 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x - 1][cell.y - 1]["population"] += 1;
                }
                if (!(cell.y - 1 in cells[cell.x])) {
                    cells[cell.x][cell.y - 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x][cell.y - 1]["population"] += 1;
                }
                if (!(cell.y - 1 in cells[cell.x + 1])) {
                    cells[cell.x + 1][cell.y - 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x + 1][cell.y - 1]["population"] += 1;
                }
                if (!(cell.y in cells[cell.x - 1])) {
                    cells[cell.x - 1][cell.y] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x - 1][cell.y]["population"] += 1;
                }
                if (!(cell.y in cells[cell.x + 1])) {
                    cells[cell.x + 1][cell.y] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x + 1][cell.y]["population"] += 1;
                }
                if (!(cell.y + 1 in cells[cell.x - 1])) {
                    cells[cell.x - 1][cell.y + 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x - 1][cell.y + 1]["population"] += 1;
                }
                if (!(cell.y + 1 in cells[cell.x])) {
                    cells[cell.x][cell.y + 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x][cell.y + 1]["population"] += 1;
                }
                if (!(cell.y + 1 in cells[cell.x + 1])) {
                    cells[cell.x + 1][cell.y + 1] = {"population": 1, "value": 0};
                } else {
                    cells[cell.x + 1][cell.y + 1]["population"] += 1;
                }
            }
        )

        Object.keys(cells).forEach(
            (x, index) => {
                Object.keys(cells[x]).forEach(
                    (y, index) => {
                        if ((cells[x][y]["value"] === 1 && cells[x][y]["population"] === 2) || cells[x][y]["population"] === 3) {
                            let cell = new Point(parseInt(x), parseInt(y));
                            updated_world.insert(cell);
                        }
                    }
                )
            }
        )
    
        this.world = updated_world;
    }

    add_creature(creature, x, y) {
        for(let i = 0; i < creature.length; i++) {
            for(let j = 0; j < creature[i].length; j++) {
                if (creature[i][j]) {
                    this.world.insert(new Point(x + i, y + j));
                }
            }
        }
    }
}

// world.insert(new Point(0, 1));
// world.insert(new Point(2, -1));
// world.insert(new Point(1, 2));
// world.insert(new Point(2, -1));
// world.insert(new Point(1, 0));
// world.insert(new Point(1, 1));
// world.insert(new Point(-1, 0));

// x: -1, y: 2
// x: 0, y: 2
// x: 1, y: 1
// x: 0, y: 1
// x: 2, y: 1
// x: 1, y: -1

export function glider() {
    return [[1, 0, 1], [0, 1, 1], [0, 1, 0]];
}

export function shoe() {
	return [[1, 1, 1], [0, 0, 1], [1, 1, 1]];
}

export function line() {
    return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
}