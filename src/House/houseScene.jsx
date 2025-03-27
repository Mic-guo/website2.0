import useSpline from "@splinetool/r3f-spline";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import sceneFile from "./utils/scene.splinecode?url";
import Roof from "./houseComponents/roof";
import SidesBase from "./houseComponents/sides+base";
import Desk from "./houseComponents/room/desk";
import SpeakerLight from "./houseComponents/room/speakerLight";
import Calendar from "./houseComponents/room/calendar";
import Bookshelf from "./houseComponents/room/bookshelf";
import { NightMode } from "./NighttimeScene";
import { DayMode } from "./DaytimeScene";
import Snow from "./Snow";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(sceneFile);

  return (
    <>
      {/* <DayMode /> */}
      <NightMode />
      {/* <color attach="background" args={["#030b1c"]} />
      <ambientLight intensity={0.05} />
      <directionalLight intensity={0.05} position={[-10, 30, 10]} /> */}

      <Snow />

      <group {...props} dispose={null}>
        <scene name="Scene">
          <Roof nodes={nodes} />
          <SidesBase nodes={nodes} />
          <group
            name="Second Floor"
            position={[23.93, 2161.9, 338.54]}
            scale={[2.6, 2.71, 2.62]}
          >
            <Desk nodes={nodes} materials={materials} />
            <SpeakerLight nodes={nodes} materials={materials} />
            <Calendar nodes={nodes} materials={materials} />
            <Bookshelf nodes={nodes} materials={materials} />
          </group>
        </scene>
      </group>
    </>
  );
}
