
/** index_lines_remove_duplicate
 *
 */
export function index_lines_remove_duplicate( input ) {
	
	let output = new Array();
	let index = new Object;
	
	for( let i = 0; i < input.length; i += 2 ) {
		
		let a = input[i  ],
			b = input[i+1];
		
		let k1 = a +','+ b;
		let k2 = b +','+ a;
		
		if( k1 in index || k2 in index ) continue;
		
		index[ k1 ] = 1;
		
		output.push( a, b );
		
	}
	
	return output;
	
}

