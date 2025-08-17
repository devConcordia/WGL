precision highp float;

uniform float zoom;
uniform vec2 resolution;

/// @ref https://www.shadertoy.com/view/MslGD8
vec2 rand( vec2 p ) {
	
    p = vec2(dot( p, vec2( 127.1, 311.7 ) ),
             dot( p, vec2( 269.5, 183.3 ) ));
    
	return fract( sin(p) * 18.5453 );
	
}

float voronoi( in vec2 x ) {
	
    vec2 n = floor( x );
    vec2 f = fract( x );
	
	float m = 8.0;
	
    for( int j=-1; j<=1; j++ ) {
		for( int i=-1; i<=1; i++ ) {
			
			vec2 g = vec2( float(i), float(j) );
			
			vec2 o = rand( n + g );
			
			vec2 r = g - f + o;
			
			m = min( m, dot( r, r ) );
			
		}
	}

    return m;
	
}

void main() {
	
    vec2 point = gl_FragCoord.xy / max(resolution.x, resolution.y);
    
    float v = voronoi( zoom * point );
	
	float s = clamp( v, 0.0, 1.0 );
	vec3 bg = vec3( 1.0-point.x, point.x*point.y, 1.0-point.y );
	
	gl_FragColor = vec4( (bg * vec3( s )) , 1.0 );
	
}