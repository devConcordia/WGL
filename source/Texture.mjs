
/** is_power2
 *
 *  @param {Number} n
 *  @return {Boolean}
 */
function is_power2( n ) { return (n & (n-1)) === 0 }


export default class WGLTexture {
	
	/** createTexture
	 *	
	 *  @param {WebGLRenderingContext} gl
	 *	@param {*} data
	 *	@param {Object} options				{ width, height, level, format, type, filter, wrap }
	 */
	constructor( gl, data, options ) {
		
		let format = gl[ options.format || 'RGBA' ],
			type   = gl[ options.type   || 'UNSIGNED_BYTE' ],
			filter = gl[ options.filter || 'LINEAR' ],
			wrap   = gl[ options.wrap   || 'CLAMP_TO_EDGE' ];
		
		let level = options.level || 0,
			width, height;
		
		///
		let texture = gl.createTexture();
		
		gl.bindTexture( gl.TEXTURE_2D, texture );
		
		///
		if( data == null ) {

			width = options.width || 1;
			height = options.height || 1;

			if( format == gl.RGB ) 
				gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );

			gl.texImage2D( gl.TEXTURE_2D, level, format, width, height, 0, format, type, data );

		} else {

			switch( data.constructor.name ) {

				case 'HTMLImageElement':
				
						width = data.naturalWidth;
						height = data.naturalHeight;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;
				
				case 'HTMLVideoElement':
					
						width = data.videoWidth;
						height = data.videoHeight;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;
					
				case 'ImageData':
				case 'ImageBitmap':
				case 'HTMLCanvasElement':

						width = data.width;
						height = data.height;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;

				case 'Array':
				case 'Uint8Array':
				case 'Uint16Array':

						width = options.width || 1;
						height = options.height || 1;

						if( type == gl.UNSIGNED_BYTE ) {

							data = new Uint8Array( data );

						} else {

							data = new Uint16Array( data );

						}

						if( format == gl.RGB ) gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );

						gl.texImage2D( gl.TEXTURE_2D, level, format, width, height, 0, format, type, data );

					break;

			}

		}

		///
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, 1 );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter );
		
		if( is_power2( width ) && is_power2( height ) ) {

			gl.generateMipmap( gl.TEXTURE_2D );

		} else {

			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap );

		}
		
		///
		this.texture = texture;
		this.width = width;
		this.height = height;
		this.index = -1;
		
	}
	
	/** update
	 *	
	 */
	update() {
		
		/// TODO
		
	}
	
}

