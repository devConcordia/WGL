
/** UniformArray
 *	
 *	[ {Uniform}, ... ]
 *	
 */
export default class UniformArray extends Array {
	
	/**	
	 *	
	 */
	set( values ) {
		
		for( let i = 0; i < this.length; i++ )
			this[i].set( values[i] );
		
	}
	
}

