import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import type { Mesh } from 'three';
import { usePrefersReducedMotion, useIsMobile, useLowPowerDevice } from '@/shared/hooks/useMediaQuery';

function HeroShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.35}>
        <torusKnotGeometry args={[0.9, 0.26, 48, 12]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.75} />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[-6, -3, 4]} intensity={0.5} color="#8b5cf6" />
      <Stars radius={50} depth={30} count={600} factor={3} saturation={0} fade speed={0.5} />
      <HeroShape />
    </>
  );
}

function ParticleFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
}

export function HeroBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile(1024);
  const lowPower = useLowPowerDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const use3D = !reducedMotion && !isMobile && !lowPower;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !use3D) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [use3D]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 lg:inset-y-0 lg:left-[40%] lg:right-0 overflow-hidden pointer-events-none"
    >
      {use3D ? (
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={inView ? 'always' : 'never'}
          className="!absolute inset-0"
        >
          <HeroScene />
        </Canvas>
      ) : (
        <ParticleFallback />
      )}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-surface-950/40 to-surface-950 lg:block hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/50 lg:hidden" />
    </div>
  );
}
