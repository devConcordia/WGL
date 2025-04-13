
precision highp float;

uniform vec2      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)


#define M_PI 3.1415926535897932384626433832795

float progress = 1.;
vec3 fireColor = vec3(0., .5, 1.);
vec3 smokeColor = vec3(.2, .8, 0.2);
float thickness = 1.;
float direction = 1.;
float radius = .95;
float intensity = 2.;
float inner = 1.;
float smokeSmoothness = 50.;

float angleToClockLike(vec2 uv) {
  float angle = atan(-uv.y, -uv.x) + M_PI;
  return mod(-angle + M_PI/2., 2. * M_PI);
}

vec3 polarMap(vec2 uv, float direction, float shift, float radius, float intensity, float inner) {
  intensity = 10./intensity;
  float angle = angleToClockLike(uv);
  float px =  direction * angle / 6.28 + shift;
  float py = length(uv) * (1. + inner * 5. * intensity) - inner * 2.5 * intensity + (intensity - radius * intensity);
  return vec3(px, py, angle);
}

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898,12.1414))) * 83758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n);
  vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

vec3 ramp(float t, vec3 fireColor) {
  vec3 color = t <= .5 ? fireColor + vec3(0., 0., 0.): 
      smokeColor;
  return color / t;
}

float fire(vec2 n) {
  return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
}

float shade(vec2 uv, float t, float smokeSmoothness) {
  uv.x += uv.y < .5 ? 23.0 + t * .035 : -11.0 + t * .03;  
  uv.x *= smokeSmoothness;
  uv.y = 0.9 * abs(uv.y - 0.5);
  float q = fire(uv - t * .013) / 2.0;
  vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));
  return pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);
}

vec3 color(float grad, float thickness) {
  float m2 = 2.5;
  grad = sqrt(grad) * thickness;
  vec3 color = ramp(grad, fireColor);
  color /= (m2 + max(vec3(0), color));
  return color;

}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv.x *= iResolution.x / iResolution.y;
  uv -= 0.5;
  
  progress = mod(iTime/10., 1.);
  float t = iTime;
  
  vec3 polar = polarMap(uv, direction, 0., radius, intensity, inner);
    
  float fullAngle = progress * 2. * M_PI;
  if(polar.z > fullAngle) {
    gl_FragColor = vec4(0.0);
    return;
  }
  
  vec3 c1 = color(shade(polar.xy, t, smokeSmoothness), thickness);
  float startCap = 0.09;
  if(polar.z < startCap) {
    c1 = c1 * (0.3 + (0.7 * polar.z/startCap));
  }
  float endCap = 0.09;
  if(polar.z > fullAngle - endCap) {
    float perc = (1. - (polar.z - (fullAngle - endCap))/endCap);
    c1 = c1 * (0.3 + (0.7 * perc));
  }
  gl_FragColor = vec4(c1, 1.0);
}