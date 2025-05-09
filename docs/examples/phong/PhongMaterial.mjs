
import Color from "../../../source/math/Color.mjs";

export default class PhongMaterial {
	
	constructor( ambient, diffuse, specular, shininess = 32 ) {
		
		this.diffuse = new Color( diffuse );
		this.specular = new Color( specular );
		this.ambient = new Color( ambient );
		this.shininess = shininess;
		
	}
	
}
