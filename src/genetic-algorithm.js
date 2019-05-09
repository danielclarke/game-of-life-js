function cumulativeSum(scores) {
    return scores.reduce((accumulator, value, index) => [...accumulator, value + (accumulator[index - 1] || 0)], [])
}

function normalise(scores) {
    const maxScore = Math.max(...scores);
    return scores.map(score => score / maxScore);
}

function binarySearch(ary, value) {

    if (ary.length == 1) {
        return 0;
    }

    if (ary.length == 0) {
        return;
    }

    if (value < ary[Math.floor(ary.length / 2)]) {
        return binarySearch(ary.slice(0, Math.floor(ary.length / 2)), value);
    } else {
        return Math.floor(ary.length / 2) + binarySearch(ary.slice(Math.floor(ary.length / 2), ary.length), value);
    }
}

export class Phenotype {
    constructor(genotype) {
        this.genotype = genotype;
    }
}

function select(population, numToSelect, evaluate) {
    let selected = [];
    //let scores = population.map(member => evaluate(member));
    let scores = [];

    for (let member of population) {
        scores.push(evaluate(member));
    }

    scores = [0].concat(normalise(cumulativeSum(scores)));

    for (let i = 0; i < numToSelect; i++) {
        selected.push(population[binarySearch(scores, Math.random())]);   
    }

    return selected;
}

function breed(selection, numParents, crossover) {
    let children = [];
    for (let i = 0; i < selection.length; i += numParents) {
        children.push(crossover(selection.slice(i, i + numParents)));
    }
    return children;
}

function reproduce(population, evaluate, crossover) {
    let numParents = 2;
    return breed(select(population, population.length * numParents, evaluate), numParents, crossover);
}

export default function evolve(population, numGenerations, mutationRate, evaluate, crossover, mutate) {
    for (let i = 0; i < numGenerations; i++) {
        console.log(`generation: ${i}`);
        population = mutate(reproduce(population, evaluate, crossover), mutationRate);
    }
    return population;
}
