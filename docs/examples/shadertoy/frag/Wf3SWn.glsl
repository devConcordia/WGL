

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
    "Sunset" by @XorDev
    
    Expanded and clarified version of my Sunset shader:
    https://www.shadertoy.com/view/wXjSRt
    
    Based on my tweet shader:
    https://x.com/XorDev/status/1918764164153049480
*/

//Output image brightness
#define BRIGHTNESS 1.0

//Base brightness (higher = brighter, less saturated)
#define COLOR_BASE 1.5
//Color cycle speed (radians per second)
#define COLOR_SPEED 0.5
//RGB color phase shift (in radians)
#define RGB vec3(0.0, 1.0, 2.0)
//Color translucency strength
#define COLOR_WAVE 14.0
//Color direction and (magnitude = frequency)
#define COLOR_DOT vec3(1,-1,0)

//Wave iterations (higher = slower)
#define WAVE_STEPS 8
//Starting frequency
#define WAVE_FREQ 5.0
//Wave amplitude
#define WAVE_AMP 0.6
//Scaling exponent factor
#define WAVE_EXP 1.8
//Movement direction
#define WAVE_VELOCITY vec3(0.2)


//Cloud thickness (lower = denser)
#define PASSTHROUGH 0.2

//Cloud softness
#define SOFTNESS 0.005
//Raymarch step
#define STEPS 100
//Sky brightness factor (finicky)
#define SKY 10.0
//Camera fov ratio (tan(fov_y/2))
#define FOV 1.0

void main()
{
    //Raymarch depth
    float z = 0.0;
    
    //Step distance
    float d = 0.0;
    //Signed distance
    float s = 0.0;
    
    //Ray direction
    vec3 dir = normalize( vec3(2.0*gl_FragCoord.xy - iResolution.xy, - FOV * iResolution.y));
    
    //Output color
    vec3 col = vec3(0);
    
    //Clear fragcolor and raymarch with 100 iterations
    for(int i = 0; i < STEPS; i++)
    {
        //Compute raymarch sample point
        vec3 p = z * dir;
        
        //Turbulence loop
        //https://www.shadertoy.com/view/3XXSWS
		float f = WAVE_FREQ;
    //    for(float j = 0.0, f = WAVE_FREQ; j<WAVE_STEPS; j++, f *= WAVE_EXP)
        for(int j = 0; j < WAVE_STEPS; j++ ) {
            
			p += WAVE_AMP*sin(p*f - WAVE_VELOCITY*iTime).yzx / f;
            f *= WAVE_EXP;
			
		}
        //Compute distance to top and bottom planes
        s = 0.3 - abs(p.y);
        //Soften and scale inside the clouds
        d = SOFTNESS + max(s, -s*PASSTHROUGH) / 4.0;
        //Step forward
        z += d;
        //Coloring with signed distance, position and cycle time
        float phase = COLOR_WAVE * s + dot(p,COLOR_DOT) + COLOR_SPEED*iTime;
        //Apply RGB phase shifts, add base brightness and correct for sky
        col += (cos(phase - RGB) + COLOR_BASE) * exp(s*SKY) / d;
    }
    //Tanh tonemapping
    //https://www.shadertoy.com/view/ms3BD7
    
	col *= SOFTNESS / float(STEPS) * BRIGHTNESS;
	
    gl_FragColor = vec4(tanh(col * col), 1.0);
}