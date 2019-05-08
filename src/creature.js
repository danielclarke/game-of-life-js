import {Phenotype} from "./genetic-algorithm.js"

export default class Creature extends Phenotype {
    constructor(width, genotype) {
        super(genotype);
        this.width = width;
    }
}

function crossover(parents) {
    const n = parents[0].length;
    let cells = [];
    let genotype = {};
    let child = [];

    for (parent of parents) {
        cells = cells.concat(parent);
    }

    while (child.length < n) {
        let [x, y] = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
        if (!(`${x}, ${y}` in genotype)) {
            genotype[`${x}, ${y}`] = [x, y];
            child.push([x, y]);
        }
    }

    return child;
}

function mutate(population, mutationRate) {
    let mutated = []
    for (let child of population) {
        let genotype = {};
        let width = 0;
        let mutation = [];

        for (let [x, y] of child) {
            genotype[`${x}, ${y}`] = [x, y];
            width = Math.max(width, x, y);
        }

        for (let [x, y] of child) {
            if (Math.random() <= mutationRate) {
                let u = Math.floor(Math.random() * (width + 1));
                let v = Math.floor(Math.random() * (width + 1));

                if (!(`${u}, ${v}` in genotype)) {
                    genotype[`${u}, ${v}`] = [u, v];
                    mutation.push([u, v]);
                    console.log(`mutated from ${x}, ${y} to ${u}, ${v}`)
                } else {
                    mutation.push([x, y])
                }
            } else {
                mutation.push([x, y])
            }
        }

        mutated.push(mutation);
    }

    return mutated;
}

export function generateCreatureCoordinates(numCells, size) {

	let coordinates = [];
	let creatureCoordinates = []

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			coordinates.push([i, j]);
		}
	}

	for (let i = 0; i < numCells; i++) {
		creatureCoordinates.push(coordinates.splice(Math.floor(Math.random() * coordinates.length), 1)[0]);
	}

	return creatureCoordinates;
}

export function generateCreatureFromCoordinates(creatureCoordinates) {
	let size = 0;
	let creature = [];

	for (let [x, y] of creatureCoordinates) {
		size = Math.max(size, x, y);
	}

	for (let i = 0; i < size + 1; i++) {
		creature.push([]);
		for (let j = 0; j < size + 1; j++) {
			creature[i].push(0);
		}
	}

	for (let [x, y] of creatureCoordinates) {
		creature[x][y] = 1;
	}

	return creature;

}