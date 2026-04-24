import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Center, Bounds } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    if (import.meta.env.DEV) console.error("FBX load error:", err);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function FBXModel({ url, autoRotate, tint }) {
  const fbx = useLoader(FBXLoader, encodePath(url));
  const clone = useMemo(() => fbx.clone(true), [fbx]);
  const ref = useRef();

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const prev = child.material;
        const color = tint
          ? new THREE.Color(tint)
          : prev?.color ?? new THREE.Color("#e3e3e3");
        child.material = new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.9,
          roughness: 0.25,
          clearcoat: 0.6,
          clearcoatRoughness: 0.2,
          reflectivity: 0.9,
        });
      }
    });
  }, [clone, tint]);

  useFrame((_, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={clone} />
    </group>
  );
}

function Loader({ message }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
      </div>
      <p className="mt-6 text-eyebrow text-gold">{message || "Model yükleniyor"}</p>
    </div>
  );
}

function ErrorPanel({ url }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 bg-ink/90">
      <p className="font-display italic text-2xl text-gold">3B model yüklenemedi.</p>
      <p className="mt-3 text-body-sm text-cream/70">Model: <span className="font-mono text-[11px] break-all">{url}</span></p>
      <p className="mt-2 text-body-sm text-cream/50">Dosyanın <span className="font-mono">public/models/</span> altında olduğundan emin olun.</p>
    </div>
  );
}

export default function FBXViewer({
  url,
  height = 560,
  autoRotate = true,
  tint,
  hint = "Sürükleyerek döndürün · Scroll ile yakınlaştırın",
  className = "",
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  const [viewerH, setViewerH] = useState(height);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setViewerH(Math.min(height, 400));
      else if (w < 1024) setViewerH(Math.min(height, 520));
      else setViewerH(height);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (isCoarse) return;
    const onWheel = (e) => e.preventDefault();
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ height: viewerH, touchAction: "none", overscrollBehavior: "contain" }}
    >
      {!mounted && <Loader />}
      {mounted && (
        <SceneErrorBoundary fallback={<ErrorPanel url={url} />}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4], fov: 40, near: 0.1, far: 2000 }}
            gl={{ antialias: true, preserveDrawingBuffer: false }}
          >
            <color attach="background" args={["#0a0a0a"]} />

            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow color="#fff7e0" />
            <directionalLight position={[-6, 4, -3]} intensity={0.7} color="#d4af37" />
            <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />

            <Suspense fallback={null}>
              <Environment preset="studio" />
              <Bounds fit clip margin={2.2}>
                <Center>
                  <FBXModel url={url} autoRotate={autoRotate} tint={tint} />
                </Center>
              </Bounds>
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              minDistance={1.5}
              maxDistance={80}
              enableZoom
              touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            />
          </Canvas>

          <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="text-eyebrow text-cream/70 bg-ink/40 backdrop-blur-sm px-4 py-2">
              {hint}
            </span>
          </div>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
