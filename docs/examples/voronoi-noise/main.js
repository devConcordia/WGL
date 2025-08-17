
import WGL from "../../wgl.mjs";



async function getScript( url ) {
	
		const response = await fetch( url );
		
		if (!response.ok) 
			throw new Error("Can't load: "+ url );

	return response.text()
  
}


window.addEventListener('load', async function() {
	
	const VERTEX = await getScript('vertex.glsl');
	const FRAGMENT = await getScript('fragment.glsl');
	
//	const WIDTH = 1280;
//	const HEIGHT = 720;
	
//	const WIDTH = 1920;
//	const HEIGHT = 1080;
	
	const WIDTH = innerWidth;
	const HEIGHT = innerHeight;
	
	let webgl = new WGL.Renderer( WIDTH, HEIGHT );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	
	let VoronoiData = new Object({
		zoom: 16.0,
		vertice: webgl.createBuffer( new Float32Array([ -1,-1, 0, -1, 1, 0, 1,-1, 0, 1, 1, 0 ]) ),
		index: webgl.createBuffer( new Uint16Array([ 1, 2, 3, 0, 1, 2 ]) )
	});
	
	let resolution = new Float32Array([ WIDTH, HEIGHT ]);
	
	webgl.clear( new WGL.Color( 0x111111, 1 ) );

	webgl.setup( shader );
	webgl.setUniform( 'resolution', resolution );
	
	webgl.setAttributeList( VoronoiData );
	webgl.setUniformList( VoronoiData );
	webgl.draw( 'TRIANGLES', VoronoiData.index );
	
	///
	document.body.appendChild( webgl.canvas );
	
}, false);

