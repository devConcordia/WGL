
export default class Attribute {
	
	constructor( gl, location, type ) {
		
		this.gl = gl;
		
		this.location = location;
		
		this.type = type;
		this.size = parseInt( type.replace(/\D/g, '') );
		
	}
	
}

