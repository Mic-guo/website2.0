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
import { NightMode } from "./sceneEffects/NighttimeScene";
import { DayMode } from "./sceneEffects/DaytimeScene";
import Snow from "./sceneEffects/Snow";

export default function Scene({ isNightMode, ...props }) {
  const { nodes, materials } = useSpline(sceneFile);

  return (
    <>
      {isNightMode ? (
        <NightMode />
      ) : (
        <>
          <DayMode />
          <Snow />
        </>
      )}

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
