import { forwardRef, useEffect } from "react";
import useHoverStore from "../../../../stores/hoverStore";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import useNavigationHandler from "../../../../components/controllers/navigationHandler";

const Polaroid = forwardRef(function Polaroid({ nodes, materials }, ref) {
  const navigate = useNavigate();
  const { hoveredItem } = useHoverStore();
  const { handleEnterNavigationState } = useNavigationHandler();
  const isHovered = hoveredItem === "polaroid";

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.scale, {
        x: isHovered ? 0.09 : 0.07,
        y: isHovered ? 0.09 : 0.07,
        z: isHovered ? 0.09 : 0.07,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isHovered, ref]);

  return (
    <>
      <group
        ref={ref}
        name="Polaroid"
        position={[91.11, 31.52, -24.49]}
        rotation={[-Math.PI, 0.13, -Math.PI]}
        scale={0.07}
        onClick={(e) => {
          e.stopPropagation();
          handleEnterNavigationState("polaroid");
        }}
      >
        <group
          name="Group2"
          position={[0, 185.05, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
        >
          <group name="Picture" position={[-6.23, -90.46, 76.01]}>
            <mesh
              name="Rectangle5"
              geometry={nodes.Rectangle5.geometry}
              material={materials["Rectangle5 Material"]}
              castShadow
              receiveShadow
              position={[0, 1.67, -22.96]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1}
            />
            <mesh
              name="Cube8"
              geometry={nodes.Cube8.geometry}
              material={materials["Cube8 Material"]}
              castShadow
              receiveShadow
              position={[0, -0.67, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1}
            />
          </group>
          <mesh
            name="Red Button 3"
            geometry={nodes["Red Button 3"].geometry}
            material={materials["Red Button 3 Material"]}
            castShadow
            receiveShadow
            position={[-116.67, 127.09, -70.31]}
            rotation={[-0.75, 0, 0]}
            scale={1}
          />
          <mesh
            name="Red Button 2"
            geometry={nodes["Red Button 2"].geometry}
            material={materials["Red Button 2 Material"]}
            castShadow
            receiveShadow
            position={[-54.04, 157.73, 55.91]}
          />
          <mesh
            name="Screen Button"
            geometry={nodes["Screen Button"].geometry}
            material={materials["Screen Button Material"]}
            castShadow
            receiveShadow
            position={[-146.48, 129.62, -72.88]}
            rotation={[-2.3, 0, 0]}
            scale={1}
          />
          <mesh
            name="Red Button"
            geometry={nodes["Red Button"].geometry}
            material={materials["Red Button Material"]}
            castShadow
            receiveShadow
            position={[-132.44, 147.97, 55.91]}
          />
          <group name="Right Lens" position={[234.23, 12.63, 143.23]}>
            <mesh
              name="Cylinder5"
              geometry={nodes.Cylinder5.geometry}
              material={materials["Cylinder5 Material"]}
              castShadow
              receiveShadow
              position={[-84.15, 81.49, 53.11]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.89}
            />
            <group
              name="Group 3"
              position={[-85.15, 81.49, -31.22]}
              scale={0.89}
            >
              <mesh
                name="Sphere6"
                geometry={nodes.Sphere6.geometry}
                material={materials["Sphere6 Material"]}
                castShadow
                receiveShadow
                position={[0, -0.51, 59.49]}
              />
              <mesh
                name="Cylinder6"
                geometry={nodes.Cylinder6.geometry}
                material={materials["Cylinder6 Material"]}
                castShadow
                receiveShadow
                position={[1.12, 0, 27.81]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={1}
              />
            </group>
            <mesh
              name="Right Lens Border"
              geometry={nodes["Right Lens Border"].geometry}
              material={materials["Right Lens Border Material"]}
              castShadow
              receiveShadow
              position={[-84.27, 79.18, 74.3]}
              scale={[1, 1.01, 1]}
            />
            <mesh
              name="Ellipse 3"
              geometry={nodes["Ellipse 3"].geometry}
              material={materials["Ellipse 3 Material"]}
              castShadow
              receiveShadow
              position={[5.63, 27.5, -0.58]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Rectangle 62"
              geometry={nodes["Rectangle 62"].geometry}
              material={materials["Rectangle 62 Material"]}
              castShadow
              receiveShadow
              position={[5.61, -13, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Rectangle 5"
              geometry={nodes["Rectangle 5"].geometry}
              material={materials["Rectangle 5 Material"]}
              castShadow
              receiveShadow
              position={[-5.63, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </group>
          <group name="Main Lenses" position={[-6.23, 74.96, 115.97]}>
            <mesh
              name="Sphere7"
              geometry={nodes.Sphere7.geometry}
              material={materials["Sphere7 Material"]}
              castShadow
              receiveShadow
              position={[0, -0.51, 51.14]}
            />
            <mesh
              name="Cylinder7"
              geometry={nodes.Cylinder7.geometry}
              material={materials["Cylinder7 Material"]}
              castShadow
              receiveShadow
              position={[0, 0, -1.27]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1}
            />
          </group>
          <mesh
            name="Ellipse 31"
            geometry={nodes["Ellipse 31"].geometry}
            material={materials["Ellipse 31 Material"]}
            castShadow
            receiveShadow
            position={[169.15, 107.17, -198.45]}
            rotation={[Math.PI, 0, 0]}
          />
          <mesh
            name="Ellipse 21"
            geometry={nodes["Ellipse 21"].geometry}
            material={materials["Ellipse 21 Material"]}
            castShadow
            receiveShadow
            position={[163.57, 101.89, -199.03]}
            rotation={[Math.PI, 0, 0]}
          />
          <mesh
            name="Print Inner 1"
            geometry={nodes["Print Inner 1"].geometry}
            material={materials["Print Inner 1 Material"]}
            castShadow
            receiveShadow
            position={[-6.23, -82.19, 275.39]}
            rotation={[0.37, 0, 0]}
            scale={1}
          />
          <mesh
            name="Print Inner 2"
            geometry={nodes["Print Inner 2"].geometry}
            material={materials["Print Inner 2 Material"]}
            castShadow
            receiveShadow
            position={[-6.23, -87.25, 288.49]}
            rotation={[0.37, 0, 0]}
            scale={1}
          />
          <mesh
            name="Viewfinder"
            geometry={nodes.Viewfinder.geometry}
            material={materials["Viewfinder Material"]}
            castShadow
            receiveShadow
            position={[168.42, 109.65, -48.15]}
          />
          <group name="Flash Light" position={[-162.08, 92.33, 216.41]}>
            <mesh
              name="Plane"
              geometry={nodes.Plane.geometry}
              material={materials["Plane Material"]}
              castShadow
              receiveShadow
              position={[0, 1.59, 0.26]}
            />
            <mesh
              name="Flash Lines"
              geometry={nodes["Flash Lines"].geometry}
              material={materials["Flash Lines Material"]}
              castShadow
              receiveShadow
              position={[-54.94, 17.7, 0.65]}
            />
            <mesh
              name="Flash Border"
              geometry={nodes["Flash Border"].geometry}
              material={materials["Flash Border Material"]}
              castShadow
              receiveShadow
              position={[148.66, -89.42, -208.02]}
            />
            <mesh
              name="Ellipse 6"
              geometry={nodes["Ellipse 6"].geometry}
              material={materials["Ellipse 6 Material"]}
              castShadow
              receiveShadow
              position={[34.83, -41.82, 1]}
            />
            <mesh
              name="Ellipse 5"
              geometry={nodes["Ellipse 5"].geometry}
              material={materials["Ellipse 5 Material"]}
              castShadow
              receiveShadow
              position={[9.6, -41.82, 1]}
            />
            <mesh
              name="Ellipse 4"
              geometry={nodes["Ellipse 4"].geometry}
              material={materials["Ellipse 4 Material"]}
              castShadow
              receiveShadow
              position={[-11.79, -41.82, 1]}
            />
            <mesh
              name="Ellipse 32"
              geometry={nodes["Ellipse 32"].geometry}
              material={materials["Ellipse 32 Material"]}
              castShadow
              receiveShadow
              position={[-30.52, -41.82, 1]}
            />
            <mesh
              name="Flash Gradient"
              geometry={nodes["Flash Gradient"].geometry}
              material={materials["Flash Gradient Material"]}
              castShadow
              receiveShadow
              position={[0, 15.57, -0.01]}
            />
            <mesh
              name="Flash Bottom"
              geometry={nodes["Flash Bottom"].geometry}
              material={materials["Flash Bottom Material"]}
              castShadow
              receiveShadow
              position={[0, -44.49, 0.84]}
            />
            <mesh
              name="Flash Gradient Border"
              geometry={nodes["Flash Gradient Border"].geometry}
              material={materials["Flash Gradient Border Material"]}
              castShadow
              receiveShadow
              position={[0, -1.66, -1]}
            />
          </group>
          <mesh
            name="Rainbow"
            geometry={nodes.Rainbow.geometry}
            material={materials["Rainbow Material"]}
            castShadow
            receiveShadow
            position={[-6.23, -1.25, 0.78]}
          />
          <mesh
            name="Cam Body"
            geometry={nodes["Cam Body"].geometry}
            material={materials["Cam Body Material"]}
            castShadow
            receiveShadow
            position={[-6.23, -1.25, 0.78]}
          />
        </group>
      </group>
    </>
  );
});

export default Polaroid;
