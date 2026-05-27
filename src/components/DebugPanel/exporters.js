// Strip the store's action functions and return only the section blobs that
// match the DEFAULTS shape in debugStore.jsx.
const PERSISTED_KEYS = [
  "orbit",
  "camera",
  "dayLighting",
  "nightLighting",
  "daySky",
  "nightSky",
  "stars",
  "snow",
  "speakerLight",
  "overrides",
];

const pickPersisted = (state) =>
  Object.fromEntries(PERSISTED_KEYS.map((k) => [k, state[k]]));

export function toJSON(state) {
  return JSON.stringify(pickPersisted(state), null, 2);
}

// Format helpers --------------------------------------------------------------

// Round to at most 4 decimals so the JSX output stays scannable.
const num = (v) => {
  if (typeof v !== "number" || Number.isNaN(v)) return v;
  return Number.isInteger(v) ? v : Number(v.toFixed(4));
};

const arr3 = (a) => `[${num(a[0])}, ${num(a[1])}, ${num(a[2])}]`;

const piExpr = (v) => {
  // Detect common multiples of PI so the JSX output reads more naturally.
  if (Math.abs(v - Math.PI / 2) < 1e-4) return "Math.PI / 2";
  if (Math.abs(v - Math.PI / 4) < 1e-4) return "Math.PI / 4";
  if (Math.abs(v - Math.PI / 3) < 1e-4) return "Math.PI / 3";
  if (Math.abs(v - Math.PI / 6) < 1e-4) return "Math.PI / 6";
  if (Math.abs(v - Math.PI) < 1e-4) return "Math.PI";
  return String(num(v));
};

// JSX templates --------------------------------------------------------------
// Each block mirrors the layout of the actual source file as closely as
// possible so a user can just paste the section over the existing one.

function orbitJSX(s) {
  return `// src/House/House.jsx — OrbitControls
<OrbitControls
  enableZoom={isZoomedIn ? true : false}
  maxZoom={${num(s.orbit.maxZoom)}}
  minZoom={${num(s.orbit.minZoom)}}
  enableRotate={true}
  enablePan={false}
  enableDamping={true}
  dampingFactor={${num(s.orbit.dampingFactor)}}
  rotateSpeed={${num(s.orbit.rotateSpeed)}}
  mouseWheelSpeed={${num(s.orbit.mouseWheelSpeed)}}
  target={${arr3(s.orbit.target)}}
  maxPolarAngle={${piExpr(s.orbit.maxPolarAngle)}}
  minPolarAngle={${piExpr(s.orbit.minPolarAngle)}}
  maxAzimuthAngle={isZoomedIn ? 0 : Infinity}
  minAzimuthAngle={isZoomedIn ? -(Math.PI / 2) : -Infinity}
/>`;
}

function cameraJSX(s) {
  return `// src/utils/constants.tsx — camera offsets
export const CAMERA_OFFSET = {
  x: ${num(s.camera.offset[0])},
  y: ${num(s.camera.offset[1])},
  z: ${num(s.camera.offset[2])},
};

export const CAMERA_ANIMATION_OFFSET = {
  y: ${num(s.camera.animationOffset[1])},
  z: ${num(s.camera.animationOffset[2])},
};

// src/House/House.jsx — OrthographicCamera zoom
<OrthographicCamera ... zoom={${num(s.camera.zoom)}} ... />`;
}

function dayLightingJSX(s) {
  const { ambient, directional, point } = s.dayLighting;
  return `// src/House/sceneEffects/DaytimeScene.jsx — DayLighting
<ambientLight intensity={${num(ambient.intensity)}} color="${ambient.color}" />
<directionalLight
  intensity={${num(directional.intensity)}}
  position={${arr3(directional.position)}}
  color="${directional.color}"
  castShadow
/>
<pointLight intensity={${num(point.intensity)}} position={${arr3(
    point.position
  )}} color="${point.color}" />`;
}

function nightLightingJSX(s) {
  const { ambient, directional } = s.nightLighting;
  return `// src/House/sceneEffects/NighttimeScene.jsx — NightLighting
<ambientLight intensity={${num(ambient.intensity)}} color="${ambient.color}" />
<directionalLight
  intensity={${num(directional.intensity)}}
  position={${arr3(directional.position)}}
  color="${directional.color}"
  castShadow
/>`;
}

function daySkyJSX(s) {
  return `// src/House/sceneEffects/DaytimeScene.jsx — SunsetSky gradient
gradient.addColorStop(${num(s.daySky.stop1.offset)}, "${s.daySky.stop1.color}");
gradient.addColorStop(${num(s.daySky.stop2.offset)}, "${s.daySky.stop2.color}");`;
}

function nightSkyJSX(s) {
  return `// src/House/sceneEffects/NighttimeScene.jsx — NighttimeSky gradient
gradient.addColorStop(${num(s.nightSky.stop1.offset)}, "${s.nightSky.stop1.color}");
gradient.addColorStop(${num(s.nightSky.stop2.offset)}, "${s.nightSky.stop2.color}");
gradient.addColorStop(${num(s.nightSky.stop3.offset)}, "${s.nightSky.stop3.color}");`;
}

function starsJSX(s) {
  return `// src/House/sceneEffects/NighttimeScene.jsx — Stars
const starCount = ${s.stars.count};
// size: Math.random() * (sizeMax - sizeMin) + sizeMin
const STAR_SIZE_MIN = ${num(s.stars.sizeMin)};
const STAR_SIZE_MAX = ${num(s.stars.sizeMax)};
const STAR_COLOR = "${s.stars.color}";`;
}

function snowJSX(s) {
  return `// src/House/sceneEffects/Snow.jsx
const NUM_PARTICLES = ${s.snow.count};
const SPREAD_RANGE = ${num(s.snow.spreadRange)};
const HEIGHT_RANGE = ${num(s.snow.heightRange)};

<pointsMaterial
  size={${num(s.snow.size)}}
  color="${s.snow.color}"
  transparent
  opacity={${num(s.snow.opacity)}}
  sizeAttenuation
/>`;
}

function overridesJSX(s) {
  const overrides = s.overrides || {};
  const paths = Object.keys(overrides);
  if (paths.length === 0) {
    return `// Transform Overrides — none. Alt+click a 3D object to start tweaking.`;
  }
  const blocks = paths.map((path) => {
    const ov = overrides[path];
    const lines = [`// ${path}`];
    if (ov.position) lines.push(`position={${arr3(ov.position)}}`);
    if (ov.rotation) lines.push(`rotation={${arr3(ov.rotation)}}`);
    if (ov.scale) {
      const sc = ov.scale;
      if (typeof sc === "number") lines.push(`scale={${num(sc)}}`);
      else if (sc[0] === sc[1] && sc[1] === sc[2])
        lines.push(`scale={${num(sc[0])}}`);
      else lines.push(`scale={${arr3(sc)}}`);
    }
    return lines.join("\n");
  });
  return `// Transform Overrides — paste each block onto the matching JSX node\n${blocks.join(
    "\n\n"
  )}`;
}

function speakerLightJSX(s) {
  const sl = s.speakerLight;
  return `// src/House/houseComponents/room/speakerLight.jsx — pointLight
<pointLight
  name="Point Light"
  castShadow
  intensity={${num(sl.intensity)}}
  decay={${num(sl.decay)}}
  distance={${num(sl.distance)}}
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-camera-near={100}
  shadow-camera-far={100000}
  color="${sl.color}"
  position={[-38.89, 37.83, 2.17]}
  rotation={[0, 0.93, 0.01]}
  scale={0.37}
/>`;
}

export function toJSX(state) {
  return [
    orbitJSX(state),
    cameraJSX(state),
    dayLightingJSX(state),
    nightLightingJSX(state),
    daySkyJSX(state),
    nightSkyJSX(state),
    starsJSX(state),
    snowJSX(state),
    speakerLightJSX(state),
    overridesJSX(state),
  ].join("\n\n// ───────────────────────────────────────────\n\n");
}
