precision highp float;

varying vec2 uv;
uniform vec2 u_Resolution;
uniform float u_Time;

$$NODE_FUNCTIONS$$

float scene_sdf(vec3 p) {
  vec3 center = vec3(0.5*cos(u_Time), 0.5*sin(u_Time), 0);
  p -= center;
  $$MODEL_SDF_FUNCTION_BODY$$
}

vec3 scene_normal(vec3 p) {
  float h = 0.001;
  float d = scene_sdf(p);
  return normalize(vec3(
    (scene_sdf(p + vec3(h, 0, 0)) - d) / h,
    (scene_sdf(p + vec3(0, h, 0)) - d) / h,
    (scene_sdf(p + vec3(0, 0, h)) - d) / h
  ));
}

vec3 march(vec3 p, vec3 ray) {
  float epsilon = 0.01;

  for (int i = 0; i < 64; i++) {
    float d = scene_sdf(p);
    if (d < epsilon) {
      vec3 L = normalize(vec3(1, 1, -1));
      vec3 N = scene_normal(p);
      vec3 color = vec3(0, 1, 0);
      return 0.8*dot(N, L)*color + 0.2*color;
    }
    p += ray*d;
  }

  return vec3(0, 0, 1);
}

void main() {
  vec2 my_uv = uv - vec2(0.5, 0.5);
  my_uv.x *= (u_Resolution.x/u_Resolution.y);
  vec3 camera = vec3(0, 0, -2);
  vec3 p = vec3(my_uv, 0);
  vec3 ray = normalize(p - camera);
  vec3 c = march(camera, ray);

  gl_FragColor = vec4(c, 1.0);
}