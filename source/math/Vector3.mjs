/** Vector3
 *
 */
export default class Vector3 extends Float32Array {

	constructor( x = 0, y = x, z = x ) {

		super([ x, y, z ]);

	}

	get x() { return this[ 0 ] }
	get y() { return this[ 1 ] }
	get z() { return this[ 2 ] }

	set x( v ) { this[ 0 ] = v }
	set y( v ) { this[ 1 ] = v }
	set z( v ) { this[ 2 ] = v }

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

	static add( a, b ) { return new Vector3( ...a ).add( ...b ) }
	static sub( a, b ) { return new Vector3( ...a ).sub( ...b ) }
	static mul( a, b ) { return new Vector3( ...a ).mul( ...b ) }
	static div( a, b ) { return new Vector3( ...a ).div( ...b ) }
	
	static negate( a ) { return new Vector3( ...a ).negate() }
	
	static normalize( a ) { return new Vector3( ...a ).normalize() }
	
	static length( a ) { return new Vector3( ...a ).length() }
	
	static dot( a ) { return new Vector3( ...a ).dot( b ) }
	
	static distance( a, b ) { return new Vector3( ...a ).dot( b ) }
	
	static cross( a, b ) { return new Vector3( ...a ).cross( b ) }

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

			R.set( I ).mul( eta ).sub( N.mul( eta * d + Math.sqrt( k ) ) )

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
	
	static X = new Vector3( 1, 0, 0 );
	static Y = new Vector3( 0, 1, 0 );
	static Z = new Vector3( 0, 0, 1 );
	
};
