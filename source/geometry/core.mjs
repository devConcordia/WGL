/** 
 *
 */
function index_lines_remove_duplicate( input ) {
	
	var output = new Array();
	
	var index = new Object;
	
	for( var i = 0; i < input.length; i += 2 ) {
		
		var a = input[i  ],
			b = input[i+1];
		
		var k1 = a +','+ b;
		var k2 = b +','+ a;
		
		if( k1 in index || k2 in index ) continue;
		
		index[ k1 ] = 1;
		
		output.push( a, b );
		
	}
	
	
	return output;
	
}

export { index_lines_remove_duplicate }
