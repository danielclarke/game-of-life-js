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

function scorer(evaluate) {
    return (scoreCache) => (population) => {
        let scores = [];

        for (let member of population) {
            if (member.signature in scoreCache) {
                scores.push(scoreCache[member.signature]);
            } else {
                scores.push(evaluate(member));
                scoreCache[member.signature] = scores[scores.length - 1];
            }
        }
        return scores;
    }
}

function selector(score) {
    return (numToSelect) => (population) => {
        let selected = [];
        let scores = normalise(cumulativeSum(score(population)));
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

        let scoreCache = {};

        const mutateAll = mutator(mutate)(mutationRate);
        const breed = breeder(crossover)(numParents);
        const score = scorer(evaluate)(scoreCache);
        const select = selector(score)(numParents);

        return (population) => {
            for (let i = 0; i < numGenerations; i++) {
                console.log(`generation: ${i}`);
                population = mutateAll(breed(select(population)));
            }
            // call score one more time to score the last population
            score(population);
            population.sort(
                (creatureA, creatureB) => {return scoreCache[creatureB.signature] - scoreCache[creatureA.signature]}
            );
            for (let p of population) {
                console.log(`${p.signature} ${scoreCache[p.signature]}`);
            }
            return population;
        }
    }
}
