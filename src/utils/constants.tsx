// Base position of the house model
export const MODEL_BASE_POSITION = {
  x: 39.23,
  y: 2427.88,
  z: 306.66,
};

export const CAMERA_OFFSET = {
  x: -1500,
  y: 700,
  z: 3000,
};

export const CAMERA_ANIMATION_OFFSET = {
  y: 1000, // How much higher the camera starts
  z: -1000, // How much further back the camera starts
};

export const CameraPositions = {
  LANDING_PAGE: "LANDING_PAGE",
  HOUSE_SCENE: "HOUSE_SCENE",
  FOCUSED_VIEW: "FOCUSED_VIEW",
  POLAROID: "POLAROID",
} as const;
