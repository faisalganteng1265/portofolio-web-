"use client";

import { Environment, Lightformer, Text, useTexture } from "@react-three/drei";
import { Canvas, extend, type ThreeElements, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  type RapierRigidBody,
  RigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

type MeshLineGeometryElement = ThreeElements["bufferGeometry"];
type MeshLineMaterialElement = ThreeElements["shaderMaterial"] & {
  color?: THREE.ColorRepresentation;
  depthTest?: boolean;
  lineWidth?: number;
  resolution?: [number, number];
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: MeshLineGeometryElement;
    meshLineMaterial: MeshLineMaterialElement;
  }
}

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
};

type BandMesh = THREE.Mesh & {
  geometry: THREE.BufferGeometry & {
    setPoints: (points: THREE.Vector3[]) => void;
  };
};

export default function AboutLanyard({
  position = [0, 0, 24],
  gravity = [0, -38, 0],
  fov = 22,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [dropKey, setDropKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDropKey((k) => k + 1);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-20">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={Math.PI * 0.82} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band key={dropKey} isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#f7efe0"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={4}
            color="#d6a44b"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={8}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 6,
  isMobile = false,
}: {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}) {
  const band = useRef<BandMesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const lerped = useRef(new Map<RapierRigidBody, THREE.Vector3>());
  const curve = useRef(
    (() => {
      const nextCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      nextCurve.curveType = "chordal";
      return nextCurve;
    })()
  );

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const [settled, setSettled] = useState(false);

  const portrait = useTexture("/assets/faisal-hero.png");

  const segmentProps: RigidBodyProps = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  useRopeJoint(fixed as RefObject<RapierRigidBody>, j1 as RefObject<RapierRigidBody>, [
    [0, 0, 0],
    [0, 0, 0],
    0.82,
  ]);
  useRopeJoint(j1 as RefObject<RapierRigidBody>, j2 as RefObject<RapierRigidBody>, [
    [0, 0, 0],
    [0, 0, 0],
    0.82,
  ]);
  useRopeJoint(j2 as RefObject<RapierRigidBody>, j3 as RefObject<RapierRigidBody>, [
    [0, 0, 0],
    [0, 0, 0],
    0.82,
  ]);
  useSphericalJoint(j3 as RefObject<RapierRigidBody>, card as RefObject<RapierRigidBody>, [
    [0, 0, 0],
    [0, 1.32, 0],
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(true), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) {
      return;
    }

    [j1, j2].forEach((ref) => {
      const body = ref.current;
      if (!body) return;

      let bodyLerped = lerped.current.get(body);
      if (!bodyLerped) {
        bodyLerped = new THREE.Vector3().copy(body.translation());
        lerped.current.set(body, bodyLerped);
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, bodyLerped.distanceTo(body.translation()))
      );
      bodyLerped.lerp(
        body.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
      );
    });

    const j1Lerped = lerped.current.get(j1.current);
    const j2Lerped = lerped.current.get(j2.current);
    if (!j1Lerped || !j2Lerped) return;

    curve.current.points[0].copy(j3.current.translation());
    curve.current.points[1].copy(j2Lerped);
    curve.current.points[2].copy(j1Lerped);
    curve.current.points[3].copy(fixed.current.translation());
    band.current?.geometry.setPoints(curve.current.getPoints(isMobile ? 18 : 32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z,
    }, true);
  });

  return (
    <>
      <group position={[0, 4.2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />
        <RigidBody
          position={[0.42, -0.25, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0.9, -0.7, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.25, -1.15, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, 1.8, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[1.05, 1.55, 0.06]} />
          <group
            scale={isMobile ? 1.72 : 2.05}
            position={[0, -1.14, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.stopPropagation();
              drag(false);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (!card.current) return;
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <CardMesh texture={portrait} settled={settled} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#f7efe0"
          depthTest={false}
          lineWidth={0.42}
          resolution={isMobile ? [720, 1200] : [1000, 1000]}
        />
      </mesh>
    </>
  );
}

function CardMesh({
  texture,
  settled,
}: {
  texture: THREE.Texture;
  settled: boolean;
}) {
  return (
    <group>
      <mesh position={[0, -0.1, -0.035]}>
        <boxGeometry args={[1.38, 2.22, 0.055]} />
        <meshPhysicalMaterial
          color="#100d0a"
          clearcoat={0.6}
          clearcoatRoughness={0.22}
          roughness={0.72}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.45, 0.005]}>
        <planeGeometry args={[1.2, 0.9]} />
        <meshBasicMaterial color="#f7efe0" toneMapped={false} />
      </mesh>

      <mesh position={[0, 0.34, 0.014]}>
        <planeGeometry args={[0.58, 0.9]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      <mesh position={[0, -0.65, 0.01]}>
        <planeGeometry args={[1.2, 1.14]} />
        <meshBasicMaterial color="#130f0b" transparent opacity={0.96} />
      </mesh>

      <Text
        position={[-0.51, -0.21, 0.025]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.055}
        letterSpacing={0.16}
        color="#d6a44b"
      >
        STUDENT ID
      </Text>
      <Text
        position={[-0.51, -0.39, 0.025]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.13}
        fontWeight={900}
        color="#fff7ea"
      >
        FAISAL AKMAL
      </Text>
      <Text
        position={[-0.51, -0.57, 0.025]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.06}
        letterSpacing={0.16}
        color="#9b8f7d"
      >
        FRONTEND · UNS
      </Text>

      <mesh position={[0, -0.82, 0.02]}>
        <planeGeometry args={[1.05, 0.006]} />
        <meshBasicMaterial color="#f7efe0" transparent opacity={0.08} />
      </mesh>

      <Text
        position={[-0.51, -1.02, 0.025]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.045}
        lineHeight={1.35}
        color="#6b5f4f"
        maxWidth={0.72}
      >
        {settled
          ? "Learning blockchain and building portfolio-grade web projects."
          : "Drag the card."}
      </Text>

      <mesh position={[0.49, -1.01, 0.026]}>
        <planeGeometry args={[0.16, 0.16]} />
        <meshBasicMaterial color="#1a120c" />
      </mesh>
      <Text
        position={[0.49, -1.01, 0.032]}
        anchorX="center"
        anchorY="middle"
        fontSize={0.065}
        color="#d6a44b"
      >
        ꦄ
      </Text>

      <mesh position={[0, 1.02, 0.02]}>
        <boxGeometry args={[0.56, 0.14, 0.08]} />
        <meshStandardMaterial color="#b8965a" metalness={0.8} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.94, 0.05]}>
        <torusGeometry args={[0.17, 0.018, 8, 28]} />
        <meshStandardMaterial color="#d6a44b" metalness={0.92} roughness={0.2} />
      </mesh>
    </group>
  );
}
