
import Vector3 from "../math/Vector3.mjs"
import Triangle from "./Triangle.mjs"

/** Polygon
 *	
 *	{Polygon} [ {Triangle} ]
 *	
 */
export default class Polygon extends Array {
	
//	constructor() {
//		
//		super( ...arguments );
//		
//	}
	
	clone() {
		
		let polygon = new Polygon();
		
		for( let t of this ) 
			polygon.push( t.clone() )
		
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
