import { useRef, useEffect } from 'react'
import { initIceCubesScene } from './IceCubesScene.js'

export default function IceCubes() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroy = null

    initIceCubesScene(container).then((cleanup) => {
      destroy = cleanup
    })

    return () => {
      destroy?.()
    }
  }, [])

  return <div ref={containerRef} className="w-screen h-screen overflow-hidden" />
}
