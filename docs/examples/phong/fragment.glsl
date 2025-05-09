precision highp float;

struct PhongMaterial {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

uniform PhongMaterial material;
uniform vec3 lightPosition;

uniform vec3 viewPosition;

varying vec3 _vertice, _normal;

/** 
 *	ka, kd, ks: coeficientes de material.
 *	Ia, Id, Is: intensidades de luz ambiente, difusa, especular.
 *	N: vetor normal.
 *	L: vetor da luz.
 *	R: reflexão de L em relação a N.
 *	V: vetor do observador.
 *	n: shininess.
 *	
 *	I = ka*Ia + kd*Id * (N - L) + ks* Is * (R-V)^n
 *	
 */
void main() {
	
	vec3 N = normalize( _normal );
    vec3 L = normalize( lightPosition - _vertice );
    vec3 V = normalize( viewPosition - _vertice );
    vec3 R = reflect( L, N );

    float diff = max( dot(N, L), 0.0 );
    float spec = pow( max(dot(R, V), 0.0), material.shininess );

    vec3 ambient = material.ambient;
    vec3 diffuse = material.diffuse * diff;
    vec3 specular = material.specular * spec;

    vec3 color = ambient + diffuse + specular;
	
    gl_FragColor = vec4(color, 1.0);
	
}