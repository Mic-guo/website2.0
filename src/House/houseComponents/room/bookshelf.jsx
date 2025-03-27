import * as THREE from "three";
import Tv from "./bookshelf_items/tv";
import StandingPlant from "./bookshelf_items/standingPlant";
import Camera from "./bookshelf_items/camera";
import Pig from "./bookshelf_items/pig";
import Totoro from "./bookshelf_items/totoro";
import Polaroid from "./bookshelf_items/polaroid";

export default function Bookshelf({ nodes, materials }) {
  return (
    <group
      name="bookshelf_open"
      position={[-49.14, -245.2, -350.42]}
      scale={[0.81, 0.87, 0.81]}
    >
      <Tv nodes={nodes} materials={materials} />
      <group
        name="Items"
        position={[18.85, 290.97, 35.36]}
        scale={[1.22, 1.15, 1.23]}
      >
        <StandingPlant nodes={nodes} materials={materials} />
        <Camera nodes={nodes} materials={materials} />
        <Pig nodes={nodes} materials={materials} />
        <Totoro nodes={nodes} materials={materials} />
        <Polaroid nodes={nodes} materials={materials} />
        <group
          name="Clock Digital"
          position={[140.3, -230.03, -31.21]}
          scale={[0.1, 0.12, 0.1]}
        >
          <mesh
            name="Rectangle6"
            geometry={nodes.Rectangle6.geometry}
            material={materials["Rectangle6 Material"]}
            castShadow
            receiveShadow
            position={[-0.71, 31.69, -78.32]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={0.48}
          />
          <mesh
            name="button_side 2"
            geometry={nodes["button_side 2"].geometry}
            material={materials["button_side 2 Material"]}
            castShadow
            receiveShadow
            position={[-206.15, 84.88, 7.74]}
            scale={[0.04, 0.35, 0.37]}
          />
          <group
            name="button1"
            position={[1.33, 158.34, 8.45]}
            rotation={[0, 0, 0]}
            scale={0.13}
          >
            <mesh
              name="Rectangle 32"
              geometry={nodes["Rectangle 32"].geometry}
              material={materials["Rectangle 32 Material"]}
              position={[-0.09, 66.83, -51.92]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              scale={[1.31, 0.25, 1.68]}
            />
            <mesh
              name="Cylinder8"
              geometry={nodes.Cylinder8.geometry}
              material={materials["Cylinder8 Material"]}
              position={[0.02, 64.7, 0.02]}
              rotation={[Math.PI, -0.21, Math.PI]}
              scale={1}
            />
          </group>
          <mesh
            name="sun"
            geometry={nodes.sun.geometry}
            material={materials["sun Material"]}
            castShadow
            receiveShadow
            position={[178.22, 140.33, 79.06]}
          />
          <mesh
            name="(light)"
            geometry={nodes["(light)"].geometry}
            material={materials["(light) Material"]}
            castShadow
            receiveShadow
            position={[6.13, 84.77, 80.44]}
          />
          <group
            name="button_left"
            position={[113.69, 169.75, 7.35]}
            scale={0.48}
          >
            <mesh
              name="Cube 48"
              geometry={nodes["Cube 48"].geometry}
              material={materials["Cube 48 Material"]}
              castShadow
              receiveShadow
              position={[0, 1.07, -0.4]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[0.54, 2.28, 0.15]}
            />
            <mesh
              name="Cube 29"
              geometry={nodes["Cube 29"].geometry}
              material={materials["Cube 29 Material"]}
              castShadow
              receiveShadow
              position={[0, -0.98, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[0.58, 2.34, 0.15]}
            />
          </group>
          <group
            name="button_right"
            position={[-110.01, 169.75, 7.35]}
            scale={0.48}
          >
            <mesh
              name="Cube 49"
              geometry={nodes["Cube 49"].geometry}
              material={materials["Cube 49 Material"]}
              castShadow
              receiveShadow
              position={[0, 1.07, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[0.54, 2.28, 0.15]}
            />
            <mesh
              name="Cube 210"
              geometry={nodes["Cube 210"].geometry}
              material={materials["Cube 210 Material"]}
              castShadow
              receiveShadow
              position={[0, -0.98, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[0.58, 2.34, 0.15]}
            />
          </group>
          <mesh
            name="screen2"
            geometry={nodes.screen2.geometry}
            material={materials["screen2 Material"]}
            castShadow
            receiveShadow
            position={[-4.83, 82.53, 64.93]}
            scale={[0.46, 0.43, 0.46]}
          />
          <mesh
            name="border"
            geometry={nodes.border.geometry}
            material={materials["border Material"]}
            castShadow
            receiveShadow
            position={[-5.07, 82.01, 77.49]}
            scale={0.48}
          />
          <mesh
            name="clock"
            geometry={nodes.clock.geometry}
            material={materials["clock Material"]}
            castShadow
            receiveShadow
            position={[1.47, 85.68, 7.74]}
            scale={[1.24, 0.51, 0.51]}
          />
        </group>
        <group
          name="Bear Small"
          position={[-120.22, -216.91, -23.78]}
          rotation={[0, 0.24, 0]}
          scale={0.15}
        >
          <group
            name="magnifier"
            position={[-51.52, 122.73, 88.86]}
            rotation={[0.17, 0.61, 0]}
            scale={0.93}
          >
            <mesh
              name="Cylinder9"
              geometry={nodes.Cylinder9.geometry}
              material={materials["Cylinder9 Material"]}
              castShadow
              receiveShadow
              position={[19.86, 5.8, 0]}
              rotation={[2.14, -0.82, 1.25]}
              scale={1.18}
            />
            <mesh
              name="Rectangle 18"
              geometry={nodes["Rectangle 18"].geometry}
              material={materials["Rectangle 18 Material"]}
              castShadow
              receiveShadow
              position={[-35.26, -40.72, -30.21]}
              rotation={[-0.57, -0.7, -1.28]}
              scale={1.18}
            />
          </group>
          <mesh
            name="Cube 38"
            geometry={nodes["Cube 38"].geometry}
            material={materials["Cube 38 Material"]}
            castShadow
            receiveShadow
            position={[-103.44, 75.76, 69.57]}
            rotation={[-1.54, -0.97, -1.24]}
            scale={0.97}
          />
          <mesh
            name="Cube 211"
            geometry={nodes["Cube 211"].geometry}
            material={materials["Cube 211 Material"]}
            castShadow
            receiveShadow
            position={[2.91, 76.39, -23.94]}
            rotation={[0, 0, 0.11]}
            scale={[1.73, 1.21, 1.21]}
          />
          <mesh
            name="Rectangle 42"
            geometry={nodes["Rectangle 42"].geometry}
            material={materials["Rectangle 42 Material"]}
            castShadow
            receiveShadow
            position={[72.6, 92.57, 65.93]}
            rotation={[0.07, 0.34, -0.2]}
            scale={1.21}
          />
          <mesh
            name="Rectangle 33"
            geometry={nodes["Rectangle 33"].geometry}
            material={materials["Rectangle 33 Material"]}
            castShadow
            receiveShadow
            position={[-74.07, 90.55, 64.66]}
            rotation={[-0.1, -0.16, -0.23]}
            scale={1.21}
          />
          <mesh
            name="Rectangle 43"
            geometry={nodes["Rectangle 43"].geometry}
            material={materials["Rectangle 43 Material"]}
            castShadow
            receiveShadow
            position={[87.77, 94.75, 61.53]}
            rotation={[0.07, 0.36, -0.2]}
            scale={1.21}
          />
          <mesh
            name="Rectangle 23"
            geometry={nodes["Rectangle 23"].geometry}
            material={materials["Rectangle 23 Material"]}
            castShadow
            receiveShadow
            position={[-59.21, 92.41, 68.1]}
            rotation={[-0.1, -0.16, -0.23]}
            scale={1.21}
          />
          <mesh
            name="Shape 2"
            geometry={nodes["Shape 2"].geometry}
            material={materials["Shape 2 Material"]}
            castShadow
            receiveShadow
            position={[-100.85, 171.89, -13.12]}
            rotation={[-0.2, 0.02, 1.05]}
            scale={1.21}
          />
          <mesh
            name="Shape"
            geometry={nodes.Shape.geometry}
            material={materials["Shape Material"]}
            castShadow
            receiveShadow
            position={[71.54, 204.83, -16.9]}
            rotation={[-0.22, -0.03, -0.46]}
            scale={1.21}
          />
          <mesh
            name="Sphere8"
            geometry={nodes.Sphere8.geometry}
            material={materials["Sphere8 Material"]}
            castShadow
            receiveShadow
            position={[5.55, 116.04, 74.77]}
            rotation={[-0.35, 0.02, 0.06]}
            scale={1.21}
          />
          <mesh
            name="Ellipse 22"
            geometry={nodes["Ellipse 22"].geometry}
            material={materials["Ellipse 22 Material"]}
            castShadow
            receiveShadow
            position={[39.35, 136.11, 67.56]}
            rotation={[-0.24, 0.11, -0.42]}
            scale={1.21}
          />
          <mesh
            name="Ellipse1"
            geometry={nodes.Ellipse1.geometry}
            material={materials["Ellipse1 Material"]}
            castShadow
            receiveShadow
            position={[-34.64, 131.65, 69.02]}
            rotation={[-0.29, -0.13, -0.45]}
            scale={1.21}
          />
        </group>
      </group>
      <mesh
        name="bookshelf_open1"
        geometry={nodes.bookshelf_open1.geometry}
        material={materials.dark_brown}
        castShadow
        receiveShadow
        position={[0, 226.11, 0]}
      />
      <group
        name="book_big"
        position={[189.66, 177.72, -0.13]}
        rotation={[1.62, 0.2, -1.64]}
        scale={[0.72, 0.71, 0.64]}
      >
        <mesh
          name="Cube 212"
          geometry={nodes["Cube 212"].geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[2.39, 13.84, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[1.15, 1.05, 10.57]}
        />
        <mesh
          name="Cube7"
          geometry={nodes.Cube7.geometry}
          material={materials.red}
          castShadow
          receiveShadow
          position={[2.47, 11.64, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.23, 1.71, 0.22]}
        />
      </group>
      <group
        name="book"
        position={[247.33, 180.97, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.23, 0.18, 0.23]}
      >
        <mesh
          name="paper2"
          geometry={nodes.paper2.geometry}
          material={materials.paper}
          castShadow
          receiveShadow
          position={[39.79, 38.2, -9.98]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.81, 2.91, 1.67]}
        />
        <mesh
          name="coverback1"
          geometry={nodes.coverback1.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.4, 0, -36.42]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 2.79]}
        />
        <mesh
          name="darkpart"
          geometry={nodes.darkpart.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[-141.29, 0, -1.26]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={[3.66, 2.91, 5.27]}
        />
        <mesh
          name="coverfront1"
          geometry={nodes.coverfront1.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[1.72, 0, 36.01]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 3.2]}
        />
      </group>
      <group
        name="book1"
        position={[228.07, 180.97, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.23, 0.18, 0.23]}
      >
        <mesh
          name="paper3"
          geometry={nodes.paper3.geometry}
          material={materials.paper}
          castShadow
          receiveShadow
          position={[39.79, 38.2, -9.98]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.81, 2.91, 1.67]}
        />
        <mesh
          name="coverback2"
          geometry={nodes.coverback2.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.4, 0, -36.42]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 2.79]}
        />
        <mesh
          name="darkpart1"
          geometry={nodes.darkpart1.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[-141.29, 0, -1.26]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={[3.66, 2.91, 5.27]}
        />
        <mesh
          name="coverfront2"
          geometry={nodes.coverfront2.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[1.72, 0, 36.01]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 3.2]}
        />
      </group>
      <group
        name="book_big1"
        position={[-13.5, 56.42, 0]}
        rotation={[1.55, 0.03, -1.57]}
        scale={[0.72, 0.71, 0.64]}
      >
        <mesh
          name="Cube 213"
          geometry={nodes["Cube 213"].geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[2.39, 13.84, 0]}
          rotation={[0, 0, -Math.PI]}
          scale={[1.15, 1.05, 10.57]}
        />
        <mesh
          name="Cube8"
          geometry={nodes.Cube8.geometry}
          material={materials.red}
          castShadow
          receiveShadow
          position={[2.47, 11.64, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[1.23, 1.71, 0.22]}
        />
      </group>
      <group
        name="book stack"
        position={[-129.12, 34.31, -2.24]}
        scale={[1, 1.2, 0.69]}
      >
        <group name="book_mid" position={[0, -7.75, 0]} scale={1.23}>
          <mesh
            name="Cube 214"
            geometry={nodes["Cube 214"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[0.7, 6.37, 0]}
            rotation={[0, 0, -Math.PI]}
            scale={[0.87, 0.87, 8.01]}
          />
          <mesh
            name="Cube9"
            geometry={nodes.Cube9.geometry}
            material={materials.gold}
            castShadow
            receiveShadow
            position={[0.77, 5.12, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.93, 1.3, 0.18]}
          />
        </group>
        <group name="book_small" position={[0, -7.75, 0]} scale={2.26}>
          <mesh
            name="Cube 215"
            geometry={nodes["Cube 215"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[0.16, 1.6, 0]}
            rotation={[0, 0, -Math.PI]}
            scale={[0.55, 0.71, 5.05]}
          />
          <mesh
            name="Cube10"
            geometry={nodes.Cube10.geometry}
            material={materials.blue}
            castShadow
            receiveShadow
            position={[0.2, 1.29, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.59, 0.82, 0.11]}
          />
        </group>
      </group>
      <group
        name="book 2"
        position={[-29.34, 60.81, 0]}
        rotation={[1.61, 1.44, -1.68]}
        scale={[0.22, 0.19, 0.23]}
      >
        <mesh
          name="paper4"
          geometry={nodes.paper4.geometry}
          material={materials.paper}
          castShadow
          receiveShadow
          position={[39.79, 38.2, -9.98]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.81, 2.91, 1.67]}
        />
        <mesh
          name="coverback3"
          geometry={nodes.coverback3.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.4, 0, -36.42]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 2.79]}
        />
        <mesh
          name="darkpart2"
          geometry={nodes.darkpart2.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[-141.29, 0, -1.26]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={[3.66, 2.91, 5.27]}
        />
        <mesh
          name="coverfront3"
          geometry={nodes.coverfront3.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[1.72, 0, 36.01]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 3.2]}
        />
      </group>
      <group
        name="book2"
        position={[20.41, 59.72, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.23, 0.18, 0.23]}
      >
        <mesh
          name="paper5"
          geometry={nodes.paper5.geometry}
          material={materials.paper}
          castShadow
          receiveShadow
          position={[39.79, 38.2, -9.98]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.81, 2.91, 1.67]}
        />
        <mesh
          name="coverback4"
          geometry={nodes.coverback4.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.4, 0, -36.42]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 2.79]}
        />
        <mesh
          name="darkpart3"
          geometry={nodes.darkpart3.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[-141.29, 0, -1.26]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={[3.66, 2.91, 5.27]}
        />
        <mesh
          name="coverfront4"
          geometry={nodes.coverfront4.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[1.72, 0, 36.01]}
          rotation={[0, 0, -Math.PI]}
          scale={[2.76, 2.91, 3.2]}
        />
      </group>
    </group>
  );
}
