
import { index_lines_remove_duplicate } from "./core.mjs"
import Vector3 from "../math/Vector3.mjs"
import Polygon from "./Polygon.mjs"
import Triangle from "./Triangle.mjs"

/** Geometry3
 *	
 *	Geometry > Polygon > Triangle
 *	
 */
export default class Geometry3 extends Array {
	
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
