attribute vec3 vertice;
attribute vec3 normal;

uniform mat3 normalMatrix;
uniform mat4 model, projection, view;

varying vec3 _vertice, _normal;

void main() {
	
	vec4 worldPosition = model * vec4( vertice, 1.0 );
	
	_vertice = vec3(view * worldPosition);
	
	_normal = normalize(normalMatrix * normal);
	
	gl_Position = projection * vec4(_vertice, 1.0);
	
}