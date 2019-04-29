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
	camera.position.z = 200;

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
			// gol.world.insert(new Point(i - n / 2, j * 10 - (m * 10) / 2));
		}
	}

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	render_world(scene, gol.world);
	gol.update();

	renderer.render( scene, camera );
}

function render_world(scene, world) {
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

function add_cell(scene, x, y) {
	let cell = new THREE.Mesh(geometry, material);
	scene.add( cell );
	cell.translateX(x);
	cell.translateY(y);
}