
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



const BLACK = new WGL.Color( 0x111111, 1 );
const WHITE = new WGL.Color( 0xffffff );


window.addEventListener('load', function() {

	let webgl = new WGL.Renderer( innerWidth, innerHeight );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	
	
	let cubeGeometry = WGL.Geometry3.Cube();
	let cubeBuffer = cubeGeometry.createTrianglesBuffer();
	
	let object = new Object();
		object.color = new WGL.Color( 0x008080 );
		object.rotate = new WGL.Matrix3();
		object.position = new WGL.Vector3( 0, 0, -3 );
		
		object.vertice = webgl.createBuffer( cubeBuffer.vertice );
		object.index = webgl.createBuffer( cubeBuffer.index );
	
	
	///
	let projection = WGL.Matrix4.Perspective( 60, innerWidth / innerHeight, .01, 1000 );

	let view = new WGL.Matrix4();


	webgl.setup( shader );
//	webgl.setUniformList({ projection, view });
	
	webgl.setUniform( 'projection', projection );
	webgl.setUniform( 'view', view );

	/// so precisa definir o atributo uma vez
	webgl.setAttributeList( object );
	
	//webgl.setUniform( 'position', object.position );
	
	function animate() {
		
		object.rotate.rotateX( 0.002 );
		object.rotate.rotateY( 0.009 );
		object.rotate.rotateZ( 0.003 );
		
		webgl.clear( BLACK );
		
		webgl.setUniformList( object );
	//	webgl.setUniform( 'rotate', object.rotate );
		webgl.draw( 'TRIANGLES', object.index );
		
		
		///
		webgl.setUniform( 'color', WHITE );
	//	webgl.draw( 'LINE_LOOP', object.index );
		webgl.draw( 'LINE_STRIP', object.index );
		
		requestAnimationFrame( animate );
	
	}
	
	animate();
	
	document.body.appendChild( webgl.canvas );

}, false);
