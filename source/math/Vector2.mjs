/** Vector2
 *
 */
export default class Vector2 extends Float32Array {

	constructor( x = 0, y = x ) {

		super([ x, y ]);

	}

	get x() { return this[0] }
	get y() { return this[1] }

	set x( v ) { this[0] = v }
	set y( v ) { this[1] = v }

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
