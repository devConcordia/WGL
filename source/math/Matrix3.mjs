
const M3_IDENTITY = [ 1, 0, 0,
 					  0, 1, 0,
					  0, 0, 1 ];

/*! Matrix3
 *
 *		0	3	6
 *		1	4	7
 *		2	5	8
 *
 */
export default class Matrix3 extends Float32Array {

	/** constructor
	 *
	 *	@param {TypedArray | Number[9]} args
	 */
	constructor( args = M3_IDENTITY ) {

		if( arguments.length == 9 ) args = arguments;

		super( args );

	}
	
	
	get _11() { return this[ 0 ] }
	get _12() { return this[ 3 ] }
	get _13() { return this[ 6 ] }

    get _21() { return this[ 1 ] }
	get _22() { return this[ 4 ] }
	get _23() { return this[ 7 ] }

	get _31() { return this[ 2 ] }
	get _32() { return this[ 5 ] }
	get _33() { return this[ 8 ] }

	/** det
	 *
	 *	@return {Number}
	 */
	det() {
		
		let [ a, b, c, d, e, f, g, h, i ] = this;
	//	let [ a, d, g, b, e, h, c, f, i  ] = this;
		
		return a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h; 
		
	}
	
	scale( sx, sy = sx, sz = sx ) {
		
		this[0] *= sx;
		this[4] *= sy;
		this[8] *= sz;
		
		return this;
		
	}
	
	/** transpose
	 *
	 * 	@return {Matrix3}
	 */
	transpose() {

		this.set([ this[0], this[1], this[2],
		           this[3], this[4], this[5],
		           this[6], this[7], this[8] ]);

		return this

	}

	multiply( b ) {
		
		/// clone
		let a = this.slice();
		
		/// clear
		this.fill(0);
		
		for( let k = 0; k < 3; k++ ) {
			for( let i = 0; i < 3; i++ ) {

				let ik = i*3 + k;

				for( let j = 0; j < 3; j++ ) {

					this[ i*3 + j ] += a[ k*3 + j ] * b[ ik ];

				}
			}
		}
		
		return this;
		
	} 
	
	/** rotate
	 *	
	 *	@ref https://en.wikipedia.org/wiki/Rotation_matrix
	 *	
	 */
	rotate( x = 0, y = 0, z = 0 ) {
		
		let sg = Math.sin( x ),
			cg = Math.cos( x );
		
		let sb = Math.sin( y ),
			cb = Math.cos( y );
		
		let sa = Math.sin( z ),
			ca = Math.cos( z );
		
		this.multiply([
			ca * cb, ca * sb * sg - sa * cg, ca * sb * cg + sa * sg,
			sa * cb, sa * sb * sg + ca * cg, sa * sb * cg - ca * sg,
			    -sb,                cb * sg,                cb * cg
		]);
		
		return this;
		
	}
	
	rotateX( rad ) {

		let s = Math.sin( rad ),
			c = Math.cos( rad );

        this.multiply([
			1, 0, 0,
			0, c,-s,
			0, s, c 
		]);

		return this;

	}

	rotateY( rad ) {

		let s = Math.sin( rad ),
			c = Math.cos( rad );

        this.multiply([
			c, 0, s, 
			0, 1, 0, 
		   -s, 0, c 
		]);

		return this;

	}

	rotateZ( rad ) {

		let s = Math.sin( rad ),
			c = Math.cos( rad );

        this.multiply([
			c,-s, 0, 
			s, c, 0, 
			0, 0, 1 
		]);

		return this;

	}

    /** rotateAxis
     *
     *  @ref https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
     *
     *  @param {TypedArray} axis
     *  @param {Number} rad
     */
    rotateAxis( rad, axis ) {

        let c = Math.cos( rad ),
            s = Math.sin( rad );

        let t = 1 - c,
            x = axis[0],
            y = axis[1],
            z = axis[2],
            tx = t * x,
            ty = t * y;

        this.multiply([
            tx * x + c,     tx * y - s * z,  tx * z + s * y,
            tx * y + s * z, ty * y + c,      ty * z - s * x,
            tx * z - s * y, ty * z + s * x,  t * z * z + c
        ]);

        return this;

    }

	/** invert
	 *
	 *		 0  1  2   3  4  5
	 * 		 6  7  8   9 10 11
	 *		12 13 14  15 16 17
	 *
	 *	@return {Matrix3}
	 */
	invert() {
		
		let [ a, b, c, 
			  d, e, f, 
			  g, h, i ] = this;
		
	//	let [ a, d, g, b, e, h, c, f, i  ] = this;
		
		/// det
		let t = a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
		
		if( t != 0 ) {
			
			this.set([
				 (e * i - f * h)/t, -(b * i - c * h)/t,  (b * f - c * e)/t,
				-(d * i - f * g)/t,  (a * i - c * g)/t, -(a * f - c * d)/t,
				 (d * h - e * g)/t, -(a * h - b * g)/t,  (a * e - b * d)/t
			]);
			
		} else {
			
			this.set( M3_IDENTITY );
			
		}
		
		return this;
		
	}
	
}
