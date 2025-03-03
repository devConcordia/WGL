
import Vector3 from './Vector3.mjs';

const M4_IDENTITY = [ 1, 0, 0, 0,
 					  0, 1, 0, 0,
					  0, 0, 1, 0,
					  0, 0, 0, 1 ];

/** Matrix4
 *
 *
 */
export default class Matrix4 extends Float32Array {

	/** constructor
	 *
	 *	@param {TypedArray | Number[16]} args
	 */
	 constructor( args = M4_IDENTITY ) {

		if( arguments.length == 16 ) args = arguments;

 		super( args );

 	}

	get _11() { return this[  0 ] }
	get _12() { return this[  4 ] }
	get _13() { return this[  6 ] }
	get _14() { return this[ 12 ] }

	get _21() { return this[  1 ] }
	get _22() { return this[  5 ] }
	get _23() { return this[  9 ] }
	get _24() { return this[ 13 ] }

	get _31() { return this[  2 ] }
	get _32() { return this[  6 ] }
	get _33() { return this[ 10 ] }
	get _34() { return this[ 14 ] }

	get _41() { return this[  3 ] }
	get _42() { return this[  7 ] }
	get _43() { return this[ 11 ] }
	get _44() { return this[ 15 ] }

	get x() { return this[ 12 ] }
	get y() { return this[ 13 ] }
	get z() { return this[ 14 ] }

	get xyz() { return new Vector3( this[ 12 ], this[ 13 ], this[ 14 ] ) }
	
	set x( v ) { this[ 12 ] = v }
	set y( v ) { this[ 13 ] = v }
	set z( v ) { this[ 14 ] = v }

	/** det
	 *
	 *	@return {Number | Boolean}
	 */
	det() {

		let [ a, b, c, d, 
			  e, f, g, h, 
			  i, j, k, l,
			  m, n, o, p  ] = this;
		
	//	let [ a, e, i, m, 
	//		  b, f, j, n, 
	//		  c, g, k, o,
	//		  d, h, l, p  ] = this;
		
		return m*( d*g*j - c*h*j - d*f*k + b*h*k + c*f*l - b*g*l) +
			   n*( a*g*l - a*h*k + d*e*k - c*e*l + c*h*i - d*g*i) +
			   o*( a*h*j - a*f*l - d*e*j + b*e*l + d*f*i - b*h*i) +
			   p*(-c*f*i - a*g*j + a*f*k + c*e*j - b*e*k + b*g*i)
		
	}

	scale( sx, sy = sx, sz = sx, sw = sx ) {
		
		this[0] *= sx;
		this[5] *= sy;
		this[10] *= sz;
		this[15] *= sw;
		
		return this;
		
	}
	
	/** transpose
	 *
	 * 	@return {Matrix4}
	 */
	transpose() {

		this.set([ this[0], this[4], this[ 8], this[12],
		           this[1], this[5], this[ 9], this[13],
		           this[2], this[6], this[10], this[14],
		           this[3], this[7], this[11], this[15] ]);

		return this

	}

	/** invert
	 *	
     *  @ref https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
	 *
	 *	@return {Matrix4}
	 */
	invert() {
		
		let output = new Matrix4();
		
		let [ a, b, c, d, 
			  e, f, g, h, 
			  i, j, k, l,
			  m, n, o, p  ] = this;
		
	//	let [ a, e, i, m, 
	//		  b, f, j, n, 
	//		  c, g, k, o,
	//		  d, h, l, p  ] = this;
		
		let t1 = g*l*n - h*k*n + h*j*o - f*l*o - g*j*p + f*k*p,
			t2 = d*k*n - c*l*n - d*j*o + b*l*o + c*j*p - b*k*p,
			t3 = c*h*n - d*g*n + d*f*o - b*h*o - c*f*p + b*g*p,
			t4 = d*g*j - c*h*j - d*f*k + b*h*k + c*f*l - b*g*l;

		const det = a*t1 + e*t2 + i*t3 + m*t4;

		if ( det !== 0 ) {
			
			this[ 0 ] = t1/det;
			this[ 1 ] = ( h*k*m - g*l*m - h*i*o + e*l*o + g*i*p - e*k*p )/det;
			this[ 2 ] = ( f*l*m - h*j*m + h*i*n - e*l*n - f*i*p + e*j*p )/det;
			this[ 3 ] = ( g*j*m - f*k*m - g*i*n + e*k*n + f*i*o - e*j*o )/det;

			this[ 4 ] = t2/det;
			this[ 5 ] = ( c*l*m - d*k*m + d*i*o - a*l*o - c*i*p + a*k*p )/det;
			this[ 6 ] = ( d*j*m - b*l*m - d*i*n + a*l*n + b*i*p - a*j*p )/det;
			this[ 7 ] = ( b*k*m - c*j*m + c*i*n - a*k*n - b*i*o + a*j*o )/det;

			this[ 8 ] = t3/det;
			this[ 9 ] =  ( d*g*m - c*h*m - d*e*o + a*h*o + c*e*p - a*g*p )/det;
			this[ 10 ] = ( b*h*m - d*f*m + d*e*n - a*h*n - b*e*p + a*f*p )/det;
			this[ 11 ] = ( c*f*m - b*g*m - c*e*n + a*g*n + b*e*o - a*f*o )/det;

			this[ 12 ] = t4/det;
			this[ 13 ] = ( c*h*i - d*g*i + d*e*k - a*h*k - c*e*l + a*g*l )/det;
			this[ 14 ] = ( d*f*i - b*h*i - d*e*j + a*h*j + b*e*l - a*f*l )/det;
			this[ 15 ] = ( b*g*i - c*f*i + c*e*j - a*g*j - b*e*k + a*f*k )/det;
			
		}

		return this;

	}

	
	multiply( m ) {
		
		/// clone
		let a = this.slice();
		
		/// clear
		this.fill(0);
		
		for( let k = 0; k < 4; k++ ) {
			for( let i = 0; i < 4; i++ ) {

				let ik = i*4 + k;

				for( let j = 0; j < 4; j++ ) {

					this[ i*4 + j ] += a[ k*4 + j ] * b[ ik ];

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
		
		var sg = Math.sin( x ),
			cg = Math.cos( x );
		
		var sb = Math.sin( y ),
			cb = Math.cos( y );
		
		var sa = Math.sin( z ),
			ca = Math.cos( z );
		
	//	this.multiply([
	//		ca * cb, ca * sb * sg - sa * cg, ca * sb * cg + sa * sg, 0,
	//		sa * cb, sa * sb * sg + ca * cg, sa * sb * cg - ca * sg, 0,
	//		    -sb,                cb * sg,                cb * cg, 0,
	//			  0,                      0,                      0, 1
	//	]);
		
		this.multiply([
			ca * cb, 					sa * cb,			   	   -sb,      0,
			ca * sb * sg - sa * cg, 	sa * sb * sg + ca * cg,		cb * sg, 0,
			ca * sb * cg + sa * sg, 	sa * sb * cg - ca * sg,		cb * cg, 0,
			0,							0,							0,		 1
		]);
		
		return this;
		
	}
	

    rotateX( rad ) {

		var s = Math.sin( rad ),
			c = Math.cos( rad );

//        this.multiply([
//			1, 0, 0, 0, 
//			0, c,-s, 0, 
//			0, s, c, 0, 
//			0, 0, 0, 1
//		]);

        this.multiply([
			1, 0, 0, 0, 
			0, c, s, 0, 
			0,-s, c, 0, 
			0, 0, 0, 1
		]);

		return this

	}

	rotateY( rad ) {

		var s = Math.sin( rad ),
			c = Math.cos( rad );

//        this.multiply([
//			c, 0, s, 0,
//			0, 1, 0, 0,
//		   -s, 0, c, 0,
//		    0, 0, 0, 1
//		]);

        this.multiply([
			c, 0,-s, 0,
			0, 1, 0, 0,
		    s, 0, c, 0,
		    0, 0, 0, 1
		]);

		return this

	}

	rotateZ( rad ) {

		var s = Math.sin( rad ),
			c = Math.cos( rad );

   //    this.multiply([
	//		c,-s, 0, 0,
	//		s, c, 0, 0,
	//		0, 0, 1, 0,
	//		0, 0, 0, 1
	//	]);

        this.multiply([
			c, s, 0, 0,
		   -s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

		return this

	}

    /** rotateAxis
     *
     *  @ref https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
     *
     *  @param {TypedArray} axis
     *  @param {Number} rad
     */
    rotateAxis( rad, axis ) {

		var c = Math.cos( rad ),
		    s = Math.sin( rad );

		var t = 1 - c,
		    x = axis[0],
            y = axis[1],
            z = axis[2],
		    tx = t * x,
            ty = t * y;

//		this.multiply([
//          tx * x + c,     tx * y - s * z,  tx * z + s * y, 0,
//			tx * y + s * z, ty * y + c,      ty * z - s * x, 0,
//			tx * z - s * y, ty * z + s * x,  t * z * z + c,  0,
//			0,              0,               0,              1
//        ]);

		this.multiply([
            tx * x + c,		tx * y + s * z,	tx * z - s * y,	0,
			tx * y - s * z,	ty * y + c,		ty * z + s * x,	0,
			tx * z + s * y,	ty * z - s * x,	t * z * z + c,	0,
			0,				0,				0,				1
        ]);

    	return this;

    }

	static Multiply( a, b ) {
		
		return new Matrix4( a ).multiply( b );
		
	} 
	
	/** Matrix4.LookAt
	 *
	 *	@param {Vector3} position
	 *	@param {Vector3} target
	 *	@param {Vector3} up
	 */
	static LookAt( e, c = new Vector3(0, 0, 0), u = new Vector3(0,1,0) ) {

		var f = e.clone().sub(...c).normalize();
		var s = u.clone().cross(f).normalize();
		var t = f.clone().cross(s).normalize();
		
		return new Matrix4(
			s.x, s.y, s.z, 0,
			t.x, t.y, t.z, 0,
			f.x, f.y, f.z, 0,
			-s.dot(e), -t.dot(e), -f.dot(e), 1 )

	}

	/** Matrix4.Orthographic
	 *
	 *	@param {Number} left		width / - 2
	 *	@param {Number} right		width / 2
	 *	@param {Number} top			height / 2
	 *	@param {Number} bottom		height / - 2
	 *	@param {Number} near
	 *	@param {Number} far
	 *	@return {Matrix4}
	 */
	static Orthographic( left, right, top, bottom, near = .1, far = 1000 ) {

		var w = 1.0 / ( right - left ),
			h = 1.0 / ( top - bottom ),
			d = 1.0 / ( far - near );

		return new Matrix4(
			2 * w, 0, 	  0, 	-(( right + left ) * w),
			0,	   2 * h, 0, 	-(( top + bottom ) * h),
			0, 	   0,  	 -2 * d,-(( far + near ) * d),
			0, 	   0, 	  0, 	1 )
		
	}

	/** Matrix4.Perspective
	 *
	 *	@param {Number} fov
	 *	@param {Number} aspect
	 *	@param {Number} near
	 *	@param {Number} far
	 *	@return {Matrix4}
	 */
	static Perspective( fov = 60, aspect = 1, near = .1, far = 1000 ) {
		
		var y = Math.tan(fov * Math.PI / 360) * near;
		var x = y * aspect;
		
		return Matrix4.Frustum( -x, x, -y, y, near, far );
		
	}
	
	static Frustum( l, r, b, t, n, f ) {
		
		var w = r - l,
			h = t - b,
			d = f - n;
		
		var u = 2 * n / w,
			v = 2 * n / h,
			w = (r + l)/ w,
			x = (t + b) / h,
			y = -(f + n) / d,
			z = -2 * f * n / d;
		
		return new Matrix4(
		//	u, 0, 0, 0,
		//	0, v, 0, 0,
		//	w, x, y,-1,
		//	0, 0, z, 0
			
			u, 0, w, 0,
			0, v, x, 0,
			0, 0, y,-1,
			0, 0, z, 0
		)
		
	}
	
}
