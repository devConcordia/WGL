
import WGL from "../../../index.mjs";



const VERTEX = `
attribute vec3 vertice;
attribute vec3 color;

uniform vec3 position;
uniform mat3 rotate;

uniform mat4 projection, view;

varying vec3 _color;

void main() {

	vec3 _vertice = (rotate * vertice) + position;

	gl_Position = projection * view * vec4( _vertice, 1.0 );
	
	_color = color;
	
}`;

const FRAGMENT = `
precision highp float;

varying vec3 _color;

void main() {

	gl_FragColor = vec4( _color, 1.0 );

}`;



let BLACK = new WGL.Color( 0x111111, 1 );


var vertice = new Array();

vertice.push( 0, -1, 0 );

for( var i = 0; i < 360; i += 60 ) 
	vertice.push( Math.cos( i*Math.PI/180 ), 0, Math.sin( i*Math.PI/180 ) );

vertice.push( 0, 1, 0 );



window.addEventListener('load', function() {

	var webgl = new WGL.Renderer( innerWidth, innerHeight );
	
	///
	var shader = webgl.createProgram( VERTEX, FRAGMENT );

	var prisma = new Object();
		prisma.rotate = new WGL.Matrix3();
		prisma.position = new WGL.Vector3( 0, 0, -3 );

		prisma.vertice = webgl.createBuffer( new Float32Array( vertice ) );
		prisma.color = webgl.createBuffer( new Float32Array([
			0, 0, 0,
			1, 0, 0,
			1, 1, 0,
			0, 1, 0,
			0, 1, 1,
			0, 0, 1,
			1, 0, 1,
			1, 1, 1
		]));
		
		prisma.index = webgl.createBuffer( new Uint16Array([
			0, 1, 2,
			0, 2, 3,
			0, 3, 4,
			0, 4, 5,
			0, 5, 6,
			0, 6, 1,
			
			7, 1, 2,
			7, 2, 3,
			7, 3, 4,
			7, 4, 5,
			7, 5, 6,
			7, 6, 1
		]) );



	var projection = WGL.Matrix4.Perspective( 60, innerWidth / innerHeight, .01, 1000 );

	var view = new WGL.Matrix4();


	webgl.setup( shader );
//	webgl.setUniformList({ projection, view });
	
	webgl.setUniform( 'projection', projection );
	webgl.setUniform( 'view', view );

	/// so precisa definir o atributo uma vez
	webgl.setAttributeList( prisma );
	
	//webgl.setUniform( 'position', prisma.position );
	
	function animate() {
		
		prisma.rotate.rotateX( 0.002 );
		prisma.rotate.rotateY( 0.009 );
		prisma.rotate.rotateZ( 0.003 );
		
		webgl.clear( BLACK );
		
		webgl.setUniformList( prisma );
	//	webgl.setUniform( 'rotate', prisma.rotate );
		webgl.draw( 'TRIANGLES', prisma.index );
		
		requestAnimationFrame( animate );
	
	}
	
	animate();
	
	document.body.appendChild( webgl.canvas );

}, false);
