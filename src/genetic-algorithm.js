function cumulative_sum(scores) {
    return scores.reduce((accumulator, value, index) => [...accumulator, value + (accumulator[index - 1] || 0)], [])
}

function normalise(scores) {
    const maxScore = Math.max(...scores);
    return scores.map(score => score / maxScore);
}

function evaluate(member) {
    return member;
}

function binary_search(ary, value) {

    if (ary.length == 1) {
        return 0;
    }

    if (ary.length == 0) {
        return;
    }

    if (value < ary[Math.floor(ary.length / 2)]) {
        return binary_search(ary.slice(0, Math.floor(ary.length / 2)), value);
    } else {
        return Math.floor(ary.length / 2) + binary_search(ary.slice(Math.floor(ary.length / 2), ary.length), value);
    }
}

function selection(population) {
    let selected = [];
    let scores = [];

    for (let member of population) {
        scores.push(evaluate(member));
    }

    scores = [0].concat(normalise(cumulative_sum(scores)));

    for (let i = 0; i < population.length; i++) {
        selected.push(population[binary_search(scores, Math.random())]);   
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

function mutate(child) {
    return cells.forEach(
        function(cell) {
            if (Math.random() > mutation_rate) {

            }
        }
    )
}

function reproduction(population) {

}
