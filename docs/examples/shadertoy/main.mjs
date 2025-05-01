
import FileLoader from "./FileLoader.mjs";

import WGL from "../../../source/index.mjs";


const WIDTH = 680;
const HEIGHT = 480;

const BACKGROUND_COLOR = new WGL.Color( 0x111111, 1 );

const VERTEX = `
attribute vec3 vertice;

void main(void) {

	gl_Position = vec4( vertice, 1.0 );

}
`;


const FRAGMENT_LIST = [
	"4ttGWM",
	"MdyGzR",
	"Ms2SD1",
	"mtyGWy",
	"tXB3zc",
	"WdXBW4",
	"Xd3GD4",
	"Xds3zN",
	"XsXXDn",
	"XX3fDH"
];



window.addEventListener('load', function() {

	const webgl = new WGL.Renderer( WIDTH, HEIGHT );
	
	document.getElementById('main').appendChild( webgl.canvas );
	
	let shader = null;
	
	let mesh = new Object({
		vertice: webgl.createBuffer( new Float32Array([ -1,-1, 0, -1, 1, 0, 1,-1, 0, 1, 1, 0 ]) ),
		coords: webgl.createBuffer( new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]) ),
		index: webgl.createBuffer( new Uint16Array([ 1, 2, 3, 0, 1, 2 ]) )
	});
	
	
	let iResolution = new Float32Array([ WIDTH, HEIGHT ]);
	
	const start = Date.now();
	
	function animate() {
		
		let iTime = (Date.now() - start)/2000;
		
		webgl.clear( BACKGROUND_COLOR );
		
		webgl.setUniformList({ iResolution, iTime });
		webgl.setUniformList( mesh );
		
		webgl.draw( 'TRIANGLES', mesh.index );
		
		requestAnimationFrame( animate );
		
	}
	
	function updateProgram( fragId ) {
		
		if( fragId == '' ) return;
		
		FileLoader.Load( "frag/"+ fragId +".glsl", "text", function(frag) {
		
			shader = webgl.createProgram( VERTEX, frag);
			
			webgl.setup( shader );
			webgl.setAttributeList( mesh );
		
			animate();		
		
		});
		
	}
	
	
	
	window.onhashchange = function(evt) {
		
		updateProgram( location.hash.replace('#', '') );
		
	};
	
	let fragUl = document.createElement('ul');
	
	for( let fragId of FRAGMENT_LIST ) {
		
		let li = document.createElement('li');
			li.id = fragId;
			
		let a = document.createElement('a');
			a.innerHTML = fragId;
			a.href = '#'+ fragId;
		
		li.appendChild(a);
		fragUl.appendChild(li);
			
	}
	
	document.getElementById('index').appendChild( fragUl );
	
	///
	location.hash = '';
	
}, false);
