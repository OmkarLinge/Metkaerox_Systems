"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type DroneModelProps = {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
  enableAutoRotate?: boolean;
  playAnimations?: boolean;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  environmentPreset?: Parameters<typeof Environment>[0]["preset"];
  enableControls?: boolean;
  enableZoom?: boolean;
  minDistance?: number;
  maxDistance?: number;
  zoomSpeed?: number;
  controlsTarget?: [number, number, number];
  minPolarAngle?: number;
  maxPolarAngle?: number;
  baseRotation?: [number, number, number];
  enablePropellerSpin?: boolean;
  propellerSpeed?: number;
  propellerAxis?: "x" | "y" | "z";
  animationMode?: "loop" | "once" | "none";
  animationTimeScale?: number;
  propellerTint?: string;
  propellerEmissive?: string;
  propellerEmissiveIntensity?: number;
  propellerScale?: number;
  propellerNamePatterns?: string[];
  lockBasePosition?: boolean;
  hideUntilReady?: boolean;
  animationStrategy?: "all" | "openThenHover";
  openingAnimationName?: string;
  hoverAnimationName?: string;
  freezePositionTracks?: boolean;
  playHoverAnimation?: boolean;
  hoverMode?: "float" | "y" | "none";
  ambientIntensity?: number;
  ambientColor?: string;
  keyLightIntensity?: number;
  keyLightColor?: string;
  keyLightPosition?: [number, number, number];
  snapToOpenState?: boolean;
};

function Drone({
  modelPath,
  scale,
  position,
  rotationSpeed,
  enableAutoRotate,
  playAnimations,
  floatSpeed,
  rotationIntensity,
  floatIntensity,
  baseRotation,
  enablePropellerSpin,
  propellerSpeed,
  propellerAxis,
  animationMode,
  animationTimeScale,
  propellerTint,
  propellerEmissive,
  propellerEmissiveIntensity,
  propellerScale,
  propellerNamePatterns,
  lockBasePosition,
  hideUntilReady,
  animationStrategy,
  openingAnimationName,
  hoverAnimationName,
  freezePositionTracks,
  playHoverAnimation,
  hoverMode,
  snapToOpenState,
}: Required<
  Pick<
    DroneModelProps,
    | "modelPath"
    | "scale"
    | "position"
    | "rotationSpeed"
    | "enableAutoRotate"
    | "playAnimations"
    | "floatSpeed"
    | "rotationIntensity"
    | "floatIntensity"
    | "baseRotation"
    | "enablePropellerSpin"
    | "propellerSpeed"
    | "propellerAxis"
    | "propellerTint"
    | "propellerEmissive"
    | "propellerEmissiveIntensity"
    | "propellerScale"
    | "propellerNamePatterns"
    | "lockBasePosition"
    | "hideUntilReady"
    | "animationStrategy"
    | "openingAnimationName"
    | "hoverAnimationName"
    | "freezePositionTracks"
    | "playHoverAnimation"
    | "hoverMode"
    | "animationMode"
    | "animationTimeScale"
    | "snapToOpenState"
  >
>) {
  const ref = useRef<any>();
  const propellersRef = useRef<THREE.Object3D[]>([]);
  const basePosition = useRef(new THREE.Vector3(...position));
  const [isVisible, setIsVisible] = useState(!hideUntilReady);
  const [openComplete, setOpenComplete] = useState(animationStrategy !== "openThenHover");
  const hoverStart = useRef<number | null>(null);
  const { scene, animations } = useGLTF(modelPath);
  const sanitizedAnimations = useMemo(() => {
    return animations;
  }, [animations]);

  const { actions, names, mixer } = useAnimations(sanitizedAnimations, ref);

  useEffect(() => {
    if (!hideUntilReady) {
      setIsVisible(true);
      if (ref.current) {
        ref.current.visible = true;
      }
      return;
    }
    setIsVisible(false);
    if (ref.current) {
      ref.current.visible = false;
    }
  }, [hideUntilReady, modelPath, names]);

  useEffect(() => {
    const reveal = () => {
      if (ref.current) {
        ref.current.visible = true;
      }
      setIsVisible(true);
    };

    if (!playAnimations || animationMode === "none") {
      setOpenComplete(true);
      if (hideUntilReady) {
        const frame = window.requestAnimationFrame(reveal);
        return () => window.cancelAnimationFrame(frame);
      }
      reveal();
      return;
    }

    if (!actions) {
      if (hideUntilReady) {
        const frame = window.requestAnimationFrame(reveal);
        return () => window.cancelAnimationFrame(frame);
      }
      reveal();
      return;
    }

    const orderedNames = names && names.length > 0 ? names : Object.keys(actions);
    if (orderedNames.length === 0) {
      setOpenComplete(true);
      if (hideUntilReady) {
        const frame = window.requestAnimationFrame(reveal);
        return () => window.cancelAnimationFrame(frame);
      }
      reveal();
      return;
    }

    if (animationStrategy === "openThenHover") {
      const lowerNames = orderedNames.map((name) => name.toLowerCase());
      const pickByToken = (tokens: string[]) => {
        const index = lowerNames.findIndex((name) =>
          tokens.some((token) => name.includes(token))
        );
        return index >= 0 ? orderedNames[index] : "";
      };

      const openCandidate =
        openingAnimationName || pickByToken(["open", "unfold", "deploy", "expand", "start"]);
      const hoverCandidate =
        hoverAnimationName || pickByToken(["hover", "idle", "float", "loop"]);

      const openName = openCandidate || orderedNames[0];
      const hoverName =
        hoverCandidate && hoverCandidate !== openName
          ? hoverCandidate
          : orderedNames.length > 1
          ? orderedNames[1]
          : "";
      const openAction = openName ? actions[openName] : undefined;
      const hoverAction =
        playHoverAnimation && hoverName ? actions[hoverName] : undefined;

      Object.values(actions).forEach((action) => action?.stop());
      setOpenComplete(false);

      if (hoverAction) {
        hoverAction.reset();
        hoverAction.setEffectiveTimeScale(animationTimeScale);
        hoverAction.setLoop(THREE.LoopRepeat, Infinity);
        hoverAction.clampWhenFinished = false;
        hoverAction.paused = true;
      }

      if (openAction) {
        openAction.reset();
        openAction.setEffectiveTimeScale(animationTimeScale);
        openAction.setLoop(THREE.LoopOnce, 1);
        openAction.clampWhenFinished = true;
        openAction.play();
        
        if (snapToOpenState !== undefined && snapToOpenState !== false) {
          openAction.paused = true;
          const fraction = typeof snapToOpenState === 'number' ? snapToOpenState : 0.5;
          const snapTime = openAction.getClip().duration * fraction;
          openAction.time = snapTime;
          if (mixer) {
             mixer.setTime(snapTime);
             mixer.update(0); // Force bone updates
          }
          setOpenComplete(true);
        }
      } else {
        setOpenComplete(true);
        hoverAction?.play();
      }

      const handleFinished = (event: { action: THREE.AnimationAction }) => {
        if (event.action !== openAction) return;
        setOpenComplete(true);
        if (hoverAction) {
          hoverAction.paused = false;
          hoverAction.play();
        }
      };

      const fallbackDelay = openAction
        ? Math.max(600, openAction.getClip().duration * 1000 + 120)
        : 600;
      const fallback = window.setTimeout(() => {
        setOpenComplete(true);
        if (hoverAction) {
          hoverAction.paused = false;
          hoverAction.play();
        }
      }, fallbackDelay);

      mixer?.addEventListener("finished", handleFinished);

      if (!hideUntilReady) {
        return () => {
          window.clearTimeout(fallback);
          mixer?.removeEventListener("finished", handleFinished);
          Object.values(actions).forEach((action) => action?.stop());
        };
      }

      const frame = window.requestAnimationFrame(reveal);

      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(fallback);
        mixer?.removeEventListener("finished", handleFinished);
        Object.values(actions).forEach((action) => action?.stop());
      };
    }

    setOpenComplete(true);
    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.reset();
      action.setEffectiveTimeScale(animationTimeScale);
      if (animationMode === "once") {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
      }
      action.play();
    });

    if (!hideUntilReady) {
      return () => {
        Object.values(actions).forEach((action) => action?.stop());
      };
    }

    const frame = window.requestAnimationFrame(reveal);

    return () => {
      window.cancelAnimationFrame(frame);
      Object.values(actions).forEach((action) => action?.stop());
    };
  }, [
    actions,
    animationMode,
    animationStrategy,
    animationTimeScale,
    hideUntilReady,
    hoverAnimationName,
    mixer,
    names,
    openingAnimationName,
    playAnimations,
  ]);

  useEffect(() => {
    if (!hideUntilReady) return;
    if (playAnimations && actions && animationMode !== "none") return;
    const frame = window.requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.visible = true;
      }
      setIsVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [actions, animationMode, hideUntilReady, playAnimations, modelPath]);

  useFrame((state) => {
    if (enableAutoRotate && ref.current) {
      ref.current.rotation.y += rotationSpeed;
    }
    if (enablePropellerSpin && propellersRef.current.length > 0) {
      propellersRef.current.forEach((prop) => {
        prop.rotation[propellerAxis] += propellerSpeed;
      });
    }
    if (lockBasePosition && ref.current) {
      ref.current.position.x = basePosition.current.x;
      ref.current.position.z = basePosition.current.z;
      if (hoverMode !== "y" || !openComplete) {
        ref.current.position.y = basePosition.current.y;
      }
    }
    if (hoverMode === "y" && ref.current) {
      if (!openComplete) {
        ref.current.position.x = basePosition.current.x;
        ref.current.position.y = basePosition.current.y;
        ref.current.position.z = basePosition.current.z;
        hoverStart.current = null;
        return;
      }
      if (hoverStart.current === null) {
        hoverStart.current = state.clock.getElapsedTime();
      }
      const t = state.clock.getElapsedTime() - hoverStart.current;
      const offset = Math.sin(t * floatSpeed) * floatIntensity;
      ref.current.position.x = basePosition.current.x;
      ref.current.position.z = basePosition.current.z;
      ref.current.position.y = basePosition.current.y + offset;
    }
  });

  useEffect(() => {
    basePosition.current.set(position[0], position[1], position[2]);
    if (lockBasePosition && ref.current) {
      ref.current.position.copy(basePosition.current);
    }
  }, [lockBasePosition, position]);

  useEffect(() => {
    if (!enablePropellerSpin) return;
    const propellers: THREE.Object3D[] = [];
    const hubs: THREE.Object3D[] = [];
    scene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (propellerNamePatterns?.length) {
        const matched = propellerNamePatterns.some((pattern) =>
          name.includes(pattern.toLowerCase())
        );
        if (matched) {
          propellers.push(child);
          return;
        }
      }
      if (name.includes("prop") || name.includes("rotor") || name.includes("blade")) {
        propellers.push(child);
        if (child instanceof THREE.Mesh) {
          if (propellerScale !== 1) {
            child.scale.multiplyScalar(propellerScale);
          }
          child.frustumCulled = false;
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material = child.material.map((material) => {
                const nextMaterial = material.clone();
                if ("color" in nextMaterial) {
                  nextMaterial.color.set(propellerTint);
                }
                if ("emissive" in nextMaterial) {
                  nextMaterial.emissive.set(propellerEmissive);
                  nextMaterial.emissiveIntensity = propellerEmissiveIntensity;
                }
                if ("side" in nextMaterial) {
                  nextMaterial.side = THREE.DoubleSide;
                }
                nextMaterial.needsUpdate = true;
                return nextMaterial;
              });
            } else {
              const nextMaterial = child.material.clone();
              if ("color" in nextMaterial) {
                nextMaterial.color.set(propellerTint);
              }
              if ("emissive" in nextMaterial) {
                nextMaterial.emissive.set(propellerEmissive);
                nextMaterial.emissiveIntensity = propellerEmissiveIntensity;
              }
              if ("side" in nextMaterial) {
                nextMaterial.side = THREE.DoubleSide;
              }
              nextMaterial.needsUpdate = true;
              child.material = nextMaterial;
            }
          }
        }
      } else if (name.includes("hub") || name.includes("motor")) {
        hubs.push(child);
      }
    });
    propellersRef.current = propellers.length > 0 ? propellers : hubs;
  }, [
    enablePropellerSpin,
    propellerNamePatterns,
    propellerEmissive,
    propellerEmissiveIntensity,
    propellerScale,
    propellerTint,
    scene,
  ]);

  const resolvedFloatSpeed = openComplete ? floatSpeed : 0;
  const resolvedRotationIntensity = openComplete ? rotationIntensity : 0;
  const resolvedFloatIntensity = openComplete ? floatIntensity : 0;

  if (hoverMode === "float") {
    return (
      <Float
        speed={resolvedFloatSpeed}
        rotationIntensity={resolvedRotationIntensity}
        floatIntensity={resolvedFloatIntensity}
      >
        <primitive
          ref={ref}
          object={scene}
          scale={scale}
          position={position}
          rotation={baseRotation}
          visible={isVisible}
        />
      </Float>
    );
  }

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={position}
      rotation={baseRotation}
      visible={isVisible}
    />
  );
}

export default function DroneModel({
  modelPath = "/models/drone_scout.glb",
  scale = 1.4,
  position = [0, -0.2, 0],
  rotationSpeed = 0.003,
  enableAutoRotate = true,
  playAnimations = true,
  floatSpeed = 1.5,
  rotationIntensity = 0.3,
  floatIntensity = 0.5,
  cameraPosition = [0, 0, 3],
  fov = 45,
  environmentPreset = "studio",
  enableControls = false,
  enableZoom = false,
  minDistance = 0.6,
  maxDistance = 5,
  zoomSpeed = 0.8,
  controlsTarget = [0, 0, 0],
  minPolarAngle = 0,
  maxPolarAngle = Math.PI,
  baseRotation = [0, 0, 0],
  enablePropellerSpin = false,
  propellerSpeed = 0.25,
  propellerAxis = "y",
  animationMode = "loop",
  animationTimeScale = 1,
  propellerTint = "#3f4a57",
  propellerEmissive = "#88b7d9",
  propellerEmissiveIntensity = 0.15,
  propellerScale = 1,
  propellerNamePatterns = [],
  lockBasePosition = false,
  hideUntilReady = false,
  animationStrategy = "all",
  openingAnimationName = "",
  hoverAnimationName = "",
  freezePositionTracks = false,
  playHoverAnimation = true,
  hoverMode = "float",
  snapToOpenState = false,
  ambientIntensity = 0.7,
  ambientColor = "#ffffff",
  keyLightIntensity = 1.2,
  keyLightColor = "#ffffff",
  keyLightPosition = [2, 2, 2],
}: DroneModelProps) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight
        position={keyLightPosition}
        intensity={keyLightIntensity}
        color={keyLightColor}
      />
      <Environment preset={environmentPreset} />
      {enableControls ? (
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={false}
          enableDamping
          minDistance={minDistance}
          maxDistance={maxDistance}
          zoomSpeed={zoomSpeed}
          target={controlsTarget}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
        />
      ) : null}
      <Suspense fallback={null}>
        <Drone
          modelPath={modelPath}
          scale={scale}
          position={position}
          rotationSpeed={rotationSpeed}
          enableAutoRotate={enableAutoRotate}
          playAnimations={playAnimations}
          animationMode={animationMode}
          animationTimeScale={animationTimeScale}
          floatSpeed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          baseRotation={baseRotation}
          enablePropellerSpin={enablePropellerSpin}
          propellerSpeed={propellerSpeed}
          propellerAxis={propellerAxis}
          propellerTint={propellerTint}
          propellerEmissive={propellerEmissive}
          propellerEmissiveIntensity={propellerEmissiveIntensity}
          propellerScale={propellerScale}
          propellerNamePatterns={propellerNamePatterns}
          lockBasePosition={lockBasePosition}
          hideUntilReady={hideUntilReady}
          animationStrategy={animationStrategy}
          openingAnimationName={openingAnimationName}
          hoverAnimationName={hoverAnimationName}
          freezePositionTracks={freezePositionTracks}
          playHoverAnimation={playHoverAnimation}
          hoverMode={hoverMode}
          snapToOpenState={snapToOpenState}
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/drone_scout.glb");
useGLTF.preload("/models/drone-2.glb");
useGLTF.preload("/inside_drone.glb");
