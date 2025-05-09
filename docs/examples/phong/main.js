
/** 
 *	
 *	Based in https://github.com/mrdoob/three.js/tree/master
 *	
 */

import WGL from "../../../source/index.mjs";

import PhongMaterial from './PhongMaterial.mjs';

async function getScript( url ) {
	
		const response = await fetch( url );
		
		if (!response.ok) 
			throw new Error("Can't load: "+ url );

	return response.text()
  
}

window.addEventListener('load', async function() {
	
	const WIDTH = innerWidth;
	const HEIGHT = innerHeight;
	
	let VERTEX = await getScript('vertex.glsl');
	let FRAGMENT = await getScript('fragment.glsl');
	
	
	
	let webgl = new WGL.Renderer( WIDTH, HEIGHT );
	
	let projection = WGL.Matrix4.Perspective( 45, WIDTH / HEIGHT, .01, 1000 );
	
	let view = new WGL.Matrix4();
	let viewPosition = new WGL.Vector3( 0, 0, -5 );
	
	view.x = viewPosition.x;
	view.y = viewPosition.y;
	view.z = viewPosition.z;
	
	
	let sphereBuffer = WGL.Geometry3.Sphere().createTrianglesBuffer();
	
	let SphereData = {
		material: new PhongMaterial( 0x000000, 0xAA0000, 0xffffff, 32.0 ),
		model: new WGL.Matrix4(),
		normalMatrix: new WGL.Matrix3(),
		vertice: webgl.createBuffer( sphereBuffer.vertice ),
		normal: webgl.createBuffer( sphereBuffer.normal ),
		index: webgl.createBuffer( sphereBuffer.index )
	};
	
	let lightPosition = new WGL.Vector3( 5, 0, 0 );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	
	function render() {
		
		lightPosition.applyAxisAngle( 0.01, WGL.Vector3.Y );
		SphereData.normalMatrix = SphereData.model.getMatrix3().invert();
		
		webgl.clear( new WGL.Color( 0x111111, 1 ) );
		
		webgl.setup( shader );
		webgl.setUniform( 'projection', projection );
		webgl.setUniform( 'view', view );
		webgl.setUniform( 'viewPosition', viewPosition );
		webgl.setUniform( 'lightPosition', lightPosition );
		
		webgl.setAttributeList( SphereData );
		webgl.setUniformList( SphereData );
		
		webgl.draw( 'TRIANGLES', SphereData.index );
		
		window.requestAnimationFrame( render );
		
		
	}
	
	render();
	
	
	///
	document.body.appendChild( webgl.canvas );
	
	
}, false);

