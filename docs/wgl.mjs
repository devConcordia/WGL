/* @version 1.0.3 */

/** Vector2
 *
 */
class Vector2 extends Float32Array {

	constructor( x = 0, y = x ) {

		super([ x, y ]);

	}

	get x() { return this[0] }
	get y() { return this[1] }

	set x( v ) { this[0] = v; }
	set y( v ) { this[1] = v; }

	clone() {
		
		return new Vector2( ...this );
		
	}

	add( x, y = x ) {

		this[0] += x;
		this[1] += y;

		return this

	}

	sub( x, y = x ) {

		this[0] -= x;
		this[1] -= y;

		return this

	}

	mul( x, y = x ) {

		this[0] *= x;
		this[1] *= y;

		return this

	}

	div( x, y = x ) {

		this[0] /= x;
		this[1] /= y;

		return this

	}

	negate() {

		this[0] *= -1;
		this[1] *= -1;

		return this

	}

	/** transform
	 *
	 *	@param {Matrix} m
	 */
	transform( m ) {

		this.set([
			this[0] * m._11 + this[1] * m._12,
			this[0] * m._21 + this[1] * m._22
		]);

		return this

	}
	
	rotate( angle ) {
		
	/*	var a = angle/2;
		
		var qz = Math.sin( a ),
			qw = Math.cos( a );
		
		var qx = qw * this[0] - qz * this[1],
			qy = qw * this[1] + qz * this[0];
		
		this[0] = qx * qw + qy * -qz;
		this[1] = qy * qw - qx * -qz;
	/**/	
		
		
		var s = Math.sin( angle ),
			c = Math.cos( angle );
		
		var x = this[0],
			y = this[1];
		
		this[0] = x * c - y * s;
		this[1] = x * s + y * c;
	/**/
	
		return this
		
	}
	
}

/** Vector3
 *
 */
class Vector3 extends Float32Array {

	static X = new Vector3( 1, 0, 0 );
	static Y = new Vector3( 0, 1, 0 );
	static Z = new Vector3( 0, 0, 1 );
	
	constructor( x = 0, y = x, z = x ) {

		super([ x, y, z ]);

	}

	get x() { return this[ 0 ] }
	get y() { return this[ 1 ] }
	get z() { return this[ 2 ] }

	set x( v ) { this[ 0 ] = v; }
	set y( v ) { this[ 1 ] = v; }
	set z( v ) { this[ 2 ] = v; }

	clone() {
		
		return new Vector3( ...this );
		
	}

	add( x, y = x, z = x ) {

		this[0] += x;
		this[1] += y;
		this[2] += z;

		return this

	}

	sub( x, y = x, z = x ) {

		this[0] -= x;
		this[1] -= y;
		this[2] -= z;

		return this

	}

	mul( x, y = x, z = x ) {

		this[0] *= x;
		this[1] *= y;
		this[2] *= z;

		return this

	}

	div( x, y = x, z = x ) {

		this[0] /= x;
		this[1] /= y;
		this[2] /= z;

		return this

	}

	negate() {

		this[0] *= -1;
		this[1] *= -1;
		this[2] *= -1;

		return this

	}

	/** normalize
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/normalize.xhtml
	 *
	 *	@return {Vector3}
	 */
	normalize() {

		var s = this.length();

		this[0] /= s;
		this[1] /= s;
		this[2] /= s;

		return this;

	}

	/** length
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/length.xhtml
	 *
	 *	@return {Number}
	 */
	length() {

		return Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )

	}

	/** dot
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/dot.xhtml
	 *
	 *	@param {Vector3} v
	 *	@return {Number}
	 */
	dot( v ) {

		return this[0] * v[0] + this[1] * v[1] + this[2] * v[2]

	}

	/** distance
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/distance.xhtml
	 *
	 *	@param {Vector3} v
	 *	@return {Number}
	 */
	distance( v ) {

		var dx = this[0] - v[0],
			dy = this[1] - v[1],
			dz = this[2] - v[2];

		return Math.sqrt( dx * dx + dy * dy + dz * dz )

	}

	/** cross
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/cross.xhtml
	 *
	 *	@param {Vector3}
	 *	@return {Vector3}
	 */
	cross( v ) {
		
		var [ x, y, z ] = this;
		
		this.x = y * v[2] - v[1] * z;
		this.y = z * v[0] - v[2] * x;
		this.z = x * v[1] - v[0] * y;

		return this;

	}

	/** transform
	 *
	 *	@param {Matrix} m
	 */
	transform( m ) {

		var [ x, y, z ] = this;

		if( m instanceof Matrix3 ) {

			this.set([
				x * m._11 + y * m._21 + z * m._31,
				x * m._12 + y * m._22 + z * m._32,
				x * m._13 + y * m._23 + z * m._33
			]);

		} else if( m instanceof Matrix4 ) {

			var w = x * m._14 + y * m._24 + z * m._34 + m._44;

			this.set([
				(x * m._11 + y * m._21 + z * m._31 + m._41 ) / w,
				(x * m._12 + y * m._22 + z * m._32 + m._42 ) / w,
				(x * m._13 + y * m._23 + z * m._33 + m._43 ) / w
			]);

		}

		return this

	}

	/** applyAxisAngle
	 *	
	 *	@ref http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
	 *  @ref https://github.com/mrdoob/three.js/blob/dev/src/math/Vector3.js
	 *
	 */
	applyAxisAngle( angle, axis ) {

		angle /= 2;

		var s = Math.sin( angle );

		var qx = axis[0] * s,
			qy = axis[1] * s,
			qz = axis[2] * s,
			qw = Math.cos( angle );

		var x = this[0],
			y = this[1],
			z = this[2];

		/// calculate quat * vector
		var ix =  qw * x + qy * z - qz * y,
			iy =  qw * y + qz * x - qx * z,
			iz =  qw * z + qx * y - qy * x,
			iw = -qx * x - qy * y - qz * z;

		/// calculate result * inverse quat
		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;
		
		return this

	}
	
	toString() {
		
		var [ x, y, z ] = this;
		
		if( Math.abs(x) < 0.00001 ) x = 0;
		if( Math.abs(y) < 0.00001 ) y = 0;
		if( Math.abs(z) < 0.00001 ) z = 0;
		
		return x.toFixed(5) +','+ y.toFixed(5) +','+ z.toFixed(5)
		
	}
	
	/* */

	static Add( a, b ) { return new Vector3( ...a ).add( ...b ) }
	static Sub( a, b ) { return new Vector3( ...a ).sub( ...b ) }
	static Mul( a, b ) { return new Vector3( ...a ).mul( ...b ) }
	static Div( a, b ) { return new Vector3( ...a ).div( ...b ) }
	
	static Negate( a ) { return new Vector3( ...a ).negate() }
	
	static Normalize( a ) { return new Vector3( ...a ).normalize() }
	
	static Length( a ) { return new Vector3( ...a ).length() }
	
	static Dot( a ) { return new Vector3( ...a ).dot( b ) }
	
	static Distance( a, b ) { return new Vector3( ...a ).dot( b ) }
	
	static Cross( a, b ) { return new Vector3( ...a ).cross( b ) }

	/** Reflect
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/reflect.xhtml
	 *
	 *		I - 2.0 * dot(N, I) * N
	 *
	 *	@param {Vector3} I	incident vector normalized
	 *	@param {Vector3} N	normal vector
	 *	@return {Vector3}
	 */
	static Reflect( I, N ) {

		return new Vector3( I ).sub( new Vector3( N ).mul( 2 * N.dot( I ) ) )

	}

	/** Refract
	 *
	 *	@ref https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
	 *
	 *		k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
	 *		if (k < 0.0)
	 *    		R = genType(0.0);       // or genDType(0.0)
	 *		else
	 *    		R = eta * I - (eta * dot(N, I) + sqrt(k)) * N;
	 *
	 *
	 *	@param {Vector3} I		incident vector normalized
	 *	@param {Number} eta 	ratio of indices of refraction
	 *	@return {Vector3}
	 */
	static Refract( I, N, eta ) {

		N = new Vector3( N ); //.normalize(),

		let	R = new Vector3(),
			d = N.dot( I ),
			k = 1.0 - eta * eta * (1.0 - d * d);

		if( k >= 0.0 ) {

			R.set( I ).mul( eta ).sub( N.mul( eta * d + Math.sqrt( k ) ) );

		}

		return R

	}

	/** Normal
	 *
	 *		a           b
	 *		+-----------+
	 *		|         /
	 *		|       /
	 *		|     /
	 *		|   /
	 *		| /
	 *		+
	 *      c           
	 *
	 *	@param {Vector3} a
	 *	@param {Vector3} b
	 *	@param {Vector3} c
	 *	@return {Vector3}
	 */
	static Normal( a, b, c ) {
		
		return new Vector3( ...b ).sub( ...a ).cross( new Vector3( ...c ).sub( ...a ) ).normalize();
		
	}
	
	/** Lerp 
	 *
	 *	@param {Vector3} a
	 *	@param {Vector3} b
	 *	@param {Number} t
	 *	@return {Vector3}
	 */
	static Lerp( a, b, t ) {
		
		return new Vector3( ...a ).add( new Vector3( ...a ).sub( ...b ).mul( t ) )
	
	}
	
}

/** Vector4
 *
 */
class Vector4 extends Float32Array {

	constructor( x = 0, y = x, z = x, w = 1 ) {

		super([ x, y, z, w ]);

	}

	get x() { return this[0] }
	get y() { return this[1] }
	get z() { return this[2] }
	get w() { return this[3] }

	set x( v ) { this[0] = v; }
	set y( v ) { this[1] = v; }
	set z( v ) { this[2] = v; }
	set w( v ) { this[3] = v; }

	clone() {
		
		return new Vector4( ...this );
		
	}

}

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
let Matrix3$1 = class Matrix3 extends Float32Array {

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
	
};

const M4_IDENTITY = [ 1, 0, 0, 0,
					  0, 1, 0, 0,
					  0, 0, 1, 0,
					  0, 0, 0, 1 ];

/** Matrix4
 *
 *
 */
let Matrix4$1 = class Matrix4 extends Float32Array {

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
	
	set x( v ) { this[ 12 ] = v; }
	set y( v ) { this[ 13 ] = v; }
	set z( v ) { this[ 14 ] = v; }

	/** getMatrix3
	 *	
	 *	@return {Matrix3}
	 */
	getMatrix3() {
		
		let [ a, b, c, d, 
			  e, f, g, h, 
			  i, j, k, l,
			  m, n, o, p  ] = this;
		
		return new Matrix3$1([
			a, b, c,
			e, f, g,
			i, j, k
		]);

	}
	
	/** det
	 *
	 *	@return {Number | Boolean}
	 */
	det() {

	//	let [ a, b, c, d, 
	//		  e, f, g, h, 
	//		  i, j, k, l,
	//		  m, n, o, p  ] = this;
		
		let [ a, e, i, m, 
			  b, f, j, n, 
			  c, g, k, o,
			  d, h, l, p  ] = this;
		
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
		
	//	let [ a, b, c, d, 
	//		  e, f, g, h, 
	//		  i, j, k, l,
	//		  m, n, o, p  ] = this;
		
		let [ a, e, i, m, 
			  b, f, j, n, 
			  c, g, k, o,
			  d, h, l, p  ] = this;
		
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
			
		} else {
			
			this.set( M4_IDENTITY );
			
		}

		return this;

	}
	
	
	multiply( b ) {
		
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

		let s = Math.sin( rad ),
			c = Math.cos( rad );

		this.multiply([
			1, 0, 0, 0, 
			0, c,-s, 0, 
			0, s, c, 0, 
			0, 0, 0, 1
		]);

   //    this.multiply([
	//		1, 0, 0, 0, 
	//		0, c, s, 0, 
	//		0,-s, c, 0, 
	//		0, 0, 0, 1
	//	]);

		return this

	}

	rotateY( rad ) {

		let s = Math.sin( rad ),
			c = Math.cos( rad );

		this.multiply([
			c, 0, s, 0,
			0, 1, 0, 0,
		   -s, 0, c, 0,
			0, 0, 0, 1
		]);

	//   this.multiply([
	//		c, 0,-s, 0,
	//		0, 1, 0, 0,
	//	    s, 0, c, 0,
	//	    0, 0, 0, 1
	//	]);

		return this

	}

	rotateZ( rad ) {

		var s = Math.sin( rad ),
			c = Math.cos( rad );

	   this.multiply([
			c,-s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

	//    this.multiply([
	//		c, s, 0, 0,
	//	   -s, c, 0, 0,
	//		0, 0, 1, 0,
	//		0, 0, 0, 1
	//	]);

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

		this.multiply([
		  tx * x + c,     tx * y - s * z,  tx * z + s * y, 0,
			tx * y + s * z, ty * y + c,      ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x,  t * z * z + c,  0,
			0,              0,               0,              1
		]);

//		this.multiply([
//            tx * x + c,		tx * y + s * z,	tx * z - s * y,	0,
//			tx * y - s * z,	ty * y + c,		ty * z + s * x,	0,
//			tx * z + s * y,	ty * z - s * x,	t * z * z + c,	0,
//			0,				0,				0,				1
//        ]);

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
	
};

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

}
/** parser
 *
 *	@param {Number} n
 *	@param {Number} max = 255
 *	@return {Number}
 */
function parser( n, max = 255 ) {

	if( n > 1 && Number.isInteger( n ) ) n /= max;

	return Math.max( 0, Math.min( n, 1 ) );

}
/** rgb_binary565
 *	
 *	@param {Number} r
 *	@param {Number} g
 *	@param {Number} b
 *	@return {Number}
 */
function rgb_to_binary565( r, g, b ) {
	
	return (b * 0x1f) | (g * 0x3f) << 5 | (r * 0x1f) << 11;
	
}
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
	
}
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
	
}
/** rgb_to_binary
 *
 *	@param {Number} r		0 < r < 1
 *	@param {Number} g		0 < g < 1
 *	@param {Number} b		0 < b < 1
 *	@return {Number}
 */
function rgb_to_binary( r, g, b ) {

	return (b * 0xff) | (g * 0xff) << 8 | (r * 0xff) << 16;

}
/** binary_to_rgb
 *
 *	@param {Number} n
 *	@return {Array}
 */
function binary_to_rgb( n ) {

	return [ ( n >> 16 ) & 255, ( n >>  8 ) & 255, n & 255 ];

}
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

}
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

}
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

}
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

}
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

}
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

}


/** Color<Float32Array[3]|Float32Array[4]>
 *	
 */
class Color extends Float32Array {

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

	set r( v ) { this[ 0 ] = parser( v ); }
	set g( v ) { this[ 1 ] = parser( v ); }
	set b( v ) { this[ 2 ] = parser( v ); }
	set a( v ) { this[ 3 ] = v; }

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

/** index_lines_remove_duplicate
 *
 */
function index_lines_remove_duplicate( input ) {
	
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

/** Triangle
 *	
 */
class Triangle extends Array {
	
	constructor( a, b, c ) {
		
		super( a, b, c );
		
		this.normal = Vector3.Normal( a, b, c );

	}

	clone() {
		
		let [ a, b, c ] = this;
		
		return new Triangle( a.clone(), b.clone(), c.clone() );
		
	}
	
	flip() {
		
		this.reverse();
		
		for( let v of this ) 
			v.negate();
		
		this.normal.negate();
		
		return this;
		
	}

	translate( t ) {
		
		for( let i = 0; i < this.length; i++ )
			this[i] = Vector3.Add( this[i], t );
		
		this.normal = Vector3.Normal( ...this );
		
		return this;
		
	}
	
	rotate( angle, axis ) {
		
		for( let i = 0; i < this.length; i++ )
			this[i] = this[i].clone().applyAxisAngle( angle, axis );
		
		this.normal = Vector3.Normal( ...this );
		
		return this;
		
	}
	
	scale( sx, sy = sx, sz = sx ) {
		
		for( let i = 0; i < this.length; i++ )
			this[i] = Vector3.Mul( this[i], [sx, sy, sz]);
		
	//	this.normal = Vector3.Normal( ...this );
		
		return this;
		
	}
	
}

/** Polygon
 *	
 *	{Polygon} [ {Triangle} ]
 *	
 */
class Polygon extends Array {
	
//	constructor() {
//		
//		super( ...arguments );
//		
//	}
	
	clone() {
		
		let polygon = new Polygon();
		
		for( let t of this ) 
			polygon.push( t.clone() );
		
		return polygon
		
	}

	flip() {
		
		this.reverse();

		for( let v of this ) 
			v.flip();
		
		return this;
		
	}
	
	translate( v ) {
		
		for( let t of this ) 
			t.translate( v );
		
		return this;
		
	}
	
	rotate( angle, axis ) {
		
		for( let t of this ) 
			t.rotate( angle, axis );
		
		return this;
		
	}
	
	scale( sx, sy = sx, sz = sx ) {
		
		for( let t of this ) 
			t.scale( sx, sy, sz );
		
		return this;
		
	}
	
	static Create( rx, ry, n ) {
		
		rx = rx/2;
		ry = ry/2;
		
		let polygon = new Polygon();
		
		let a = new Vector3( 0, 0, 0 );
		
		let step = (360/n) * (Math.PI/180);
		
		for( let i = 0; i < n; i++ ) {
			
			let r1 = step * i;
			let x1 = rx * Math.cos( r1 ) - rx * Math.sin( r1 );
			let y1 = ry * Math.sin( r1 ) + ry * Math.cos( r1 );
			let b = new Vector3( x1, 0, y1 );
			
			let r2 = step * (i + 1);
			let x2 = rx * Math.cos( r2 ) - rx * Math.sin( r2 );
			let y2 = ry * Math.sin( r2 ) + ry * Math.cos( r2 );
			let c = new Vector3( x2, 0, y2 );
			
			polygon.push( new Triangle( a, b, c ) );
			
		}
		
		return polygon;
		
	}
	
	/**	Rect
	 *
	 *		a           b
	 *		+-----------+
	 *		|         / |
	 *		|       /   |
	 *		|     /     |
	 *		|   /       |
	 *		| /         |
	 *		+-----------+
	 *      c           d
	 *
	 *	@param {Number} w
	 *	@param {Number} h
	 *	@return {Polygon}
	 */
	static Rect( width, height ) {
		
		let w = width/2,
			h = height/2;
	
		let a = new Vector3(-w, h, 0 ),
			b = new Vector3( w, h, 0 ),
			c = new Vector3(-w,-h, 0 ),
			d = new Vector3( w,-h, 0 );
		
		return new Polygon( new Triangle( b, a, c ), new Triangle( c, d, b ) );
		
	}
	
}

/** Geometry3
 *	
 *	Geometry > Polygon > Triangle
 *	
 */
class Geometry3 extends Array {
	
//	constructor() {
//		
//		super( ...arguments );
//		
//	}
	
	clone() {
		
		let geometry = new Geometry3();
		
		for( let p of this ) 
			geometry.push( p.clone() );
		
		return geometry;
		
	}
	
	flip() {
		
		this.reverse();

		for( let p of this ) 
			p.flip();
		
		return this;
		
	}
	
	append() {
		
		for( let p of arguments )
			this.push( p );
		
		return this;
		
	}
	
//	merge() {}
	
	translate( v ) {
		
		for( let p of this ) 
			p.translate( v );
		
		return this;
		
	}
	
	rotate( angle, axis ) {
		
		for( let p of this ) 
			p.rotate( angle, axis );
		
		return this;
		
	}

	scale( sx, sy = sx, sz = sx ) {
		
		for( let p of this ) 
			p.scale( sx, sy, sz );
		
		return this;
		
	}


	createTrianglesBuffer( indexed = true ) {

		let index = new Array();
		let vertice = new Array();
		let normal = new Array();
		
		if( indexed ) {
			
			let vertices_index = new Object;

			for( let polygon of this ) {
				for( let triangle of polygon ) {
					
					for( let vector of triangle ) {

						let key = vector.toString();

						let i = vertices_index[ key ];
						
						if( i == undefined ) {
							i = vertices_index[ key ] = vertice.length/3;
							vertice.push( ...vector );
							normal.push( ...triangle.normal );
						}

						index.push( i );

					}
					
				}
			}
			
		} else {
			
			let i = 0;
			
			for( let polygon of this ) {
				for( let triangle of polygon ) {
					for( let vector of triangle ) {

						vertice.push( ...vector );
						normal.push( ...triangle.normal );
						
						index.push( i++ );

					}
					
				}
			}
			
		}
		
		return {
			index: new Uint16Array( index ),
			vertice: new Float32Array( vertice ),
			normal: new Float32Array( normal )
		}

	}

	createLinesBuffer( diagonalsFlag = false ) {

		let vertice = new Array();
		let normal = new Array();
		let index = new Array();
		let diagonals = new Array();

		let vertices_index = new Object;

		for( let polygon of this ) {
			for( let triangle of polygon ) {
				
				let subindex = [];
				
				for( let v of triangle ) {

					let key = v.toString();

					let i = vertices_index[ key ];

					if( i == undefined ) {
						i = vertices_index[ key ] = vertice.length/3;
						vertice.push( ...v );
						normal.push( ...triangle.normal );
					}

					subindex.push( i );

				}
				
				let [ a, b, c ] = subindex;
				
				index.push( a, b, b, c );
				diagonals.push( a, c );
				
			}
		}
		
		if( diagonalsFlag )
			index.push( ...diagonals );
		
		return {
			index: new Uint16Array( index_lines_remove_duplicate( index ) ),
			vertice: new Float32Array( vertice ),
			normal: new Float32Array( normal )
		}

	}

	createNormalDebugBuffer() {
		
		let vertice = new Array();
		
		for( let p of this ) {
			for( let t of p ) {
				
				let n = t.normal.mul( .2 );
				
				for( let v of t ) {
					vertice.push( v.x, v.y, v.z );
					vertice.push( v.x + n.x, v.y + n.y, v.z + n.z );
				}
			}
		}
		
		return { vertice: new Float32Array( vertice ) }

	}
	
	
	static Plane( width = 1, height = 1, nw = width, nh = height ) {
		
		let output = new Geometry3();
		
		let sw = width / nw;
		let sh = height / nh;
		
		let dx = width / 2;
		let dy = height / 2;
		
		for( let y = 0; y < nh; y++ )
			for( let x = 0; x < nw; x++ )
				output.push( Polygon.Rect( sw, sh ).translate( new Vector3( (x * sw) - dx, (y * sh) - dy, 0 ) ) );
		
		return output;
		
	}
	
	static PlaneCurved( bezierx, beziery, nw, nh ) {
		
		nw += 1;
		nh += 1;
		
		let points = []; 
		
		for( let y = 0; y <= nh; y++ ) {
			
			let by = beziery.at( y/(nh-1) );
			
			let data = [];
			
			for( let x = 0; x <= nw; x++ ) {
				
				let bx = bezierx.at( x/(nw-1) );
				
				data.push( bx.add( ...by ) );
				
			}
			
			points.push( data );
			
		}
		
		let output = new Geometry3();
		
		for( let i = 1; i < nh; i++ ) {
			
			let n = i - 1;
			
			for( let j = 1; j < nw; j++ ) {
				
				let m = j - 1;
				
				let a = points[i][j],
					b = points[n][j],
					c = points[n][m],
					d = points[i][m];
				
				output.push( new Polygon( new Triangle( a, b, c ), new Triangle( c, d, a ) ) );
				
			}
			
		}
		
		
		return output;
		
	}
	
	static Cube( width = 1, height = 1, deep = 1, nw = 2, nh = 2 ) {
		
		let w = width/2,
			h = height/2,
			d = deep/2;
	
	//	let face_a = Polygon.Rect( width, height ).translate( new Vector3( -w, -h, d ) );
	//	let face_b = face_a.clone().flip();
	//	
	//	let face_c = Polygon.Rect( deep, height ).rotate( Math.PI/2, Vector3.Y ).translate( new Vector3( w, -h, d ) );
	//	let face_d = face_c.clone().flip();
	//	
	//	let face_e = Polygon.Rect( width, deep ).rotate( -Math.PI/2, Vector3.X ).translate( new Vector3( -w, h, d ) );
	//	let face_f = face_e.clone().flip();
	//	
	//	return new Geometry( face_a, face_b, face_c, face_d, face_e, face_f );
		
		let face_a = Polygon.Rect( width, height ).translate( new Vector3( 0, 0, d ) );
		let face_b = face_a.clone().flip();
		
		let face_c = Polygon.Rect( deep, height ).rotate( Math.PI/2, Vector3.Y ).translate( new Vector3( w, 0, 0 ) );
		let face_d = face_c.clone().flip();
		
		let face_e = Polygon.Rect( width, deep ).rotate( -Math.PI/2, Vector3.X ).translate( new Vector3( 0, h, 0 ) );
		let face_f = face_e.clone().flip();
		
		return new Geometry3( face_a, face_b, face_c, face_d, face_e, face_f );
		
	//	let face_a = Geometry.Plane( width, height, nw, nh ).translate( new Vector3( 0, 0, d ) );
	//	let face_b = Geometry.Plane( width, height, nw, nh ).rotate( Math.PI, Vector3.Y ).translate( new Vector3( 0, 0,-d ) );
	//	
	//	let face_c = Geometry.Plane( deep, height, nw, nh ).rotate( Math.PI/2, Vector3.Y ).translate( new Vector3( w, 0, 0 ) );
	//	let face_d = face_c.clone().flip();
	//	
	//	let face_e = Geometry.Plane( width, deep, nw, nh ).rotate( -Math.PI/2, Vector3.X ).translate( new Vector3( 0, h, 0 ) );
	//	let face_f = face_e.clone().flip();
		
		
	//	face_a.push( ...face_b, ...face_c, ...face_d, ...face_e, ...face_f );
		
	//	return face_a;

	}
	
	static Sphere( rx = 1, ry = 1, rz = 1, latitude = 16, longitude = 32 ) {
		
		let PI_LAT = Math.PI/(latitude-1),
			PI2_LON = 2 * Math.PI/longitude;
		
		let points = new Array();
		
		for( let i = 0; i < latitude; i++ ) {
			
			let data = new Array();
			
			let s = Math.sin( i * PI_LAT ),
				c = Math.cos( i * PI_LAT ); // y
			
			for( let j = 0; j < longitude; j++ ) {
			
				let x = Math.cos( j * PI2_LON ) * s,
					z = Math.sin( j * PI2_LON ) * s;
				
				data.push( new Vector3( x * rx, c * ry, z * rz ) );
				
			}
			
			points[i] = data;
			
		}
		
		let output = new Geometry3();
		
		for( let j = 0; j < longitude; j++ ) {
					
			let m = j + 1;
			
			if( m == longitude ) m = 0;
			
			/// top
			let a = points[0][0],
				b = points[1][j],
				c = points[1][m];
			
			output.push( new Polygon( new Triangle( c, b, a ) ) );
			
			/// bottom
			let d = points[latitude-1][0],
				e = points[latitude-2][j],
				f = points[latitude-2][m];
			
			output.push( new Polygon( new Triangle( d, e, f ) ) );
			
		}
		
		/// middle
		for( let i = 2; i < latitude-1; i++ ) {
			
			let n = i - 1;
			
			for( let j = 0; j < longitude; j++ ) {
				
				let m = j + 1;
				
				if( m == longitude ) m = 0;
				
				let a = points[i][j],
					b = points[n][j],
					c = points[n][m],
					d = points[i][m];
				
				output.push( new Polygon( 
					new Triangle( a, b, c ), 
					new Triangle( c, d, a ) 
				) );
				
			}
			
		}
		
		return output;
		
	}
	
}

class Attribute {
	
	constructor( gl, location, type ) {
		
		this.gl = gl;
		
		this.location = location;
		
		this.type = type;
		this.size = parseInt( type.replace(/\D/g, '') );
		
	}
	
}

///
const UNIFORM_TYPES = [ "int", "bool", "sampler2D", "float", "vec2", "vec3", "vec4", "mat2", "mat3", "mat4" ];

///
const UNIFORM_TYPES_INT = [ "int", "bool", "sampler2D" ];

/** isIterator
 *	
 *  @param {*} e
 *  @return {Boolean}
 */
function isIterator( e ) { return e instanceof Object && Symbol.iterator in e }

/** Uniform
 *	
 */
class Uniform {
	
	constructor( gl, location, type, size ) {
		
		this.gl = gl;
		
		this.location = location;
		
		this.type = type;
		this.size = size;
		
	}
	
	set( value ) {
		
		let { gl, location, type, size } = this;
		
		if( size > 0 ) {

			if( UNIFORM_TYPES.includes( type ) ) {

				let data = new Array();

				if( isIterator( value[0] ) ) {

					for( let v of value )
						data.push( ...v );

				} else {

					data = value;

				}

				if( UNIFORM_TYPES_INT.includes( type ) ) {

					value = new Int32Array( data );

				} else {

					value = new Float32Array( data );

				}

			} else {
				
				console.log( 'failure uniform type' );
				
			//	for( let i = 0; i < quantity; i++ )
			//		for( let key in location[i] )
			//			webgl_setup_uniform_value( gl, location[i][ key ], value[i][ key ] );
			//
			//	return;

			}

		}
		
		
		///
		switch( type ) {

			case "int":
			case "bool":
			case "sampler2D":

					if( value instanceof Int32Array ) {

						gl.uniform1iv( location, value );

					} else {

						gl.uniform1i( location, value );

					}

				break;

			case "float":

					if( value instanceof Float32Array ) {

						gl.uniform1fv( location, value );

					} else {

						gl.uniform1f( location, value );

					}

				break;

			case "vec2":
					gl.uniform2fv( location, value );
				break;

			case "vec3":
					gl.uniform3fv( location, value );
				break;

			case "vec4":
					gl.uniform4fv( location, value );
				break;

			case "mat2":
					gl.uniformMatrix2fv( location, false, value );
				break;

			case "mat3":
					gl.uniformMatrix3fv( location, false, value );
				break;

			case "mat4":
					gl.uniformMatrix4fv( location, false, value );
				break;

			default:

				console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

				/*	if( location instanceof WebGLUniformLocation ) {

						console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

					} else {
						
						for( let key in location )
							webgl_setup_uniform_value( gl, location[ key ], value[ key ] );

					}
				/**/
				
				break;

		}
		
	}
	
	
	/*
	
	set( value ) {
		
		if( quantity > 0 ) {

			if( UNIFORM_TYPES.includes( type ) ) {

				let data = new Array();

				if( isIterator( value[0] ) ) {

					for( let v of value )
						data.push( ...v );

				} else {

					data = value;

				}

				if( UNIFORM_TYPES_INT.includes( type ) ) {

					value = new Int32Array( data );

				} else {

					value = new Float32Array( data );

				}

			} else {
				
				for( let i = 0; i < quantity; i++ )
					for( let key in location[i] )
						webgl_setup_uniform_value( gl, location[i][ key ], value[i][ key ] );

				return;

			}

		}

		switch( type ) {

			case "int":
			case "bool":
			case "sampler2D":

					if( value instanceof Int32Array ) {

						gl.uniform1iv( location, value );

					} else {

						gl.uniform1i( location, value );

					}

				break;

			case "float":

					if( value instanceof Float32Array ) {

						gl.uniform1fv( location, value );

					} else {

						gl.uniform1f( location, value );

					}

				break;

			case "vec2":
					gl.uniform2fv( location, value );
				break;

			case "vec3":
					gl.uniform3fv( location, value );
				break;

			case "vec4":
					gl.uniform4fv( location, value );
				break;

			case "mat2":
					gl.uniformMatrix2fv( location, false, value );
				break;

			case "mat3":
					gl.uniformMatrix3fv( location, false, value );
				break;

			case "mat4":
					gl.uniformMatrix4fv( location, false, value );
				break;

			default:

					if( location instanceof WebGLUniformLocation ) {

						console.warn( "webgl_uniform_set_value: type \""+ type +"\" is incompatible" );

					} else {
						
						for( let key in location )
							webgl_setup_uniform_value( gl, location[ key ], value[ key ] );

					}

				break;

		}

		
	}
	
	
	/**/
	
}

/** UniformArray
 *	
 *	[ {Uniform}, ... ]
 *	
 */
class UniformArray extends Array {
	
	/**	
	 *	
	 */
	set( values ) {
		
		for( let i = 0; i < this.length; i++ )
			this[i].set( values[i] );
		
	}
	
}

/** UniformStruct
 *	
 *	{
 *		{Uniform} [name]
 *		...
 *	}
 *	
 */
class UniformStruct {
	
	set( value ) {
		
		for( let key in this )
			this[ key ].set( value[key] );
		
	}
	
}

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
class Program {
	
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

class WGLBuffer {
	
	/** WGLBuffer
	 *
	 *  @param {WebGLRenderingContext} gl
	 *  @param {Float32Array|Uint16Array} data
	 *  @param {Number} usage						STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
	 */
	constructor( gl, data, usage ) {
		
		let buffer = gl.createBuffer(),
			target = (data instanceof Uint16Array)? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
		
		gl.bindBuffer( target, buffer );
		gl.bufferData( target, data, usage || gl.STATIC_DRAW );
		
		this.buffer = buffer;
		this.length = data.length;
		
	}
	
	/** update
	 *	
	 */
	update() {
		
		/// TODO
		
	}
	
}

/** is_power2
 *
 *  @param {Number} n
 *  @return {Boolean}
 */
function is_power2( n ) { return (n & (n-1)) === 0 }


class WGLTexture {
	
	/** createTexture
	 *	
	 *  @param {WebGLRenderingContext} gl
	 *	@param {*} data
	 *	@param {Object} options				{ width, height, level, format, type, filter, wrap }
	 */
	constructor( gl, data, options ) {
		
		let format = gl[ options.format || 'RGBA' ],
			type   = gl[ options.type   || 'UNSIGNED_BYTE' ],
			filter = gl[ options.filter || 'LINEAR' ],
			wrap   = gl[ options.wrap   || 'CLAMP_TO_EDGE' ];
		
		let level = options.level || 0,
			width, height;
		
		///
		let texture = gl.createTexture();
		
		gl.bindTexture( gl.TEXTURE_2D, texture );
		
		///
		if( data == null ) {

			width = options.width || 1;
			height = options.height || 1;

			if( format == gl.RGB ) 
				gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );

			gl.texImage2D( gl.TEXTURE_2D, level, format, width, height, 0, format, type, data );

		} else {

			switch( data.constructor.name ) {

				case 'HTMLImageElement':
				
						width = data.naturalWidth;
						height = data.naturalHeight;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;
				
				case 'HTMLVideoElement':
					
						width = data.videoWidth;
						height = data.videoHeight;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;
					
				case 'ImageData':
				case 'ImageBitmap':
				case 'HTMLCanvasElement':

						width = data.width;
						height = data.height;

						gl.texImage2D( gl.TEXTURE_2D, level, format, format, type, data );

					break;

				case 'Array':
				case 'Uint8Array':
				case 'Uint16Array':

						width = options.width || 1;
						height = options.height || 1;

						if( type == gl.UNSIGNED_BYTE ) {

							data = new Uint8Array( data );

						} else {

							data = new Uint16Array( data );

						}

						if( format == gl.RGB ) gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );

						gl.texImage2D( gl.TEXTURE_2D, level, format, width, height, 0, format, type, data );

					break;

			}

		}

		///
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, 1 );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter );
		
		if( is_power2( width ) && is_power2( height ) ) {

			gl.generateMipmap( gl.TEXTURE_2D );

		} else {

			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap );

		}
		
		///
		this.texture = texture;
		this.width = width;
		this.height = height;
		this.index = -1;
		
	}
	
	/** update
	 *	
	 */
	update() {
		
		/// TODO
		
	}
	
}

/** Renderer
 *
 */
class Renderer {

	/** 
	 *	
	 *	@param {Number} width
	 *	@param {Number} height
	 */
	constructor( width, height ) {

		var canvas = document.createElement('canvas');
	//	var canvas = document.createElement('canvas', { premultipliedAlpha: false });
			canvas.setAttribute( 'width', width );
			canvas.setAttribute( 'height', height );

		var context = canvas.getContext('webgl');
			context.viewport( 0, 0, width, height );
			
			
	
			context.enable( context.DEPTH_TEST );
		//	context.enable( context.CULL_FACE );
			context.enable(context.BLEND);
		//	context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
			
		//	context.enable( context.CULL_FACE );
		//	context.enable( context.DITHER );
			
		//	context.cullFace( context.FRONT )
		//	context.cullFace( context.BACK )
			
		//	context.enable( context.SAMPLE_ALPHA_TO_COVERAGE );
		//	context.enable( context.BLEND );
		//	context.blendFunc( context.SRC_COLOR, context.DST_COLOR );
		//	context.blendFunc( context.ONE, context.SRC_COLOR );
			
		this.canvas = canvas;
		this.context = context;
		
		/// current usage
		this.program = null;
		
		/// current texture index
		this.textures = new Array();
		
		/// 
		this.drawArraysLength = 0;
		
		///
		this.frameBuffer = context.createFramebuffer();
		this.renderBuffer = context.createRenderbuffer();
		
		
	}
	
	/** createProgram
	 *
	 *  @param {String} vertexScript
	 *  @param {String} fragmentScript
	 *	@return {WGLProgram}
	 */
	createProgram( vertexScript, fragmentScript ) {

		return new Program( this.context, vertexScript, fragmentScript );
		
	}
	
	/** createBuffer
	 *
	 *  @param {Float32Array | Uint16Array} data
	 *  @param {Number} usage						STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
	 *	@return {WGLBuffer}
	 */
	createBuffer( data, usage ) {
		
		return new WGLBuffer( this.context, data, usage );
		
	}
	
	/** createTexture
	 *	
	 *	@param {*} data
	 *	@param {Object} options				{ width, height, level, format, type, filter, wrap }
	 *	@return {WGLTexture}
	 */
	createTexture( data = null, options = {} ) {
		
		return new WGLTexture( this.context, data, options );
		
	}
	
	/* */
	
	/** resize
	 *	
	 *	@param {Number} width
	 *	@param {Number} height
	 */
	resize( width, height ) {
		
		let { canvas, context } = this;
		
		canvas.setAttribute( 'width', width );
		canvas.setAttribute( 'height', height );
		
		///
		context.viewport( 0, 0, width, height );
		
	}
	
	/** clear
	 *	
	 *	@param {Color} color		!Optional
	 */
	clear( color ) {

		let gl = this.context;
		
		if( color ) 
			gl.clearColor( ...color );
		 
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	}
	
	/** setup
	 *	
	 *	desabilta os attibutes do program anterior
	 *	altera o programa utilizado
	 *	habilita os attibutes do programa atual
	 *	reseta o indice das texturas
	 *	
	 *	@param {WGLProgram} objectProgram
	 */
	setup( objectProgram ) {

		let gl = this.context;
		let current = this.program;
		
		///
		if( current ) 
			current.disableAttributes();

		gl.useProgram( objectProgram.program );
		
		///
		objectProgram.enableAttributes( gl );
		
		/// reset all texture index
		for( let t of this.textures ) 
			t.index = -1;
		
		this.program = objectProgram;
		this.textures = new Array();
		
		gl.enable( gl.DEPTH_TEST );
		
	}

	/** setUniformList
	 *	
	 */
	setUniform( name, value ) {
		
		let gl = this.context;
		
		if( value.texture ) {
					
			if( value.index == -1 ) {
				
				value.index = this.textures.push( value ) - 1;
				
				gl.activeTexture( gl.TEXTURE0 + value.index );
				gl.bindTexture( gl.TEXTURE_2D, value.texture );
				
			}
			
			value = value.index;
			
		}
		
		this.program.uniforms[ name ].set( value );
		
	}
	
	/** setUniformList
	 *
	 *	@param {Object} list
	 */
	setUniformList( list ) {
		
		let gl = this.context;
		
		let uniforms = this.program.uniforms;
		
		for( let name in uniforms ) {
			
			if( name in list ) {

				let value = list[ name ];

				if( value.texture ) {
					
					if( value.index == -1 ) {
						
						value.index = this.textures.push( value ) - 1;
						
						gl.activeTexture( gl.TEXTURE0 + value.index );
						gl.bindTexture( gl.TEXTURE_2D, value.texture );
				
					}
					
					value = value.index;
					
				}
				
				uniforms[ name ].set( value );
				
			}

		}

	}
	
	/** setAttribute
	 *	
	 *	@ref https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer
	 *	@ref https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
	 *	
	 *	@param {String} name
	 *	@param {WGLBuffer} { buffer, length }
	 */
	setAttribute( name, { buffer, length }) {
		
		let gl = this.context;
		
		let { location, size } = this.program.attributes[ name ];
		
		gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
		gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
		
		this.drawArraysLength = length / size;
		
	}
	
	/** setAttributeList
	 *	
	 *	@param {Object} list
	 */
	setAttributeList( list ) {
		
		let attributes = this.program.attributes;
		let gl = this.context;
		
		for( let name in attributes ) {

			if( name in list ) {
				
				let { location, size } = attributes[ name ];
				let { buffer, length } = list[ name ];
				
				gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
				gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 );
				
				///
				this.drawArraysLength = length / size;
		
			}
			
		}
		
	}
	
	/** draw
	 *	
	 *	@param {Number} mode
	 *	@param {null | WGLBuffer} index
	 *	@param {Number} offset
	 *	@param {Number} count
	 */
	draw( mode, index = null, offset = 0, count ) {
		
		let gl = this.context;
		
		mode = gl[ mode ];
		
		if( index == null ) {
			
			gl.drawArrays( mode, offset, count || this.drawArraysLength );
		
		} else {
			
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, index.buffer );
			gl.drawElements( mode, count || index.length, gl.UNSIGNED_SHORT, offset );

		}
		
	}
	
}

export default {
	Renderer,
	Vector2,
	Vector3,
	Vector4,
	Matrix3: Matrix3$1,
	Matrix4: Matrix4$1,
	Color,
	Geometry3
};

