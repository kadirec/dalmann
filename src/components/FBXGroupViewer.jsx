import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

class SceneErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { if (import.meta.env.DEV) console.error("FBX group error:", err); }
  render() { return this.state.hasError ? (this.props.fallback ?? null) : this.props.children; }
}

function buildMaterial(type, tint) {
  const color = new THREE.Color(tint || "#e3e3e3");
  if (type === "gem") {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0,
      roughness: 0.03,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.75,
      attenuationColor: color.clone(),
      attenuationDistance: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0,
      specularIntensity: 1,
      envMapIntensity: 2.2,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }
  if (type === "gemLight") {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0,
      roughness: 0.02,
      transmission: 0.98,
      thickness: 0.7,
      ior: 1.58,
      attenuationColor: color.clone(),
      attenuationDistance: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0,
      specularIntensity: 1,
      envMapIntensity: 2.4,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }
  if (type === "pearl") {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      sheen: 1,
      sheenColor: new THREE.Color("#ffe7d0"),
      sheenRoughness: 0.25,
      iridescence: 0.6,
      iridescenceIOR: 1.4,
      iridescenceThicknessRange: [100, 400],
      envMapIntensity: 1.9,
    });
  }
  if (type === "gold") {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 1,
      roughness: 0.28,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      reflectivity: 1,
      envMapIntensity: 1.8,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.7,
    clearcoatRoughness: 0.18,
    reflectivity: 0.95,
    envMapIntensity: 1.2,
  });
}

function FBXPart({ url, tint, material = "metal", visible }) {
  const fbx = useLoader(FBXLoader, encodePath(url));
  const clone = useMemo(() => fbx.clone(true), [fbx]);

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        const isGem = material === "gem" || material === "gemLight";
        child.castShadow = !isGem;
        child.receiveShadow = !isGem;
        child.material = buildMaterial(material, tint);
        if (isGem) child.renderOrder = 1;
      }
    });
  }, [clone, tint, material]);

  return <primitive object={clone} visible={visible} />;
}

// Computes the bounding box from ALL parts (including invisible ones), then
// centers + scales the group ONCE. Camera stays stable regardless of which
// parts the user toggles, so the "zemin" part can't push the view out of frame.
function AutoFit({ children, keyFit }) {
  const ref = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    // Temporarily force all descendants visible so the bbox reflects the entire model.
    const prev = [];
    g.traverse((c) => { prev.push([c, c.visible]); c.visible = true; });
    g.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(g);
    prev.forEach(([c, v]) => { c.visible = v; });

    if (!isFinite(box.min.x) || box.isEmpty()) { setReady(true); return; }

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.35 / maxDim;

    g.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    g.scale.setScalar(scale);
    setReady(true);
  }, [keyFit]);

  return (
    <group ref={ref} visible={ready}>
      {children}
    </group>
  );
}

function Spinner({ autoRotate, children }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (autoRotate && ref.current) ref.current.rotation.y += delta * 0.2;
  });
  return <group ref={ref}>{children}</group>;
}

function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
      </div>
      <p className="mt-6 text-eyebrow text-gold">Parçalar yükleniyor</p>
    </div>
  );
}

export default function FBXGroupViewer({
  parts,
  height = 560,
  autoRotate = true,
  hint = "Sürükleyerek döndürün · Parçaları aşağıdan seçin",
  className = "",
  showControls = true,
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(() =>
    Object.fromEntries(parts.map((p, i) => [p.id, showControls ? i === 0 : true]))
  );

  useEffect(() => { setMounted(true); }, []);

  const toggledParts = parts.map((p) => ({ ...p, visible: visible[p.id] }));
  const partsKey = useMemo(() => parts.map((p) => p.url).join("|"), [parts]);

  // Responsive canvas height: shorter on mobile so the picker below stays visible.
  const [viewerH, setViewerH] = useState(height);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setViewerH(Math.min(height, 380));
      else if (w < 1024) setViewerH(Math.min(height, 480));
      else setViewerH(height);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden select-none"
        style={{ height: viewerH, touchAction: "none", overscrollBehavior: "contain" }}
      >
        {!mounted && <Loader />}
        {mounted && (
          <SceneErrorBoundary fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-ink/90 text-cream p-8 text-center">
              <p className="font-display italic text-xl text-gold">Parçalar yüklenirken bir sorun oluştu.</p>
            </div>
          }>
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 2000 }}
              gl={{ antialias: true }}
            >
              <color attach="background" args={["#0a0a0a"]} />
              <ambientLight intensity={0.45} />
              <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow color="#fff7e0" />
              <directionalLight position={[-6, 4, -3]} intensity={0.7} color="#d4af37" />
              <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />

              <Suspense fallback={null}>
                <Environment preset="studio" />
                <Spinner autoRotate={autoRotate}>
                  <AutoFit keyFit={partsKey}>
                    {toggledParts.map((p) => (
                      <FBXPart
                        key={p.url}
                        url={p.url}
                        tint={p.tint}
                        material={p.material}
                        visible={p.visible !== false}
                      />
                    ))}
                  </AutoFit>
                </Spinner>
              </Suspense>

              <OrbitControls
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                minDistance={1.5}
                maxDistance={80}
                touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
              />
            </Canvas>

            <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center px-4">
              <span className="text-eyebrow text-cream/70 bg-ink/40 backdrop-blur-sm px-3 py-2 text-center max-w-full">
                {hint}
              </span>
            </div>
          </SceneErrorBoundary>
        )}
      </div>

      {showControls && (
      <div className="mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
        {parts.map((p) => (
          <button
            key={p.id}
            onClick={() => setVisible((v) => ({ ...v, [p.id]: !v[p.id] }))}
            className={`group text-left p-3 md:p-4 border-2 bg-cream transition-all duration-500 ${
              visible[p.id]
                ? "border-gold shadow-[0_0_0_1px_rgba(212,175,55,0.4)]"
                : "border-ink/15 hover:border-ink/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full border transition flex-shrink-0 ${
                  visible[p.id] ? "bg-gold border-gold" : "border-ink/30"
                }`}
              />
              <span className="text-eyebrow text-[11px] md:text-xs">{p.label}</span>
            </div>
            <p className="mt-2 text-[12px] md:text-body-sm text-ink/70 line-clamp-3">{p.note}</p>
          </button>
        ))}
      </div>
      )}
    </div>
  );
}
