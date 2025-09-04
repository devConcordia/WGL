
precision highp float;
uniform vec2      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)

void main(){
	
	vec2 r = iResolution.xy;
	vec3 c;
	
	float l,
		z = iTime;
	
	for( int i = 0; i < 3; i++ ) {
		
		vec2 uv,
		p = gl_FragCoord.xy/r;
		
		uv = p;
		p -= .5;
		p.x *= r.x/r.y;
		
		z += .07;
		
		l = length(p);
		
		uv += p/l * (sin(z)+1.) * abs(sin(l*9.-z-z));
		
		c[i] = .01/length(mod(uv,1.)-.5);
		
	}
	
	gl_FragColor = vec4( c/l, iTime );
	
}