/** Vector4
 *
 */
export default class Vector4 extends Float32Array {

	constructor( x = 0, y = x, z = x, w = 1 ) {

		super([ x, y, z, w ]);

	}

	get x() { return this[0] }
	get y() { return this[1] }
	get z() { return this[2] }
	get w() { return this[3] }

	set x( v ) { this[0] = v }
	set y( v ) { this[1] = v }
	set z( v ) { this[2] = v }
	set w( v ) { this[3] = v }

	clone() {
		
		return new Vector4( ...this );
		
	}

}
