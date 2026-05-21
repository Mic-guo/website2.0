/**
 * Lazily injects /builds/ammo.js into the page and resolves once the global
 * Ammo factory is available. Reuses an in-flight promise so concurrent
 * callers share a single network request.
 *
 * Used by the /polaroid route so the 1.9 MB physics library is never loaded
 * on the landing page.
 */

const SCRIPT_SRC = "/builds/ammo.js";
let ammoScriptPromise = null;

export function loadAmmoScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("ammo.js can only load in the browser"));
  }

  if (window.Ammo) {
    return Promise.resolve(window.Ammo);
  }

  if (ammoScriptPromise) {
    return ammoScriptPromise;
  }

  ammoScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[data-ammo-loader="true"]`
    );
    const script = existing ?? document.createElement("script");
    script.dataset.ammoLoader = "true";
    script.async = true;

    const onLoad = () => {
      if (window.Ammo) {
        resolve(window.Ammo);
      } else {
        reject(new Error("ammo.js loaded but window.Ammo is undefined"));
      }
    };
    const onError = () => {
      ammoScriptPromise = null;
      reject(new Error(`Failed to load ${SCRIPT_SRC}`));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.src = SCRIPT_SRC;
      document.head.appendChild(script);
    } else if (window.Ammo) {
      onLoad();
    }
  });

  return ammoScriptPromise;
}
