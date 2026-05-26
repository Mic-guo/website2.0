import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { build as esbuildBundle } from "esbuild";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Three.js r152+ removed these exports. @splinetool/loader still imports them.
const REMOVED_CONSTANTS = { LinearEncoding: 3000, sRGBEncoding: 3001, GammaEncoding: 3007 };
const REMOVED_CLASSES = { WebGLMultipleRenderTargets: "WebGLRenderTarget" };

function patchRemovedThreeExports(code) {
  return code.replace(
    /import\s*\{([^}]+)\}\s*from\s*["']three["'];/g,
    (match, importList) => {
      const consts = [];
      const classImports = [];
      const keep = [];
      for (const part of importList.split(",")) {
        const trimmed = part.trim();
        if (!trimmed) continue;
        const aliasMatch = trimmed.match(/^(\w+)\s+as\s+([\$\w]+)$/);
        const origName = aliasMatch ? aliasMatch[1] : trimmed;
        const localName = aliasMatch ? aliasMatch[2] : trimmed;
        if (origName in REMOVED_CONSTANTS) {
          consts.push(`const ${localName} = ${REMOVED_CONSTANTS[origName]};`);
        } else if (origName in REMOVED_CLASSES) {
          classImports.push(`${REMOVED_CLASSES[origName]} as ${localName}`);
        } else {
          keep.push(part);
        }
      }
      const lines = [];
      if (keep.length > 0) lines.push(`import {${keep.join(",")}} from "three";`);
      if (classImports.length > 0) lines.push(`import {${classImports.join(",")}} from "three";`);
      lines.push(...consts);
      return lines.join("\n");
    }
  );
}

// @splinetool/loader's physical NodeMaterial fragment shader inlines a roughness
// calc that references `geometryNormal` before lights_fragment_begin declares it.
// At that point in the shader, `normal` is semantically identical (it's the
// geometric normal before any normal-map perturbation), so swap the reference.
function patchSplineGlslCompat(code) {
  return code.replace(
    /vec3 dxy = max\( abs\( dFdx\( geometryNormal \) \), abs\( dFdy\( geometryNormal \) \) \)/g,
    "vec3 dxy = max( abs( dFdx( normal ) ), abs( dFdy( normal ) ) )"
  );
}

// esbuild plugin used by Vite's optimizeDeps (dev mode): patches SplineLoader.js
// before esbuild sees it so the missing export errors never fire.
const splineThreeCompatEsbuildPlugin = {
  name: "spline-three-compat",
  setup(build) {
    build.onLoad({ filter: /SplineLoader\.js$/ }, (args) => {
      let code = readFileSync(args.path, "utf8");
      code = patchRemovedThreeExports(code);
      code = patchSplineGlslCompat(code);
      return { contents: code, loader: "js" };
    });
  },
};

// Rollup 4 (Vite 6) cannot analyze @splinetool/loader's class-body variable
// patterns. Pre-bundle the entire Spline tree with esbuild (which handles it
// fine) so Rollup only sees a single clean ESM file.
const splinePreBundle = {
  name: "spline-pre-bundle",
  enforce: "pre",
  apply: "build",
  async resolveId(id) {
    if (id === "@splinetool/r3f-spline") return "\0spline-bundled";
  },
  async load(id) {
    if (id !== "\0spline-bundled") return;
    const shimPath = path.resolve(__dirname, "src/shims/BufferGeometryUtils.js");
    const result = await esbuildBundle({
      entryPoints: ["@splinetool/r3f-spline"],
      bundle: true,
      format: "esm",
      target: "esnext",
      platform: "browser",
      write: false,
      external: ["react", "three", "@react-three/fiber"],
      nodePaths: [path.resolve(__dirname, "node_modules")],
      alias: { "three/examples/jsm/utils/BufferGeometryUtils.js": shimPath },
      plugins: [splineThreeCompatEsbuildPlugin],
    });
    return patchSplineGlslCompat(patchRemovedThreeExports(result.outputFiles[0].text));
  },
};

export default defineConfig({
  plugins: [tailwindcss(), react(), splinePreBundle],
  base: "/",
  server: {
    port: 8000,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "three/webgpu": path.resolve(__dirname, "node_modules/three/build/three.webgpu.js"),
      "three/tsl": path.resolve(__dirname, "node_modules/three/build/three.tsl.js"),
      "three/examples/jsm/utils/BufferGeometryUtils.js": path.resolve(__dirname, "src/shims/BufferGeometryUtils.js"),
    },
  },
  optimizeDeps: {
    include: ["three"],
    exclude: ["@dimforge/rapier3d-compat"],
    esbuildOptions: {
      plugins: [splineThreeCompatEsbuildPlugin],
    },
  },
  assetsInclude: ["**/*.splinecode", "**/*.glb", "**/*.jpeg"],
  publicDir: "public",
});
