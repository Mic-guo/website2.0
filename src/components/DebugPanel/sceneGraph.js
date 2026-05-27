// Helpers for representing/locating three.js objects by a stable scene-graph
// path string. Shared between SceneEditor (which writes paths into the store)
// and SelectionInspector / override applier (which read them back).

// Token for an unnamed child. NOT stable across reloads (uses runtime `id`)
// but stable within a session. Most objects in this scene have names, so
// this fallback is rare.
const unnamedToken = (obj) => `[${obj.type}#${obj.id}]`;

const nameOf = (obj) => obj.name || unnamedToken(obj);

// Build a path from a target object up to (but excluding) the given root.
// Returns a slash-joined string of names: e.g. "Scene/Roof layer/Chimney".
export function buildPath(target, root) {
  const names = [];
  let cur = target;
  while (cur && cur !== root) {
    names.unshift(nameOf(cur));
    cur = cur.parent;
  }
  return names.join("/");
}

// Walk down from root following the / separated path. Returns null if any
// segment can't be matched (object may not be mounted yet, or got renamed).
export function findByPath(root, path) {
  if (!path) return null;
  const parts = path.split("/");
  let cur = root;
  for (const part of parts) {
    if (!cur || !cur.children) return null;
    const next = cur.children.find((c) => nameOf(c) === part);
    if (!next) return null;
    cur = next;
  }
  return cur;
}

// Find the nearest ancestor of `obj` whose .name is set. Falls back to obj
// itself if no named ancestor exists before root. Helps Alt+click target the
// "natural" thing — meshes typically have names in this scene, but if some
// nested unnamed group is hit, we don't want to leave the user stranded on
// an `[Object3D#42]` selection.
export function nearestNamedAncestor(obj, root) {
  let cur = obj;
  while (cur && cur !== root) {
    if (cur.name) return cur;
    cur = cur.parent;
  }
  return obj;
}
