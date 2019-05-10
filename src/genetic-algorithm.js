function cumulativeSum(scores) {
    return scores.reduce((accumulator, value, index) => [...accumulator, value + (accumulator[index - 1] || 0)], [])
}

function normalise(scores) {
    const maxScore = Math.max(...scores);
    return scores.map(score => score / maxScore);
}

function binarySearch(scores, value) {

    if (scores.length == 1) {
        return 0;
    }

    if (scores.length == 0) {
        return;
    }

    if (value < scores[Math.floor(scores.length / 2)]) {
        return binarySearch(scores.slice(0, Math.floor(scores.length / 2)), value);
    } else {
        return Math.floor(scores.length / 2) + binarySearch(scores.slice(Math.floor(scores.length / 2), scores.length), value);
    }
}

function selector(evaluate) {
    return (numToSelect) => (population) => {
        let selected = [];
        let scores = normalise(cumulativeSum(population.map(member => evaluate(member))));
        scores = [0].concat(scores);
    
        for (let i = 0; i < numToSelect * population.length; i++) {
            selected.push(population[binarySearch(scores, Math.random())]);   
        }
    
        return selected;
    }
}

function breeder(crossover) {
    return (numParents) => (parents) => {
        let children = [];
        for (let i = 0; i < parents.length; i += numParents) {
            children.push(crossover(parents.slice(i, i + numParents)));
        }
        return children;
    }
}

function mutator(mutate) {
    return (mutationRate) => (population) => {
        let mutated = []

        for (let child of population) {
            if (Math.random() <= mutationRate) {
                mutated.push(mutate(child));
            } else {
                mutated.push(child);
            }
        }
        return mutated;
    }
}

export default function evolver(evaluate, crossover, mutate) {

    return (numGenerations, mutationRate, numParents) => {

        const mutateAll = mutator(mutate)(mutationRate);
        const breed = breeder(crossover)(numParents);
        const select = selector(evaluate)(numParents);

        return (population) => {
            for (let i = 0; i < numGenerations; i++) {
                console.log(`generation: ${i}`);
                population = mutateAll(breed(select(population)));
            }
            return population;
        }
    }
}
