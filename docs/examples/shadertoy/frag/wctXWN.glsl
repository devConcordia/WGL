
precision highp float;

uniform vec2      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)

float tanh(float x) {
    float ex = exp(x);
    float e_negx = exp(-x);
    return (ex - e_negx) / (ex + e_negx);
}
vec2 tanh(vec2 x) {
    return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
}

vec3 tanh(vec3 x) {
    return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
}

vec4 tanh(vec4 x) {
    return (exp(x) - exp(-x)) / (exp(x) + exp(-x));
}


/*
    "Vortex" by @XorDev
    
    https://x.com/XorDev/status/1930594981963505793

    An experiment based on my "3D Fire":
    https://www.shadertoy.com/view/3XXSWS
*/
void main()
{
	
	vec4 O = gl_FragColor;
	vec2 I = gl_FragCoord.xy;
	
    //Raymarch iterator
    float i,
    //Raymarch depth
    z = fract(dot(I,sin(I))),
    //Raymarch step size
    d = 1.0;
    //Raymarch loop (100 iterations)
//    for(O *= i; i++<1e2;
//        //Sample coloring and glow attenuation
//        O+=(sin(z+vec4(6,2,4,0))+1.5)/d)

    for( int i = 0; i < 100; i++ )  {
		
		
        //Raymarch sample position
        vec3 p = z * normalize(vec3(I+I,0) - iResolution.xyy);
        //Shift camera back
        p.z += 6.;
        //Distortion (turbulence) loop
		
		d = 1.0;
     //   for(d=1.; d<9.; d/=.8)
        for(int n = 0; n < 9; n++ ) {
            d /= .8;
			p += cos(p.yzx*d-iTime)/d;
		}
        //Compute distorted distance field of cylinder
        z += d = .002+abs(length(p)-.5)/4e1;
		
		
		O+=(sin(z+vec4(6,2,4,0))+1.5)/d;
		
    }
    //Tanh tonemapping
    //https://www.shadertoy.com/view/ms3BD7
    gl_FragColor = tanh(O/7e3);
	gl_FragColor.a = 1.0;
	
}