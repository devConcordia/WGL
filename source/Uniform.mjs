
///
const UNIFORM_TYPES = [ "int", "bool", "sampler2D", "float", "vec2", "vec3", "vec4", "mat2", "mat3", "mat4" ];

///
const UNIFORM_TYPES_INT = [ "int", "bool", "sampler2D" ];

/** isIterator
 *	
 *  @param {*} e
 *  @return {Boolean}
 */
function isIterator( e ) { return e instanceof Object && Symbol.iterator in e }

/** Uniform
 *	
 */
export default class Uniform {
	
	constructor( gl, location, type, size ) {
		
		this.gl = gl;
		
		this.location = location;
		
		this.type = type;
		this.size = size;
		
	}
	
	set( value ) {
		
		let { gl, location, type, size } = this;
		
		if( size > 0 ) {

			if( UNIFORM_TYPES.includes( type ) ) {

				let data = new Array();

				if( isIterator( value[0] ) ) {

					for( let v of value )
						data.push( ...v );

				} else {

					data = value;

				}

				if( UNIFORM_TYPES_INT.includes( type ) ) {

					value = new Int32Array( data );

				} else {

					value = new Float32Array( data );

				}

			} else {
				
				console.log( 'failure uniform type' );
				
			//	for( let i = 0; i < quantity; i++ )
			//		for( let key in location[i] )
			//			webgl_setup_uniform_value( gl, location[i][ key ], value[i][ key ] );
			//
			//	return;

			}

		}
		
		
		///
		switch( type ) {

			case "int":
			case "bool":
			case "sampler2D":

					if( value instanceof Int32Array ) {

						gl.uniform1iv( location, value );

					} else {

						gl.uniform1i( location, value );

					}

				break;

			case "float":

					if( value instanceof Float32Array ) {

						gl.uniform1fv( location, value );

					} else {

						gl.uniform1f( location, value );

					}

				break;

			case "vec2":
					gl.uniform2fv( location, value );
				break;

			case "vec3":
					gl.uniform3fv( location, value );
				break;

			case "vec4":
					gl.uniform4fv( location, value );
				break;

			case "mat2":
					gl.uniformMatrix2fv( location, false, value );
				break;

			case "mat3":
					gl.uniformMatrix3fv( location, false, value );
				break;

			case "mat4":
					gl.uniformMatrix4fv( location, false, value );
				break;

			default:

				console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

				/*	if( location instanceof WebGLUniformLocation ) {

						console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

					} else {
						
						for( let key in location )
							webgl_setup_uniform_value( gl, location[ key ], value[ key ] );

					}
				/**/
				
				break;

		}
		
	}
	
	
	/*
	
	set( value ) {
		
		if( quantity > 0 ) {

			if( UNIFORM_TYPES.includes( type ) ) {

				let data = new Array();

				if( isIterator( value[0] ) ) {

					for( let v of value )
						data.push( ...v );

				} else {

					data = value;

				}

				if( UNIFORM_TYPES_INT.includes( type ) ) {

					value = new Int32Array( data );

				} else {

					value = new Float32Array( data );

				}

			} else {
				
				for( let i = 0; i < quantity; i++ )
					for( let key in location[i] )
						webgl_setup_uniform_value( gl, location[i][ key ], value[i][ key ] );

				return;

			}

		}

		switch( type ) {

			case "int":
			case "bool":
			case "sampler2D":

					if( value instanceof Int32Array ) {

						gl.uniform1iv( location, value );

					} else {

						gl.uniform1i( location, value );

					}

				break;

			case "float":

					if( value instanceof Float32Array ) {

						gl.uniform1fv( location, value );

					} else {

						gl.uniform1f( location, value );

					}

				break;

			case "vec2":
					gl.uniform2fv( location, value );
				break;

			case "vec3":
					gl.uniform3fv( location, value );
				break;

			case "vec4":
					gl.uniform4fv( location, value );
				break;

			case "mat2":
					gl.uniformMatrix2fv( location, false, value );
				break;

			case "mat3":
					gl.uniformMatrix3fv( location, false, value );
				break;

			case "mat4":
					gl.uniformMatrix4fv( location, false, value );
				break;

			default:

					if( location instanceof WebGLUniformLocation ) {

						console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

					} else {
						
						for( let key in location )
							webgl_setup_uniform_value( gl, location[ key ], value[ key ] );

					}

				break;

		}

		
	}
	
	
	/**/
	
}

