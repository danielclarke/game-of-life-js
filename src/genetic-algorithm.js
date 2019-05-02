function normalise(scores) {
    const maxScore = Math.max(...scores);
    return scores.map(score => score / maxScore);
}

function evalute(member) {
    return 0;
}

function selection(population) {
    let selected = [];
    let scores = [];

    for (let member of population) {
        scores.push(evaluate(member));
    }

    scores = normalise(scores);

    while (selected.length < population.length) {
        for (const [index, score] of scores.entries) {
            if (Math.random() < score) {
                selected.push(population[index]);
            }
        }
    }

    return selected;
}

function crossover(parents) {
    const n = parents[0].cells.length;
    let cells = [];
    let genotype = new Map();

    for (parent of parents) {
        cells = cells.concat(parent.cells);
    }

    while (map.length < n) {
        let cell = cells[Math.ceil(Math.random() * n)];
        if (!map.has(`${cell.x}, ${cell.y}`)) {
            map.set(`${cell.x}, ${cell.y}`, cell);
        }
    }
    return genotype.values();
}

function mutate(children) {

}

function reproduction(population) {

}