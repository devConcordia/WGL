
import WGL from "../../wgl.mjs";



const VERTEX = `
attribute vec3 vertice;
attribute vec2 coords;

uniform mat4 projection;
uniform vec3 position;

varying vec2 _coords;

void main(void) {

	gl_Position = projection * vec4( vertice + position, 1.0 );

	_coords = coords;

}`;

const FRAGMENT = `
precision highp float;

uniform sampler2D sampler;

uniform float width, height;

const mat3 mask = mat3( 
					vec3( 1.0, 5.0, 1.0), 
					vec3( 0.0, 0.0, 0.0), 
					vec3(-1.0,-5.0,-1.0) );

varying vec2 _coords;

const vec3 monochrome = vec3( 0.298912, 0.586611, 0.114478 );

void main(void) {
	
//	gl_FragColor = texture2D( sampler, _coords );
	
	vec3 v = vec3(0.0),
		 h = vec3(0.0);
	
	vec2 res = vec2( 1.0 / width, 1.0 / height );

	for( int y = 0; y < 3; y++ ) {
		for( int x = 0; x < 3; x++ ) {
			
			vec3 pixel = texture2D( sampler, _coords + res * vec2( x, y ) ).rgb;
			
			v += pixel * mask[ y ][ x ];
			h += pixel * mask[ x ][ y ];
			
		}
	}
	
	vec3 f = sqrt( h * h + v * v );
	
	gl_FragColor = vec4( vec3(f), 1.0 );
	
}`;







window.addEventListener('load', function() {

	let BLACK = new WGL.Color( 0x111111, 1 );

	let webgl = new WGL.Renderer( innerWidth, innerHeight );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	
	let projection = WGL.Matrix4.Perspective( 60, innerWidth / innerHeight, .01, 1000 );
	
	let textureObject = null;
	
	
	let octocatImage = new Image();
		octocatImage.addEventListener('load', function() {
			
			let { width, height } = octocatImage;
			
			///
			textureObject = {
				width, 
				height,
				vertice: webgl.createBuffer( new Float32Array([
					-1, -1, 
					0, -1, 
					1, 0, 
					1,-1, 
					0, 1, 
					1, 0 
				]) ),
				coords: webgl.createBuffer( new Float32Array([ 0, 1, 0, 0, 1, 1, 1, 0 ]) ),
				index: webgl.createBuffer( new Uint16Array([ 1, 2, 3, 0, 1, 2 ] ) ),
				position: new WGL.Vector3( 0, 0, -2 ),
				sampler: webgl.createTexture( octocatImage, { width, height })
			};
			
			render();
			
		});
		octocatImage.src = "octocat.png";
		
		
	function render() {
		
		webgl.setup( shader );
		webgl.clear( BLACK );
		
		webgl.setUniform( 'projection', projection );
		
		webgl.setAttributeList( textureObject );
		webgl.setUniformList( textureObject );
		
		webgl.draw( 'TRIANGLES', textureObject.index );
		
	}
	
	document.body.appendChild( webgl.canvas );

}, false);
