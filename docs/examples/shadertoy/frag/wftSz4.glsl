

precision highp float;

uniform vec2      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)



float cheap_happy_star(vec2 uv, float anim)
{
    uv = abs(uv);
    vec2 pos = min(uv.xy/uv.yx, anim);
    float p = (2.0 - pos.x - pos.y);
    return (2.0+p*(p*p-1.5)) / (uv.x+uv.y);      
}
 
void main()
{

 vec2 uv5 = ( gl_FragCoord.xy - .5*iResolution.xy ) / iResolution.y;
 uv5*=2.+cos(iTime);
    uv5*=mat2(cos(iTime*10.),-sin(iTime*10.),sin(iTime*10.),cos(iTime*10.));
   
    uv5+= 1.-dot(uv5,uv5)*length(uv5)*5.;
    uv5 *= 2.0 * ( cos(iTime * 22.0) -2.5); // scale
    float anim5 = sin(iTime * 12.0) * 0.1 + 1.0;  // anim between 0.9 - 1.1 
    vec4 fragColor5 = vec4(cheap_happy_star(uv5, anim5) * vec3(1.1,0.5,4.15),2.);


vec2 uv4 = ( gl_FragCoord.xy - .5*iResolution.xy ) / iResolution.y;
 
    uv4 *= 2.0 * ( cos(iTime * 22.0) -2.5); // scale
    float anim4 = sin(iTime * 12.0) * 0.1 + 1.0;  // anim between 0.9 - 1.1 
    vec4 fragColor4 = vec4(cheap_happy_star(uv4, anim4) * vec3(1.1,0.5,0.15)*0.2,2.);


vec2 uv3 = ( gl_FragCoord.xy - .5*iResolution.xy ) / iResolution.y;
 uv3*=4.;
    uv3*=mat2(cos(iTime*10.),-sin(iTime*10.),sin(iTime*10.),cos(iTime*10.));
   
    uv3+= 1.-dot(uv3,uv3)*length(uv3)*5.;
    uv3 *= 2.0 * ( cos(iTime * 22.0) -2.5); // scale
    float anim3 = sin(iTime * 12.0) * 0.1 + 1.0;  // anim between 0.9 - 1.1 
    vec4 fragColor3 = vec4(cheap_happy_star(uv3, anim3) * vec3(1.1,0.5,0.15),2.);



 vec2 uv2 = ( gl_FragCoord.xy - .5*iResolution.xy ) / iResolution.y;
 uv2*=2.;
    uv2*=mat2(cos(iTime*10.),-sin(iTime*10.),sin(iTime*10.),cos(iTime*10.));
   
    uv2+= 1.-dot(uv2,uv2)*length(uv2)*5.;
    uv2 *= 2.0 * ( cos(iTime * 22.0) -2.5); // scale
    float anim2 = sin(iTime * 12.0) * 0.1 + 1.0;  // anim between 0.9 - 1.1 
    vec4 fragColor2 = vec4(cheap_happy_star(uv2, anim2) * vec3(0.1,0.5,0.15),2.);
    
    
    vec2 uv = ( gl_FragCoord.xy - .5*iResolution.xy ) / iResolution.y;
     uv*=2.;
    uv*=mat2(cos(iTime*10.),sin(iTime*10.),-sin(iTime*10.),cos(iTime*10.));

    uv+= 1.-dot(uv,uv)*length(uv)*5.;
    uv *= 2.0 * ( cos(iTime * 22.0) -2.5); // scale
    float anim = sin(iTime * 12.0) * 0.1 + 1.0;  // anim between 0.9 - 1.1 
    gl_FragColor = vec4(cheap_happy_star(uv, anim) * vec3(0.35,0.2,0.65), 1.0)+fragColor2+fragColor3+fragColor4+fragColor5;
}	