
export default class WGLBuffer {
	
	/** WGLBuffer
	 *
	 *  @param {WebGLRenderingContext} gl
	 *  @param {Float32Array|Uint16Array} data
	 *  @param {Number} usage						STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
	 */
	constructor( gl, data, usage ) {
		
		let buffer = gl.createBuffer(),
			target = (data instanceof Uint16Array)? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
		
		gl.bindBuffer( target, buffer );
		gl.bufferData( target, data, usage || gl.STATIC_DRAW );
		
		this.buffer = buffer;
		this.length = data.length;
		
	}
	
	/** update
	 *	
	 */
	update() {
		
		/// TODO
		
	}
	
}

