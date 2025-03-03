
/** UniformStruct
 *	
 *	{
 *		{Uniform} [name]
 *		...
 *	}
 *	
 */
export default class UniformStruct {
	
	set( value ) {
		
		for( let key in this )
			this[ key ].set( value[key] );
		
	}
	
}

