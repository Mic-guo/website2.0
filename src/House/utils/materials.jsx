import React from "react";

// Define reusable material components for the house
export const LightWoodMaterial = () => (
  <meshStandardMaterial color="#D6BAA0" roughness={0.7} />
);

export const OffWhiteWallMaterial = () => (
  <meshStandardMaterial color="#FAF9F7" roughness={0.4} />
);

export const StoneGrayMaterial = () => (
  <meshStandardMaterial color="#C8C4C2" metalness={0.5} roughness={0.5} />
);

export const StoneGrayMetallicMaterial = () => (
  <meshStandardMaterial color="#C8C4C2" metalness={0.6} roughness={0.4} />
);

export const LightStoneMaterial = () => (
  <meshStandardMaterial color="#E8E6E5" roughness={0.6} />
);

export const RoofTerracottaMaterial = () => (
  <meshStandardMaterial color="#E7B88C" roughness={0.6} />
);

export const SnowWhiteMaterial = () => (
  <meshStandardMaterial
    color="#FFFFFF"
    roughness={0.3}
    metalness={0.0}
    emissive="#FFFFFF"
    emissiveIntensity={0.4}
  />
);

export const WarmOffWhiteMaterial = () => (
  <meshStandardMaterial color="#F5F5F1" roughness={0.4} />
);

// New materials for the office chair
export const GreyMaterial = () => (
  <meshStandardMaterial color="#AAAAAA" roughness={0.4} />
);

export const GreyDarkerMaterial = () => (
  <meshStandardMaterial color="#666666" roughness={0.5} />
);

export const BlackMaterial = () => (
  <meshStandardMaterial color="#222222" roughness={0.3} />
);

export const MetalMaterial = () => (
  <meshStandardMaterial color="#A0A0A0" metalness={0.7} roughness={0.2} />
);

// New materials for Totoro model
export const UmbrellaTopMaterial = () => (
  <meshStandardMaterial color="#E74C3C" roughness={0.5} />
);

// New materials for books
export const PaperMaterial = () => (
  <meshStandardMaterial color="#F8F6F0" roughness={0.4} />
);

export const BookCoverMaterial = () => (
  <meshStandardMaterial color="#8B4513" roughness={0.5} />
);

export const BookSpineMaterial = () => (
  <meshStandardMaterial color="#5C2E0D" roughness={0.5} />
);
