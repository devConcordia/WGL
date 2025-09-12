
import Color3 from './Color3.mjs';

/** Color4 RGBA
 *	
 */
export default class Color4 extends Color3 {

	constructor( ...args ) {

		if( args.length < 3 ) {
			
			let v = args[0];
			let a = args[1];
			
			if( a === undefined ) a = 1;
			
			args[0] = (( v >> 16 ) & 255)/255;
			args[1] = (( v >>  8 ) & 255)/255;
			args[2] = (v & 255)/255;
			args[3] = a;
			
		}
		
		if( args[3] == undefined ) args[3] = 1;
		
		super( ...args );
		
	}

	get a() { return this[ 3 ] }
	set a( v ) { this[ 3 ] = v }
	
	toString() {
		
		return '#'+ this.getUint().toString(16).padStart(8, '0');
		
	}
	
	getUint() {
		
		let u = (super.getUint() << 8) >>> 0;
		
		return (u | (this[3] * 0xff)) >>> 0;
		
	}
	
	getUint5551( a ) {

		return super.getUint5551( a || this[3] );
		
	}
	
	getUint4444( a ) {

		return super.getUint4444( a || this[3] );
		
	}
	
	getRGBA( a ) {
		
		return super.getRGBA( a || this[3] );
		
	}

}


/*
console.log( new Color3(0xff0000).toString() );
console.log( new Color3(0x00ff00).toString() );
console.log( new Color3(0x0000ff).toString() );
console.log( new Color3(1,1,0).toString() );
console.log( new Color3(1,0,1).toString() );
console.log( new Color3(0,1,1).toString() );
*/

console.log( new Color4(0xff0000, 1).toString() );
console.log( new Color4(0x00ff00, .5).toString() );
console.log( new Color4(0x0000ff, 0).toString() );
console.log( new Color4(1,1,0, 1).toString() );
console.log( new Color4(1,0,1,.5).toString() );
console.log( new Color4(0,1,1,.0).toString() );


