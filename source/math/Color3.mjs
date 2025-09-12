
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

/** Color3 RGB
 *	
 */
export default class Color3 extends Float32Array {

	/** Color3
	 *
	 */
	constructor( ...args ) {
		
		if( args.length < 3 ) {
			
			let v = args[0];
			
			args[0] = (( v >> 16 ) & 255)/255;
			args[1] = (( v >>  8 ) & 255)/255;
			args[2] = (v & 255)/255;
			
		}
		
		super( args );
		
	}

	get r() { return this[ 0 ] }
	get g() { return this[ 1 ] }
	get b() { return this[ 2 ] }

	set r( v ) { this[ 0 ] = parser( v ) }
	set g( v ) { this[ 1 ] = parser( v ) }
	set b( v ) { this[ 2 ] = parser( v ) }

	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	getUint() {
		
		return (this[2] * 0xff) | (this[1] * 0xff) << 8 | (this[0] * 0xff) << 16;
		
	}
	
	setUint( v ) {
		
		this[0] = (( v >> 16 ) & 255)/256;
		this[1] = (( v >>  8 ) & 255)/256;
		this[2] = (v & 255)/256;
		
	}

	getUint565() {
		
		return (this[2] * 0x1f) | (this[1] * 0x3f) << 5 | (this[0] * 0x1f) << 11;

	}
	
	getUint5551( a = 1 ) {

		return (a * 0x1) | (this[2] * 0x1f) << 1 | (this[1] * 0x1f) << 6 | (this[0] * 0x1f) << 11;
		
	}
	
	getUint4444( a = 0xf ) {

		return (a * 0xf) | (this[2] * 0xf) << 4 | (this[1] * 0xf) << 8 | (this[0] * 0xf) << 12;
	
	}
	
	/* ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... */
	
	getRGB() {

		return [ this[ 0 ], this[ 1 ], this[ 2 ] ]

	}

	setRGB( r, g, b ) {

		this[0] = parser( r );
		this[1] = parser( g );
		this[2] = parser( b );

	}

	getRGBA( a = 1.0 ) {

		return [ this[ 0 ], this[ 1 ], this[ 2 ], a ]

	}

	getCMYK() {
		
		let [ r, g, b ] = this;
		
		let c = 0, 
			m = 0, 
			y = 0,
			k = 1 - Math.max( r, g, b );

		if( k != 1 ) {
			c = ( 1-r-k )/( 1-k );
			m = ( 1-g-k )/( 1-k );
			y = ( 1-b-k )/( 1-k );
		}

		return [ c, m, y, k ];
		
	}

	setCMYK( c, m, y, k ) {
		
		k = 1 - k;
		
		this[0] = (1 - c) * k;
		this[1] = (1 - m) * k;
		this[2] = (1 - y) * k;
		
	}

	getHSL() {

		let [ r, g, b ] = this;
		
		let max = Math.max( r, g, b ),
			min = Math.min( r, g, b );

		let h = 0,
			s = 0,
			l = ( max + min )/2;

		if( max !== min ) {

			let d = max - min;

			s = ( l > 0.5 )? d/(2 - max - min) : d/( max+min );

			switch( max ) {

				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;

			}

			h /= 6;
		}

		return [ h, s, l ];

	}

	setHSL( h, s, l ) {
		
		if( s == 0 ) {

			this[0] = l;
			this[1] = l;
			this[2] = l;
			
		} else {

			let q = ( l < 0.5 )? (l * ( 1 + s )) : (l + s - l * s),
				p = 2 * l - q;
			
			this[0] = hue( h + 1/3, p, q ); 
			this[1] = hue( h, p, q );
			this[2] = hue( h - 1/3, p, q );
			
		}
		
	}

	getHSV() {

		let [ r, g, b ] = this;
		
		let min = Math.min( r, g, b ),
			max = Math.max( r, g, b ),
			delta = max - min;

		if( delta == 0 ) return [ 0, 0, 0 ];

		let h;

		switch( max ) {
			
			case r: h = ( g - b )/delta; break;
			case g: h = 2 + ( b - r )/delta; break;
			case b: h = 4 + ( r - g )/delta; break;
			
		}

		h /= 6;

		if( h < 0 ) h += 1;

		return [ h, delta / max, max ];

	}

	setHSV( v ) {

		let h60 = h/60;
	
		let f = h60 - Math.floor( h60 ),
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
		
		///
		this[0] = r;
		this[1] = g;
		this[2] = b;
		
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
		
		return '#'+ this.getUint().toString(16).padStart(6, '0');
		
	}
	
	toJSON() {
		
		return this.getUint();
		
	}
	
	/** Random
	 *	
	 */
	static Random( k = 1 ) {
		
		return new this( 
			k * (Math.random() * .5 + .5), 
			k * (Math.random() * .5 + .5), 
			k * (Math.random() * .5 + .5) )
		
	}
	
	static Pallet( size, k = 1 ) {
		
		let output = new Array();
		
		let mix = this.Random( k );
		
		for( let i = 0; i < size; i++ ) {
			
			mix = this.Random( k ).add( mix ).scale( .5 );
			
			output.push( mix );
			
		}
		
		return output;
		
	}
	
}


