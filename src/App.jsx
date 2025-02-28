import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import Scene from "./components/Scene";
import RopeWithModels from "./RopeWithModels";

// This component handles the physics simulation within the Canvas context
function PhysicsSimulation({ physicsWorld }) {
  useFrame((state, delta) => {
    if (physicsWorld) {
      physicsWorld.stepSimulation(delta, 10);
    }
  });
  return null;
}

function App() {
  const [isPhysicsReady, setPhysicsReady] = React.useState(false);
  const physicsWorldRef = useRef(null);

  // Initialize Ammo.js and physics world
  useEffect(() => {
    let worldInstance = null; // Store world reference in closure

    const initPhysics = async () => {
      try {
        await Ammo();
        const collisionConfiguration =
          new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
        const dispatcher = new Ammo.btCollisionDispatcher(
          collisionConfiguration
        );
        const broadphase = new Ammo.btDbvtBroadphase();
        const solver = new Ammo.btSequentialImpulseConstraintSolver();
        const softBodySolver = new Ammo.btDefaultSoftBodySolver();

        worldInstance = new Ammo.btSoftRigidDynamicsWorld(
          dispatcher,
          broadphase,
          solver,
          collisionConfiguration,
          softBodySolver
        );

        worldInstance.setGravity(new Ammo.btVector3(0, -9.8, 0));
        physicsWorldRef.current = worldInstance;
        setPhysicsReady(true);
        console.log("Physics world initialized");
      } catch (error) {
        // console.error("Ammo.js initialization error:", error);
      }
    };

    initPhysics();

    return () => {
      if (worldInstance) {
        try {
          Ammo.destroy(worldInstance);
          physicsWorldRef.current = null;
          setPhysicsReady(false);
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      }
    };
  }, []);

  // Define rope positions
  const ropePositions = useMemo(() => [4.5, 2, -0.5], []);

  return (
    <div className="h-screen w-screen">
      <Scene devMode={false}>
        <PhysicsSimulation physicsWorld={physicsWorldRef.current} />
        {isPhysicsReady && physicsWorldRef.current && (
          <>
            {ropePositions.map((yOffset, ropeIndex) => (
              <RopeWithModels
                key={`rope-${ropeIndex}`}
                physicsWorld={physicsWorldRef.current}
                yOffset={yOffset}
                ropeIndex={ropeIndex}
                modelPerRope={7}
              />
            ))}
          </>
        )}
      </Scene>
    </div>
  );
}

export default App;
