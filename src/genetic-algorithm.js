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

function select(population, numToSelect, evaluate) {
    let selected = [];
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

function breed(selection, numParents) {
    let children = [];
    for (let i = 0; i < selection.length; i += numParents) {
        children.push(crossover(selection.slice(i, i + numParents)));
    }
    return children;
}

function mutate(child) {
    return cells.forEach(
        function(cell) {
            if (Math.random() > mutationRate) {

            }
        }
    )
}

function reproduce(population, evaluate) {
    let numParents = 2;
    return breed(select(population, population.length * numParents, evaluate), numParents);
}

export default function evolve(population, evaluate, numGenerations) {
    for (let i = 0; i < numGenerations; i++) {
        console.log(`generation: ${i}`);
        population = reproduce(population, evaluate);
    }
    return population;
}

// let pop = [];

// for (let i = 0; i < 1000; i++) {
//     pop.push(Math.random());
// }

// for (let j = 0; j < 20; j++) {
//     pop = reproduce(pop);
// }