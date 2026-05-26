import { lazy, Suspense } from "react";

const IceCubes = lazy(() => import("./IceCubes/IceCubes"));

export default function TestPage() {
  return (
    <div className="fixed inset-0">
      <Suspense fallback={null}>
        <IceCubes />
      </Suspense>
    </div>
  );
}
