import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Scene from "./PolaroidComponents/Scene";
import RopeWithModels from "./PolaroidComponents/RopeWithModels";
import { useLoadingStore } from "./stores/loadingStore";
import { useTheme } from "../context/ThemeContext";
import useStateStore from "../stores/stateStore";
import NightModeToggle from "../components/NightModeToggle";
import useUIStore from "../stores/UIStore";
import useNavigationHandler from "../controllers/navigationHandler";

// This component handles the physics simulation within the Canvas context
function PhysicsSimulation({ physicsWorld }) {
  useFrame((state, delta) => {
    if (physicsWorld) {
      physicsWorld.stepSimulation(delta, 10);
    }
  });
  return null;
}

function LoadingScreen({ progress }) {
  const theme = useTheme();

  return (
    <div
      className={`fixed inset-0 ${
        theme.background
      } flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className={`${theme.fontLeiko} ${theme.textPrimary} text-4xl mb-8`}>
        Loading Experience
      </h1>
      <div className="w-64 h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${theme.textSecondary} bg-current transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={`${theme.textSecondary} mt-4`}>{Math.round(progress)}%</p>
    </div>
  );
}

function PolaroidLine() {
  const theme = useTheme();
  const [isPhysicsReady, setPhysicsReady] = useState(false);
  const physicsWorldRef = useRef(null);
  const { totalProgress } = useLoadingStore();
  const { currentState, pushState } = useStateStore();
  const { handleExitNavigationState } = useNavigationHandler();
  const { isNightMode } = useUIStore();

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

  useEffect(() => {
    console.log("totalProgress updated:", totalProgress);
  }, [totalProgress]);

  // Handle reload on /polaroid page with no previous navigation state
  useEffect(() => {
    if (currentState !== "polaroid") {
      pushState("polaroid");
    } else {
      console.log("currentState is polaroid");
    }
  }, []);

  // Define rope positions
  const ropePositions = useMemo(() => [4.5, 2, -0.5], []);

  return (
    <div className={`h-screen w-screen relative ${theme.background}`}>
      <LoadingScreen progress={totalProgress * 100} />

      {/* Back Button */}
      <button
        onClick={handleExitNavigationState}
        className={`
          absolute top-5 left-5
          p-3 rounded-full border-none
          bg-white/40 hover:bg-white/60 cursor-none
          z-[1000] backdrop-blur-sm
          flex items-center justify-center
          w-12 h-12 shadow-md
          ${isNightMode ? "text-[#fed77b]" : "text-[#6a5f4b]"}
        `}
      >
        ←
      </button>

      {/* Night Mode Toggle */}
      <NightModeToggle />

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

export default PolaroidLine;
