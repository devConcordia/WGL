
import Color from "../../../source/math/Color.mjs";
import Vector3 from "../../../source/math/Vector3.mjs";

export default class PointLight {
	
	constructor( position, color, strength = 1, brightness = 10 ) {
		
		this.position = position || new Vector3( 0, 0, 0 );
		this.color = new Color( 0xffffff );
		this.brightness = brightness;
		this.strength = strength;
		
	}
	
}
