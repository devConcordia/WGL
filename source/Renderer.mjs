
import Program from './Program.mjs';
import Buffer from './Buffer.mjs';
import Texture from './Texture.mjs';



/** Renderer
 *
 */
export default class Renderer {

	/** 
	 *	
	 *	@param {Number} width
	 *	@param {Number} height
	 */
    constructor( width, height ) {

    	var canvas = document.createElement('canvas');
    //	var canvas = document.createElement('canvas', { premultipliedAlpha: false });
            canvas.setAttribute( 'width', width );
            canvas.setAttribute( 'height', height );

        var context = canvas.getContext('webgl');
            context.viewport( 0, 0, width, height );
			
			
    
			context.enable( context.DEPTH_TEST );
		//	context.enable( context.CULL_FACE );
			context.enable(context.BLEND);
		//	context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
			
		//	context.enable( context.CULL_FACE );
		//	context.enable( context.DITHER );
			
		//	context.cullFace( context.FRONT )
		//	context.cullFace( context.BACK )
			
		//	context.enable( context.SAMPLE_ALPHA_TO_COVERAGE );
		//	context.enable( context.BLEND );
		//	context.blendFunc( context.SRC_COLOR, context.DST_COLOR );
		//	context.blendFunc( context.ONE, context.SRC_COLOR );
			
		this.canvas = canvas;
		this.context = context;
		
		/// current usage
		this.program = null;
		
		/// current texture index
		this.textures = new Array();
		
		/// 
		this.drawArraysLength = 0;
		
		///
		this.frameBuffer = context.createFramebuffer();
		this.renderBuffer = context.createRenderbuffer();
		
		
	}
	
	/** createProgram
	 *
	 *  @param {String} vertexScript
	 *  @param {String} fragmentScript
	 *	@return {WGLProgram}
	 */
	createProgram( vertexScript, fragmentScript ) {

		return new Program( this.context, vertexScript, fragmentScript );
		
	}
	
	/** createBuffer
	 *
	 *  @param {Float32Array | Uint16Array} data
	 *  @param {Number} usage						STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
	 *	@return {WGLBuffer}
	 */
	createBuffer( data, usage ) {
		
		return new Buffer( this.context, data, usage );
		
	}
	
	/** createTexture
	 *	
	 *	@param {*} data
	 *	@param {Object} options				{ width, height, level, format, type, filter, wrap }
	 *	@return {WGLTexture}
	 */
	createTexture( data = null, options = {} ) {
		
		return new Texture( this.context, data, options );
		
	}
	
	/* */
	
	/** resize
	 *	
	 *	@param {Number} width
	 *	@param {Number} height
	 */
	resize( width, height ) {
		
		let { canvas, context } = this;
		
		canvas.setAttribute( 'width', width );
        canvas.setAttribute( 'height', height );
		
		///
		context.viewport( 0, 0, width, height );
		
	}
	
	/** clear
	 *	
	 *	@param {Color} color		!Optional
	 */
	clear( color ) {

		let gl = this.context;
		
		if( color ) 
			gl.clearColor( ...color );
		 
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	}
	
	/** setup
	 *	
	 *	desabilta os attibutes do program anterior
	 *	altera o programa utilizado
	 *	habilita os attibutes do programa atual
	 *	reseta o indice das texturas
	 *	
	 *	@param {WGLProgram} objectProgram
	 */
	setup( objectProgram ) {

		let gl = this.context;
		let current = this.program;
		
		///
		if( current ) 
			current.disableAttributes();

		gl.useProgram( objectProgram.program );
		
		///
		objectProgram.enableAttributes( gl );
		
		/// reset all texture index
		for( let t of this.textures ) 
			t.index = -1;
		
		this.program = objectProgram;
		this.textures = new Array();
		
		gl.enable( gl.DEPTH_TEST );
		
	}

	/** setUniformList
	 *	
	 */
	setUniform( name, value ) {
		
		let gl = this.context;
		
		if( value.texture ) {
					
			if( value.index == -1 ) {
				
				value.index = this.textures.push( value ) - 1;
				
				gl.activeTexture( gl.TEXTURE0 + value.index );
				gl.bindTexture( gl.TEXTURE_2D, value.texture );
				
			}
			
			value = value.index;
			
		}
		
		this.program.uniforms[ name ].set( value );
		
	}
	
	/** setUniformList
	 *
	 *	@param {Object} list
	 */
	setUniformList( list ) {
		
		let gl = this.context;
		
		let uniforms = this.program.uniforms;
		
		for( let name in uniforms ) {
			
			if( name in list ) {

				let value = list[ name ];

				if( value.texture ) {
					
					if( value.index == -1 ) {
						
						value.index = this.textures.push( value ) - 1;
						
						gl.activeTexture( gl.TEXTURE0 + value.index );
						gl.bindTexture( gl.TEXTURE_2D, value.texture );
				
					}
					
					value = value.index;
					
				}
				
				uniforms[ name ].set( value );
				
			}

		}

	}
	
	/** setAttribute
	 *	
	 *	@ref https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer
	 *	@ref https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
	 *	
	 *	@param {String} name
	 *	@param {WGLBuffer} { buffer, length }
	 */
	setAttribute( name, { buffer, length }) {
		
		let gl = this.context;
		
		let { location, size } = this.program.attributes[ name ];
		
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
		gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
		
		this.drawArraysLength = length / size;
		
	}
	
	/** setAttributeList
	 *	
	 *	@param {Object} list
	 */
	setAttributeList( list ) {
		
		let attributes = this.program.attributes;
		let gl = this.context;
		
		for( let name in attributes ) {

			if( name in list ) {
				
				let { location, size } = attributes[ name ];
				let { buffer, length } = list[ name ];
				
				gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
				gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
				
				///
				this.drawArraysLength = length / size;
		
			}
			
		}
		
	}
	
	/** draw
	 *	
	 *	@param {Number} mode
	 *	@param {null | WGLBuffer} index
	 *	@param {Number} offset
	 *	@param {Number} count
	 */
	draw( mode, index = null, offset = 0, count ) {
		
		let gl = this.context;
		
		mode = gl[ mode ];
		
		if( index == null ) {
			
			gl.drawArrays( mode, offset, count || this.drawArraysLength );
		
		} else {
			
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, index.buffer );
			gl.drawElements( mode, count || index.length, gl.UNSIGNED_SHORT, offset );

		}
		
	}
	
}

