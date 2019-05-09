import {Phenotype} from "./genetic-algorithm.js"
import GameOfLife from "./game-of-life.js"


class Genotype {
    constructor() {
        this.sequence = {};
        this.length = 0;
    }

    contains(gene) {
        return gene.join() in this.sequence;
    }

    extend(gene) {
        if (!(gene.join() in this.sequence)) {
            this.length += 1;
            this.sequence[gene.join()] = gene;
            return true;
        }
        return false;
    }

    getSequence() {
        let sequence = [];
        for (let s of Object.values(sequence)) {
            sequence.push(s.slice());
        }
        return sequence;
    }
}

class Creature extends Phenotype {
    constructor(width, genotype) {
        super(genotype);
        this.width = width;
    }
}

export function generateRandomCreature(numCells, width) {

    let coordinates = [];
	let genotype = new Genotype();

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < width; j++) {
			coordinates.push([i, j]);
		}
	}

	for (let i = 0; i < numCells; i++) {
		genotype.extend(coordinates.splice(Math.floor(Math.random() * coordinates.length), 1)[0]);
	}

	return new Creature(width, genotype);
}

export function generateGolCreatureFromCreature(creature) {
    
    let width = creature.width;
	let golCreature = [];

	for (let i = 0; i < width; i++) {
		golCreature.push([]);
		for (let j = 0; j < width; j++) {
			golCreature[i].push(0);
		}
	}

	for (let [x, y] of creature.genotype.getSequence()) {
		golCreature[x][y] = 1;
	}

	return golCreature;
}

export function evaluate(creature) {
	let golCreature = generateGolCreatureFromCreature(creature);
	let gol = new GameOfLife();
	gol.addCreature(golCreature, 0, 0);

	let maxCells = 0;
	for (let i = 0; i < 200; i++) {
		gol.update();
		maxCells = Math.max(maxCells, gol.world.points.length);
	}

	return maxCells;
}

export function crossover(parents) {
    const width = parents[0].width;
    const length = parents[0].genotype.length;
    let cells = [];
    let genotype = new Genotype();

    for (parent of parents) {
        cells = cells.concat(parent.getSequence());
    }

    while (genotype.length < length) {
        genotype.extend(cells.splice(Math.floor(Math.random() * cells.length), 1)[0]);
    }

    return new Creature(width, genotype);
}

export function mutate(population, mutationRate) {
    let mutated = []

    for (let child of population) {
        if (Math.random() <= mutationRate) {
            let sequence = child.genotype.getSequence();
            let width = child.width;
            let genotype = new Genotype();
            let availableSpaces = [];

            for (let i = 0; i < width; i++) {
                for (let j = 0; j < width; j++) {
                    if(!(child.genotype.contains([i, j]))) {
                        availableSpaces.push([i, j]);
                    }
                }
            }

            // delete one entry from sequence at random and replace with a guaranteed novel entry
            sequence.splice(Math.floor(Math.random() * sequence.length), 1);
            sequence.push(Math.floor(Math.random() * availableSpaces.length));

            for (let s of sequence) {
                genotype.extend(s);
            }

            mutated.push(new Creature(width, genotype));
        } else {
            mutated.push(child);
        }
    }
    return mutated;
}
