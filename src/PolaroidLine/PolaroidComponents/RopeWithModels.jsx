import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  memo,
  useEffect,
} from "react";
import { Model } from "./Model";
import { Rope } from "./Rope";

const RopeWithModels = memo(
  ({ physicsWorld, yOffset, ropeIndex, modelPerRope }) => {
    const ropeSegments = 120;
    const ropeLength = 1;
    const modelOnRopeOffset = (ropeSegments - 1) / modelPerRope;
    const [ropeState, setRopeState] = useState({
      ref: null,
      ready: false,
    });

    // New state to track loaded models
    const [loadedModels, setLoadedModels] = useState([]);

    const handleRopeReady = useCallback(
      ({ softBody, setNodePosition, attachModel }) => {
        console.log(`Rope ${ropeIndex} is ready`);
        setRopeState({
          ref: { softBody, setNodePosition, attachModel },
          ready: true,
        });
      },
      [ropeIndex]
    );

    // Move model creation to useEffect
    useEffect(() => {
      if (!ropeState.ready || !ropeState.ref) {
        return;
      }

      const createModels = async () => {
        const modelArray = [];
        for (let i = 1; i < modelPerRope + 1; i++) {
          const imageIndex = ropeIndex * modelPerRope + i;
          const imagePath =
            imageIndex <= 15
              ? `/images/IMG_00${imageIndex.toString().padStart(2, "0")}.jpeg`
              : null;

          // Add small delay between model creations to ensure progress is updated
          await new Promise((resolve) => setTimeout(resolve, 100));

          modelArray.push(
            <Model
              key={`model-${ropeIndex}-${i}`}
              path="/src/PolaroidLine/models/polaroid_with_material.glb"
              texturePath={imagePath}
              rope={ropeState.ref}
              positionOnRope={i * modelOnRopeOffset - modelOnRopeOffset / 2}
            />
          );

          // Update models one at a time
          setLoadedModels([...modelArray]);
        }
      };

      createModels();
    }, [
      ropeState.ready,
      ropeState.ref,
      ropeIndex,
      modelPerRope,
      modelOnRopeOffset,
    ]);

    return (
      <>
        <Rope
          physicsWorld={physicsWorld}
          yOffset={yOffset}
          onRopeReady={handleRopeReady}
          ropeSegments={ropeSegments}
          ropeLength={ropeLength}
        />
        {loadedModels}
      </>
    );
  }
);

export default RopeWithModels;
