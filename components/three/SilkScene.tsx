"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Custom GLSL — flowing silk / satin drape
   Vertex displaces a dense plane; the fragment shades it with a
   fresnel sheen in the house champagne palette.
------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  float wave(vec2 p, float t) {
    float e = 0.0;
    e += sin(p.x * 0.85 + t) * 0.36;
    e += cos(p.y * 1.05 + t * 1.15) * 0.30;
    e += sin((p.x + p.y) * 1.55 + t * 1.6) * 0.17;
    e += cos(p.x * 2.30 - p.y * 1.75 + t * 2.1) * 0.09;
    return e * uIntensity;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.35;

    float eps = 0.06;
    float e0 = wave(pos.xy, t);
    float ex = wave(pos.xy + vec2(eps, 0.0), t);
    float ey = wave(pos.xy + vec2(0.0, eps), t);
    pos.z += e0;
    vElevation = e0;

    vec3 tx = normalize(vec3(eps, 0.0, ex - e0));
    vec3 ty = normalize(vec3(0.0, eps, ey - e0));
    vec3 n = normalize(cross(tx, ty));

    vNormalW = normalize(normalMatrix * n);
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vPosW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorChampagne;
  uniform vec3 uColorIvory;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 V = normalize(cameraPosition - vPosW);
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(vec3(0.35, 0.9, 0.65));

    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);
    float sheen = pow(max(dot(N, L), 0.0), 14.0);
    float back = pow(max(dot(N, -L), 0.0), 6.0);

    vec3 base = mix(uColorDeep, uColorChampagne, smoothstep(-0.7, 0.85, vElevation));
    base = mix(base, uColorIvory, sheen * 0.85);
    base += uColorChampagne * fres * 0.85;
    base += uColorDeep * back * 0.35;

    float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    edge *= smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

    gl_FragColor = vec4(base, 0.92 * edge);
  }
`;

function SilkFabric() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1 },
      uColorDeep: { value: new THREE.Color("#12100c") },
      uColorChampagne: { value: new THREE.Color("#c9a96a") },
      uColorIvory: { value: new THREE.Color("#f4efe7") },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const geometryArgs: [number, number, number, number] = useMemo(
    () => [4.4, 3.0, 96, 72],
    []
  );

  const meshProps: ThreeElements["mesh"] = {
    position: [0, 0, 0],
    rotation: [-0.5, 0, 0.2],
  };

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh {...meshProps}>
        <planeGeometry args={geometryArgs} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function GoldDust({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#e6d2a4"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SilkScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {mounted && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} color="#e6d2a4" />
          <SilkFabric />
          <GoldDust />
        </Canvas>
      )}
    </div>
  );
}