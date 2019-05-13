import Point from "./point.js";
import AABB from "./aabb.js";
import QuadTree from "./quadtree.js"


function generateSignature(offset, sequence) {
    let s = [0];

    for (let [x, y] of sequence) {
        s[0] += Math.pow(2, (x- offset.x) + (y - offset.y) * this.width);
    }

    return s.join();
}


export default class GameOfLife {
    constructor() {
        let p = new Point(0, 0);
        let aabb = new AABB(p, 10000);
        this.world = new QuadTree(9, aabb);
        this.cache = {};
    }

    update() {
        let p = new Point(0, 0);
        let aabb = new AABB(p, this.world.boundary.width);
        let updatedWorld = new QuadTree(9, aabb);
    
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
        //                     updatedWorld.insert(cell);
        //                 }
        //             }
        //         )
        //     }
        // )
    
        // this.world = updatedWorld;

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
                            updatedWorld.insert(cell);
                        }
                    }
                )
            }
        )
    
        this.world = updatedWorld;
    }

    updatePoints(points, quadtree) {
        let cells = [];

        for (let point of points) {
            let numNeighbours = quadtree.query(point, 1.5);
            let alive = quadtree.contains(point);
            if (numNeighbours === 3 || (numNeighbours === 2 && alive)) {
                cells.push(point);
            }
        }

        return cells;
    }

    nextState(quadtree) {

        let offset = new Point(
            parseInt(Math.min(...quadtree.points.map(s => s[0]))), 
            parseInt(Math.min(...quadtree.points.map(s => s[1])))
        );

        let signature = generateSignature(offset, quadtree.points);
        if (!(signature in this.cache)) {
            let cells = [];
            if (quadtree.children.length > 0) {
                for (child of quadtree.children) {
                    cells.concat(this.nextState(child));
                }
            } else {
                cells = this.updatePoints(quadtree.points, quadtree);
            }
            //wrong as this includes perimeter
            this.cache[signature] = cells;
        } else {
            let points = [];
            let cells = [];
            
            for(let i = quadtree.aabb.point.x - quadtree.aabb.width; i < quadtree.aabb.point.x + quadtree.aabb.width; i++) {
                // top row points
                points += new Point(i, quadtree.aabb.point.y - quadtree.aabb.height);
                // bottom row points
                points += new Point(i, quadtree.aabb.point.y + quadtree.aabb.height);
            }
            for(let j = quadtree.aabb.point.y - quadtree.aabb.height; j < quadtree.aabb.point.y + quadtree.aabb.height; i++) {
                // left column points
                points += new Point(quadtree.aabb.point.x - quadtree.aabb.width, j);
                // right column points
                points += new Point(i, quadtree.aabb.point.x + quadtree.aabb.width, j);
            }

            cells = this.updatePoints(points, quadtree);
            cells.concat(this.cache[signature]);

            return cells;

            //calculate state for perimeter cells
            //concat cache[signature] which should contain the next inner state without the perimeter
            //return nextState;
        }
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