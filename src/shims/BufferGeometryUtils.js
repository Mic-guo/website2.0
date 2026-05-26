// Three.js 0.152+ renamed mergeBufferGeometries → mergeGeometries.
// Uses three/addons (not three/examples) to avoid circular alias via vite.config resolve.alias.
export * from "three/addons/utils/BufferGeometryUtils.js";
export { mergeGeometries as mergeBufferGeometries } from "three/addons/utils/BufferGeometryUtils.js";
