/** hue
 *
 *	@param {Number} t
 *	@param {Number} p
 *	@param {Number} q
 *	@return {Number}
 */
function hue( t, p, q ) {

	if( t < 0 ) t += 1;
	if( t > 1 ) t -= 1;

	if( t < 1/6 ) return p + (q - p) * 6 * t;
	if( t < 1/2 ) return q;
	if( t < 2/3 ) return p + (q - p) * (2/3 - t) * 6;

	return p;

};

/** parser
 *
 *	@param {Number} n
 *	@param {Number} max = 255
 *	@return {Number}
 */
function parser( n, max = 255 ) {

	if( n > 1 && Number.isInteger( n ) ) n /= max;

	return Math.max( 0, Math.min( n, 1 ) );

};

/** rgb_binary565
 *	
 *	@param {Number} r
 *	@param {Number} g
 *	@param {Number} b
 *	@return {Number}
 */
function rgb_to_binary565( r, g, b ) {
	
	return (b * 0x1f) | (g * 0x3f) << 5 | (r * 0x1f) << 11;
	
};

/** rgb_binary5551
 *	
 *	@param {Number} r
 *	@param {Number} g
 *	@param {Number} b
 *	@param {Number} a
 *	@return {Number}
 */
function rgb_to_binary5551( r, g, b, a = 1 ) {
	
	return (a * 0x1) | (b * 0x1f) << 1 | (g * 0x1f) << 6 | (r * 0x1f) << 11;
	
};

/** rgb_to_binary4444
 *	
 *	@param {Number} r
 *	@param {Number} g
 *	@param {Number} b
 *	@param {Number} a
 *	@return {Number}
 */
function rgb_to_binary4444( r, g, b, a = 1 ) {
	
	return (a * 0xf) | (b * 0xf) << 4 | (g * 0xf) << 8 | (r * 0xf) << 12;
	
};

/** rgb_to_binary
 *
 *	@param {Number} r		0 < r < 1
 *	@param {Number} g		0 < g < 1
 *	@param {Number} b		0 < b < 1
 *	@return {Number}
 */
function rgb_to_binary( r, g, b ) {

	return (b * 0xff) | (g * 0xff) << 8 | (r * 0xff) << 16;

};

/** binary_to_rgb
 *
 *	@param {Number} n
 *	@return {Array}
 */
function binary_to_rgb( n ) {

	return [ ( n >> 16 ) & 255, ( n >>  8 ) & 255, n & 255 ];

};

/** rgb_to_hsl
 *
 *	@param {Number} r		0 < r < 1
 *	@param {Number} g		0 < g < 1
 *	@param {Number} b		0 < b < 1
 *	@return {Array}
 */
function rgb_to_hsl( r, g, b ) {

	var max = Math.max( r, g, b ),
		min = Math.min( r, g, b );

	var h = 0,
		s = 0,
		l = ( max + min )/2;

	if( max !== min ) {

		var d = max - min;

		s = ( l > 0.5 )? d/(2 - max - min) : d/( max+min );

		switch( max ) {

			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;

		}

		h /= 6;
	}

	return [ h, s, l ];

};

/** hsl_to_rgb
 *
 *	@param {Number} h		0 < h < 1
 *	@param {Number} s		0 < s < 1
 *	@param {Number} l		0 < l < 1
 *	@return {Array}
 */
function hsl_to_rgb( h, s, l ) {

	if( s == 0 ) {

		return [ l, l, l ];

	} else {

		var q = ( l < 0.5 )? (l * ( 1 + s )) : (l + s - l * s),
			p = 2 * l - q;
		
		var r = hue( h + 1/3, p, q ), 
			g = hue( h, p, q ),
			b = hue( h - 1/3, p, q );
		
		return [ r, g, b ];

	}

};

/** rgb_to_hsv
 *
 *	@param {Number} r		0 < r < 1
 *	@param {Number} g		0 < g < 1
 *	@param {Number} b		0 < b < 1
 *	@return {Array}
 */
function rgb_to_hsv( r, g, b ) {

	var min = Math.min( r, g, b ),
		max = Math.max( r, g, b ),
		delta = max - min;

	if( delta == 0 ) return [ 0, 0, 0 ];

	var h;

	switch( max ) {
		
		case r: h = ( g - b )/delta; break;
		case g: h = 2 + ( b - r )/delta; break;
		case b: h = 4 + ( r - g )/delta; break;
		
	}

	h /= 6;

	if( h < 0 ) h += 1;

	return [ h, delta / max, max ];

};

/** hsv_to_rgb
 *
 *	@param {Number} h		0 < h < 1
 *	@param {Number} s		0 < s < 1
 *	@param {Number} v		0 < v < 1
 *	@return {Array}
 */
function hsv_to_rgb( h, s, v ) {
	
	var h60 = h/60;
	
	var f = h60 - Math.floor( h60 ),
		r, g, b;

	switch( Math.floor( h60 )%6 ) {

		case 0:
				r = v;
				g = v * (1 - (1 - f) * s);
				b = v * (1 - s);
			break;

		case 1:
				r = v * (1 - f * s);
				g = v;
				b = v * (1 - s);
			break;

		case 2:
				r = v * (1 - s);
				g = v;
				b = v * (1 - (1 - f) * s);
			break;

		case 3:
				r = v * (1 - s);
				g = v * (1 - f * s);
				b = v;
			break;

		case 4:
				r = v * (1 - (1 - f) * s);
				g = v * (1 - s);
				b = v;
			break;

		case 5:
				r = v;
				g = v * (1 - s);
				b = v * (1 - f * s);
			break;

	}

	return [ r, g, b ];

};

/** rgb_to_cmyk
 *
 *	@param {Number} r		0 < r < 1
 *	@param {Number} g       0 < g < 1
 *	@param {Number} b       0 < b < 1
 *	@return {Array}
 */
function rgb_to_cmyk( r, g, b ) {

	var c = 0, 
		m = 0, 
		y = 0,
		k = 1 - Math.max( r, g, b );

	if( k != 1 ) {
		
		c = ( 1-r-k )/( 1-k );
		m = ( 1-g-k )/( 1-k );
		y = ( 1-b-k )/( 1-k );

	}

	return [ c, m, y, k ];

};

/** cmyk_to_rgb
 *
 *	@param {Number} c		0 < c < 1
 *	@param {Number} m		0 < m < 1
 *	@param {Number} y		0 < y < 1
 *	@param {Number} k		0 < k < 1
 *	@return {Array}
 */
function cmyk_to_rgb( c, m, y, k ) {
	
	c = 1 - c;
	m = 1 - m;
	y = 1 - y;
	k = 1 - k;
	
	return [ c * k, m * k, y * k ];

};



/** Color<Float32Array[3]|Float32Array[4]>
 *	
 */
export default class Color extends Float32Array {

	/** constructor
	 *
	 *	@param {Number} binary
	 *	@return {Float32Array(3)}
	 *
	 *	or
	 *	@param {Number} binary
	 *	@param {Number} alpha
	 *	@return {Float32Array(4)}
	 *
	 *	or
	 *	@param {Number} r
	 *	@param {Number} g
	 *	@param {Number} b
	 *	@return {Float32Array(3)}
	 *
	 *	or
	 *	@param {Number} r
	 *	@param {Number} g
	 *	@param {Number} b
	 *	@param {Number} a
	 *	@return {Float32Array(4)}
	 */
	constructor( r, g, b, a ) {

		if( arguments.length < 3 ) {

			[ r, g, b ] = binary_to_rgb( arguments[0] );

			a = arguments[1];

		}

		r = parser( r );
		g = parser( g );
		b = parser( b );

		if( a == undefined ) {

			super([ r, g, b ]);

		} else {

			super([ r, g, b, a ]);

		}

	}

	get r() { return this[ 0 ] }
	get g() { return this[ 1 ] }
	get b() { return this[ 2 ] }
	get a() { return this[ 3 ] }

	set r( v ) { this[ 0 ] = parser( v ) }
	set g( v ) { this[ 1 ] = parser( v ) }
	set b( v ) { this[ 2 ] = parser( v ) }
	set a( v ) { this[ 3 ] = v }

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	/// binary
	/// integer
	/// number
	
	get binary() {
		
		return rgb_to_binary( ...this );

	}

	set binary( v ) {
		
		var d = binary_to_rgb( v );
		
		this[0] = d[0]/255;
		this[1] = d[1]/255;
		this[2] = d[2]/255;
		
	}

	get binary565() {

		return rgb_to_binary565( ...this );

	}
	
	get binary5551() {

		return rgb_to_binary5551( ...this );

	}
	
	get binary4444() {

		return rgb_to_binary4444( ...this );

	}
	
	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	get rgb() {

		return [ this[ 0 ], this[ 1 ], this[ 2 ] ]

	}

	set rgb( v ) {

		this[0] = parser( v[0] );
		this[1] = parser( v[1] );
		this[2] = parser( v[2] );

	}

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	get rgba() {

		return [ this[ 0 ], this[ 1 ], this[ 2 ], this[ 3 ] || 1.0 ]

	}

	set rgba( v ) {

		this[0] = parser( v[0] );
		this[1] = parser( v[1] );
		this[2] = parser( v[2] );
		this[3] = v[3];

	}

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	get cmyk() {

		return rgb_to_cmyk( ...this );

	}

	set cmyk( v ) {

		this.set( cmyk_to_rgb( ...v ), 0 );

	}

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	get hsl() {

		return rgb_to_hsl( ...this );

	}

	set hsl( v ) {

		this.set( hsl_to_rgb( ...v ), 0 );

	}

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	get hsv() {

		return rgb_to_hsv( ...this );

	}

	set hsv( v ) {

		this.set( hsv_to_rgb( ...v ), 0 );

	}

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	inverse() {

		this[ 0 ] = 1 - this[ 0 ];
		this[ 1 ] = 1 - this[ 1 ];
		this[ 2 ] = 1 - this[ 2 ];

		return this

	}

	gray() {

		var gray = 0.2989 * this[ 0 ] + 0.5870 * this[ 1 ] + 0.1140 * this[ 2 ];

		this[ 0 ] = gray;
		this[ 1 ] = gray;
		this[ 2 ] = gray;

		return this

	}
	
	add( color ) {
		
		this[0] += color[0];
		this[1] += color[1];
		this[2] += color[2];
		
		return this;
		
	}
	
	scale( s ) {
		
		this[0] *= s;
		this[1] *= s;
		this[2] *= s;
		
		return this;
		
	}
	
	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	toString() {
		
		return '#' + ('000000' + rgb_to_binary( ...this ).toString(16)).slice( -6 );
		
	}
	
	toJSON() {
		
		return rgb_to_binary( ...this );
		
	}
	
	/** Random
	 *	
	 */
	static Random( k = 1 ) {
		
		return new Color( 
			k * (Math.random() * .5 + .5), 
			k * (Math.random() * .5 + .5), 
			k * (Math.random() * .5 + .5) )

	}
	
	static Pallet( size, k = 1 ) {
		
		var output = new Array();
		
		var mix = Color.Random( k );
		
		for( var i = 0; i < size; i++ ) {
			
			mix = Color.Random( k ).add( mix ).scale( .5 );
			
			output.push( mix );
			
		}
		
		return output;
		
	}
	
}


