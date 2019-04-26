import Point from "./point.js";
import GameOfLife, {glider, shoe, line} from "./game-of-life.js"

var camera, scene, renderer;
var geometry, material, mesh;

let cubes = [];

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

	let n = 10;
	let m = 10;

	for(let i = 0; i < n; i++) {
		for(let j = 0; j < m; j++) {
			// let x = Math.floor(Math.random() * n - n / 2) + 1;
			// let y = Math.floor(Math.random() * n - n / 2) + 1;
			gol.add_creature(line(), i * 20 - 100, j * 20 - 100);
			// gol.world.insert(new Point(i - n / 2, j * 10 - m / 2));
		}
	}

	// let points = [];
	// let num_cells = 35;
	// let n = 8;
	// let m = 0;

	// while(world.query(world.boundary).length < 500) {
	// 	m += 1;

	// 	world = empty_world(1000);
	// 	points = [];

	// 	for(let i = 0; i < num_cells; i++) {
	// 		let x = Math.floor(Math.random() * n - n / 2) + 1;
	// 		let y = Math.floor(Math.random() * n - n / 2) + 1;
	// 		// add_creature(world, shoe(), x, y);
	// 		let p = new Point(x, y);
	// 		points.push(p);
	// 		world.insert(p);
	// 	}

	// 	for (let i = 0; i < 500; i++) {
	// 		world = update(world);
	// 	}
	// }

	// world = empty_world(1000);
	// console.log(m);
	// points.forEach(
	// 	(p, index) => {
	// 		world.insert(p);
	// 		console.log(`${p.x}, ${p.y}`);
	// 	}
	// )

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	// generation_d.textContent = parseInt(generation_d.textContent) + 1;
	// population_d.textContent = gol.world.query(gol.world.boundary).length;

	requestAnimationFrame( animate );
	
	// scene.children.forEach(function(child) { scene.remove(child); });

	render_world(scene, gol.world);
	gol.update();

	renderer.render( scene, camera );
}

function render_world(scene, world) {
	let cells = world.query(world.boundary);
	// cells.forEach(
	// 	(cell, index) => {
	// 		add_cell(scene, cell.x, cell.y);
	// 	}
	// )

	while (cubes.length < cells.length) {
		cubes.push(new THREE.Mesh(geometry, material));
		scene.add(cubes[cubes.length - 1]);
	}

	for (let cube of cubes) {
		cube.visible = false;
	}

	cells.forEach(
		(cell, index) => {
			cubes[index].position.set(cell.x, cell.y, 0);
			cubes[index].visible = true;
		}
	)
}

function add_cell(scene, x, y) {
	let cell = new THREE.Mesh(geometry, material);
	scene.add( cell );
	cell.translateX(x);
	cell.translateY(y);
}