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
import polaroidModel from "../models/polaroid_with_material.glb";
import { useLoadingStore } from "../stores/loadingStore";

const TOTAL_IMAGES = 27;
const images = Object.fromEntries(
  Array.from({ length: TOTAL_IMAGES }, (_, i) => {
    const num = i + 1;
    const path = `/images/IMG_${num}.jpeg`;
    // Validate image path exists in development
    if (import.meta.env.DEV) {
      try {
        new URL(path, window.location.origin);
      } catch (e) {
        console.warn(`Warning: Image path ${path} may not be valid`);
      }
    }
    return [num, path];
  })
);

// Preload images
const preloadImages = () => {
  Object.values(images).forEach((path) => {
    const img = new Image();
    img.onerror = (e) => {
      console.error(`Failed to preload image: ${path}`, e);
    };
    img.onload = () => {
      console.log(`Successfully preloaded: ${path}`);
    };
    img.src = path;
  });
};

const RopeWithModels = memo(
  ({ physicsWorld, yOffset, ropeIndex, modelPerRope }) => {
    const ropeSegments = 120;
    const ropeLength = 1;
    const modelOnRopeOffset = (ropeSegments - 1) / modelPerRope;
    const [ropeState, setRopeState] = useState({
      ref: null,
      ready: false,
    });

    const { setTarget } = useLoadingStore();

    // New state to track loaded models and any errors
    const [loadedModels, setLoadedModels] = useState([]);
    const [imageErrors, setImageErrors] = useState({});

    // Preload images when component mounts
    useEffect(() => {
      preloadImages();
      setTarget(TOTAL_IMAGES);
    }, []);

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

          // Check if image index is valid
          if (imageIndex > TOTAL_IMAGES) {
            console.warn(
              `Warning: Image index ${imageIndex} exceeds total images (${TOTAL_IMAGES})`
            );
            continue;
          }

          const imagePath = images[imageIndex] ?? null;
          if (!imagePath) {
            console.warn(`Warning: No image found for index ${imageIndex}`);
            continue;
          }

          // Add small delay between model creations to ensure progress is updated
          await new Promise((resolve) => setTimeout(resolve, 100));

          try {
            // Verify image exists before creating model
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = (e) => {
                console.error(`Failed to load image: ${imagePath}`, e);
                reject(new Error(`Failed to load image: ${imagePath}`));
              };
              img.src = imagePath;
            });

            modelArray.push(
              <Model
                key={`model-${ropeIndex}-${i}`}
                path={polaroidModel}
                texturePath={imagePath}
                rope={ropeState.ref}
                positionOnRope={i * modelOnRopeOffset - modelOnRopeOffset / 2}
                onError={(error) => {
                  console.error(
                    `Error loading model/texture for image ${imageIndex}:`,
                    error
                  );
                  setImageErrors((prev) => ({
                    ...prev,
                    [imageIndex]: error.message,
                  }));
                }}
              />
            );

            // Update models one at a time
            setLoadedModels([...modelArray]);
          } catch (error) {
            console.error(
              `Error creating model for image ${imageIndex}:`,
              error
            );
          }
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
