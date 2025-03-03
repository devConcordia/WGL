
import Attribute from './Attribute.mjs';
import Uniform from './Uniform.mjs';
import UniformArray from './UniformArray.mjs';
import UniformStruct from './UniformStruct.mjs';

/** webglCreateShader
 *
 *  @param {WebGLRenderingContext} gl
 *	@param {String} script
 *	@param {Number} type             gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
 *	@return {WebGLShader}
 */
function webglCreateShader( gl, script, type ) {

	let shader = gl.createShader( type );

	gl.shaderSource( shader, script );
	gl.compileShader( shader );

	if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
		throw new Error( gl.getShaderInfoLog( shader ) );
		
	return shader;
	
}

/** getAttributeLocations
 *	
 *	@param {Program} { gl, program, attributes }
 *	@param {String} script
 */
function getAttributeLocations({ gl, program, attributes }, script ) {
	
    const ATTRIBUTE_REGEX = /attribute\s+(\w+)\s+([^;]+);/g;

    let match;
    while( (match = ATTRIBUTE_REGEX.exec( script )) !== null ) {
		
        let type = match[1];
        let list = match[2].split(",").map(s => s.trim());

        for( let name of list ) {
			
			let location = gl.getAttribLocation( program, name );
			
			attributes[ name ] = new Attribute( gl, location, type );
			
		}
		
    }

}

/** extractStructs
 *	
 *	@param {String} script
 *	@return {Object}
 */
function extractStructs( script ) {
	
	const output = new Object;
	
    const STRUCT_REGEX = /struct\s+(\w+)\s*\{([^}]+)\}/g;
    const MEMBERS_REGEX = /(\w+)\s+(\w+)(\[\d+\])?;/g;
	
    
    let match;
	
    while ((match = STRUCT_REGEX.exec( script )) !== null) {
		
        let structName = match[1];
        let structBody = match[2].trim();
        
        let members = new Object;
        
        let memberMatch;
		
        while ((memberMatch = MEMBERS_REGEX.exec( structBody )) !== null) {
			
            let type = memberMatch[1];
            let name = memberMatch[2];
			let arrayInfo = memberMatch[3];
			
			///
            members[ name ] = { type };
			
			if( arrayInfo )
				members[ name ].size = parseInt( arrayInfo.match(/\d+/)[0] );
			
        }
		
		output[ structName ] = members;
		
    }
    
    return output;
	
}

/** getAttributeLocations
 *	
 *	@param {Program} { gl, program, attributes }
 *	@param {String} script
 */
function getUniformLocations({ gl, program, uniforms }, script ) {
	
	///
    const UNIFORM_REGEX = /uniform\s+(\w+)\s+([^;]+);/g;
	
	///
	const structs = extractStructs( script );
	
	/** getLocation
	 *
	 */
	function getLocation( name, type, size = 0 ) {
		
		/// check if is a complex structure data
		if( type in structs ) {
			
			/// check if struct is a array
			if( size > 0 ) {
				
				let locations = new UniformArray();
				
				for( let i = 0; i < size; i++ ) {
					
					let item = new UniformStruct();
					
					let struct = structs[ type ];
					
					for( let subName in struct ) {
						
						let subType = struct[ subName ].type;
						let subSize = struct[ subName ].size || 0;
						
						item[ subName ] = getLocation( name +'['+ i +'].'+ subName, subType, subSize );
					
					}
					
					locations.push( item );
					
				}
				
				return locations;
				
			} else {
				
				let locations = new UniformStruct();
			
				let struct = structs[ type ];
				
				for( let subName in struct ) {
					
					let subType = struct[ subName ].type;
					let subSize = struct[ subName ].size || 0;
					
					locations[ subName ] = getLocation( name +'.'+ subName, subType, subSize );
					
				}
			
				return locations;
				
			}
			
		} else {
			
			let location = gl.getUniformLocation( program, name );
			
			return new Uniform( gl, location, type, size );
			
		}
		
	}
	
    let match;
	
    while( (match = UNIFORM_REGEX.exec( script )) !== null ) {
		
        let type = match[1];
        let list = match[2].split(",").map(s => s.trim());
		
        for( let item of list ) {
			
            let subMatch = item.match(/(\w+)(\[\d+\])?/);

            if( subMatch ) {
				
                let name = subMatch[1];
				let size = ( subMatch[2] )? parseInt(subMatch[2].match(/\d+/)[0]) : 0;
				
				uniforms[ name ] = getLocation( name, type, size );
				
            }
			
        }
		
    }
	
}


/** Program
 *	
 */
export default class Program {
	
	/** Program
	 *	
	 *	ProgramCore
	 *	ProgramControl
	 *	ProgramManager
	 *	
	 *	
	 *	@param {WebGLRenderingContext} gl
	 *	@param {String} vertexScript
	 *	@param {String} fragmentScript
	 */
	constructor( gl, vertexScript, fragmentScript ) {
		
		let vshader = webglCreateShader( gl, vertexScript, gl.VERTEX_SHADER ),
			fshader = webglCreateShader( gl, fragmentScript, gl.FRAGMENT_SHADER );
		
		let program = gl.createProgram();
		
		gl.attachShader( program, vshader );
		gl.attachShader( program, fshader );
		gl.linkProgram( program );
		
		gl.deleteShader( vshader );
		gl.deleteShader( fshader );
		
		///
		this.gl = gl;
		
		this.program = program;
		
		this.attributes = new Object;
		this.uniforms = new Object;
		
		///
		this.getLocations( vertexScript );
		this.getLocations( fragmentScript );
		
	}
	
	enableAttributes() {
		
		let { gl, attributes } = this;
		
		for( let key in attributes )
			gl.enableVertexAttribArray( attributes[ key ].location );

	}
	
	disableAttributes() {
		
		let { gl, attributes } = this;
		
		for( let key in attributes )
			gl.disableVertexAttribArray( attributes[ key ].location );

	}
	
	getLocations( script ) {
		
		/// remove comments
		script = script.replace(/\/\/.*$/gm, '');
		script = script.replace(/\/\*[\s\S]*?\*\//g, '');
		
		/// get attributes location
		getAttributeLocations( this, script );
		getUniformLocations( this, script );
		
	}
	
}
