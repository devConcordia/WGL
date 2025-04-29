
import Vector3 from "../math/Vector3.mjs"

/** Triangle
 *	
 */
export default class Triangle extends Array {
	
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
