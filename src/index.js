import Point from "./point.js";
import GameOfLife, {glider, shoe, line} from "./game-of-life.js"
import evolve from "./genetic-algorithm.js"

var camera, scene, renderer;
var geometry, material, mesh;

let population = [];

let cubes = [];
let period = 200;
let iPeriod = 0;

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

	// let creatureCoordinates = evolveCreature(5, 3, 5, 20);
	// let creature = generateCreatureFromCoordinates(creatureCoordinates);
	// console.log(creature);
	// gol.addCreature(creature, 0, 0);

	population = evolveCreature(5, 3, 5, 100);

	// population.forEach(
	// 	(creatureCoordinates, index) => {
	// 		let creature = generateCreatureFromCoordinates(creatureCoordinates);
	// 		console.log(creature);
	// 		gol.addCreature(creature, 0, index * 4);
	// 	}
	// )

	// let n = 10;
	// let m = 10;

	// for(let i = 0; i < n; i++) {
	// 	for(let j = 0; j < m; j++) {
	// 		// let x = Math.floor(Math.random() * n - n / 2) + 1;
	// 		// let y = Math.floor(Math.random() * n - n / 2) + 1;
			// gol.addCreature(line(), i * 20 - 100, j * 20 - 100);
	// 		// gol.world.insert(new Point(i - n / 2, j * 10 - (m * 10) / 2));
	// 	}
	// }

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	if (iPeriod === 0) {
		gol = new GameOfLife();
		let creature = generateCreatureFromCoordinates(population.splice(0, 1)[0]);
		gol.addCreature(creature, 0, 0)
	}

	iPeriod += 1;
	
	if (iPeriod === period) {
		iPeriod = 0;
	}

	renderWorld(scene, gol.world);
	gol.update();

	renderer.render( scene, camera );

	// requestAnimationFrame( animate );

	// renderWorld(scene, gol.world);
	// // gol.update();

	// renderer.render( scene, camera );
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

function evaluate(creatureCoordinates) {
	let creature = generateCreatureFromCoordinates(creatureCoordinates);
	let gol = new GameOfLife();
	gol.addCreature(creature, 0, 0);

	let maxCells = 0;
	for (let i = 0; i < 200; i++) {
		gol.update();
		maxCells = Math.max(maxCells, gol.world.points.length);
	}

	return maxCells;
}

function generateCreatureCoordinates(numCells, size) {

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

function generateCreatureFromCoordinates(creatureCoordinates) {
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

function evolveCreature(numCells, size, numIterations, populationSize) {
	let population = [];
	let fittest;
	let score = 0;

	for (let i = 0; i < populationSize; i++) {
		population.push(generateCreatureCoordinates(numCells, size));
	}

	population = evolve(population, evaluate, numIterations, 0.01);

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