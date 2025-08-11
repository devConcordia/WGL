
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
	
	//const WIDTH = 1800; //innerWidth;
	//const HEIGHT = 500; //innerHeight;
	
	const WIDTH = innerWidth;
	const HEIGHT = innerHeight;
	
	let webgl = new WGL.Renderer( WIDTH, HEIGHT );
	
	///
	let shader = webgl.createProgram( VERTEX, FRAGMENT );
	

	let VoronoiData = new Object({
		zoom: 16.0,
		background: new WGL.Color( 0x0a98bf ),
		foreground: new WGL.Color( 0x000000 ),
	//	background: new WGL.Color( 0x04b545 ),
		
	//	background: new WGL.Color( 0x0576f7 ),
	//	background: new WGL.Color( 0x05cbf7 ),
	//	background: new WGL.Color( 0xf70539 ),
		vertice: webgl.createBuffer( new Float32Array([ -1,-1, 0, -1, 1, 0, 1,-1, 0, 1, 1, 0 ]) ),
		index: webgl.createBuffer( new Uint16Array([ 1, 2, 3, 0, 1, 2 ]) )
	});
	
	let resolution = new Float32Array([ WIDTH, HEIGHT ]);
	
	let projection = WGL.Matrix4.Perspective( 80, WIDTH / HEIGHT, .01, 1000 );
	
	let view = new WGL.Matrix4();
	
	webgl.clear( new WGL.Color( 0x111111, 1 ) );

	webgl.setup( shader );
	webgl.setUniform( 'resolution', resolution );
//	webgl.setUniform( 'projection', projection );
//	webgl.setUniform( 'view', view );
	
	webgl.setAttributeList( VoronoiData );
	webgl.setUniformList( VoronoiData );
	webgl.draw( 'TRIANGLES', VoronoiData.index );
	
	
	///
	document.body.appendChild( webgl.canvas );
	
}, false);

