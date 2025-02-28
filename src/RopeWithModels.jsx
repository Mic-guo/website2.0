import React, { useRef, useCallback, useMemo, useState, memo } from "react";
import { Model } from "./components/Model";
import { Rope } from "./components/Rope";

const RopeWithModels = memo(
  ({ physicsWorld, yOffset, ropeIndex, modelPerRope }) => {
    const ropeSegments = 120;
    const ropeLength = 1;
    const modelOnRopeOffset = (ropeSegments - 1) / modelPerRope;
    const [ropeState, setRopeState] = useState({
      ref: null,
      ready: false,
    });

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

    const models = useMemo(() => {
      if (!ropeState.ready || !ropeState.ref) {
        console.log("Models not rendering: rope state not ready", ropeState);
        return null;
      }

      const modelArray = [];
      for (let i = 1; i < modelPerRope + 1; i++) {
        const imageIndex = ropeIndex * modelPerRope + i;

        const imagePath =
          imageIndex <= 15
            ? `/images/IMG_00${imageIndex.toString().padStart(2, "0")}.jpeg`
            : null;

        modelArray.push(
          <Model
            key={`model-${ropeIndex}-${i}`}
            path="/src/models/polaroid_with_material.glb"
            texturePath={imagePath}
            rope={ropeState.ref}
            positionOnRope={i * modelOnRopeOffset}
          />
        );
      }
      return modelArray;
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
        {models}
      </>
    );
  }
);

// RopeWithModels.displayName = "RopeWithModels";

export default RopeWithModels;
