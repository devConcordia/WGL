
//import Color from "/module/math/Color/Color.mjs";
//import Vector3 from "/module/math/Vector/Vector3.mjs";
//import Matrix3 from "/module/math/Matrix/Matrix3.mjs";
//import Matrix4 from "/module/math/Matrix/Matrix4.mjs";

import WGL from "../../../index.mjs";



const VERTEX = `
attribute vec3 vertice;

uniform vec3 position;
uniform mat3 rotate;

uniform mat4 projection, view;

void main() {

	vec3 _vertice = (rotate * vertice) + position;

	gl_Position = projection * view * vec4( _vertice, 1.0 );

}`;

const FRAGMENT = `
precision highp float;

uniform vec3 color;

void main() {

	gl_FragColor = vec4( color, 1.0 );

}`;



window.addEventListener('load', function() {

	let webgl = new WGL.Renderer( innerWidth, innerHeight );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	
	let triangle = new Object;
		triangle.rotate = new WGL.Matrix3();
		triangle.position = new WGL.Vector3( 0, 0, -1 );
		triangle.color = new WGL.Color( 0x0000ff );
		triangle.vertice = webgl.createBuffer( new Float32Array([ -.5, 0, 0, 0,.5, 0, .5, 0, 0 ]) );
		
	let triangle2 = Object.assign( new Object, triangle );
		triangle2.rotate = new WGL.Matrix3().rotateZ( Math.PI );
		triangle2.color = new WGL.Color( 0xff0000 );

	let square = new Object;
		square.rotate = new WGL.Matrix3();
		square.color = new WGL.Color( 0x00ff00 );
		square.position = new WGL.Vector3( 0, 0, -3 );
		square.vertice = webgl.createBuffer( new Float32Array([ -1,-1, 0, -1, 1, 0, 1,-1, 0, 1, 1, 0 ]) );
		square.index = webgl.createBuffer( new Uint16Array([ 3, 1, 0, 1, 2, 3, 0, 2 ]) );

	let projection = WGL.Matrix4.Perspective( 80, innerWidth / innerHeight, .01, 1000 );
	
	let view = new WGL.Matrix4();
	
	webgl.clear( new WGL.Color( 0x111111, 1 ) );
	
	webgl.setup( shader );
	webgl.setUniform( 'projection', projection );
	webgl.setUniform( 'view', view );
	
	webgl.setAttributeList( triangle );
	webgl.setUniformList( triangle );
	webgl.draw( 'TRIANGLES' );
	
	webgl.setUniformList( triangle2 );
	webgl.draw( 'TRIANGLES' );
	
	webgl.setUniformList( square );
	webgl.setAttributeList( square );
	webgl.draw( 'LINES', square.index );


	///
	document.body.appendChild( webgl.canvas );
	
}, false);

