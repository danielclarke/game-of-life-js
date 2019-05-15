import Point from "./point.js";
import GameOfLife, {glider, shoe, line} from "./game-of-life.js"
import evolver from "./genetic-algorithm.js"
import {generateRandomCreature,	generateGolCreatureFromCreature, generateGolCreatureFromSequence, evaluate, crossover, mutate} from "./creature.js"

var camera, scene, renderer;
var geometry, material, mesh;

let population = [];

let cubes = [];
const numCells = 10;
const creatureWidth = 5;
const numGenerations = 10;
const populationSize = 20;
const period = 1200;
let iPeriod = 0;
let iCreature = 0;

let gol = new GameOfLife();
// const generation_d = document.querySelector('.generation');
// const population_d = document.querySelector('.population');

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 1000 );
	camera.position.z = 100;

	geometry = new THREE.BoxGeometry( 1, 1, 1 );
	material = new THREE.MeshNormalMaterial();

	scene = new THREE.Scene();

	// population = evolveCreature(numCells, creatureWidth, numGenerations, populationSize);

	for (let i = 0; i < 10; i++) {
		let creature = [];
		let width = Math.floor(Math.random() * 50) * 2;
		for (let j = 0; j < width; j++) {
			creature.push([j, i * 2])
		}
		gol.addCreature(generateGolCreatureFromSequence(creature), - width / 2, 0);
	}
	// gol.addCreature(generateGolCreatureFromSequence([[0, 0], [0, 1], [1, 0], [1, 1]]), 0, 0);

	// gol.addCreature(generateGolCreatureFromCreature(generateRandomCreature(100, 40)), 0, 0);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {
	requestAnimationFrame( animate );

	// if (iPeriod === 0) {
	// 	gol = new GameOfLife();
	// 	let creature = generateGolCreatureFromCreature(population[iCreature]);
	// 	iCreature += 1;
	// 	if (iCreature === populationSize) {
	// 		iCreature = 0;
	// 	}
	// 	gol.addCreature(creature, 0, 0)
	// }

	// iPeriod += 1;
	
	// if (iPeriod === period) {
	// 	iPeriod = 0;
	// }

	renderWorld(scene, gol.world);
	gol.update();

	renderer.render( scene, camera );
}

function renderWorld(scene, world) {
	while (cubes.length < world.points.length) {
		cubes.push(new THREE.Mesh(geometry, material));
		scene.add(cubes[cubes.length - 1]);
	}

	for (let cube of cubes) {
		cube.visible = false;
	}

	world.points.forEach(
		(cell, index) => {
			cubes[index].position.set(cell.x, cell.y, 0);
			cubes[index].visible = true;
		}
	)
}

function evolveCreature(numCells, size, numGenerations, populationSize) {
	let population = [];
	let fittest;
	let score = 0;

	const evolve = evolver(evaluate, crossover, mutate)(numGenerations, 0.01, 2);

	for (let i = 0; i < populationSize; i++) {
		population.push(generateRandomCreature(numCells, size));
	}

	population = evolve(population);

	return population;

	// for (let member of population) {
	// 	let s = evaluate(member);
	// 	if (s > score) {
	// 		score = s;
	// 		fittest = member;
	// 	}
	// }

	// console.log(fittest);

	// return fittest;
}