import RAPIER from '@dimforge/rapier3d-compat'
import * as THREE from 'three/webgpu'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import { TransmissionMaterial } from './TransmissionMaterial.js'
import { FixedTimestep } from './FixedTimestep.js'

export async function initIceCubesScene(container) {
  await RAPIER.init()
  const gravity = new RAPIER.Vector3(0, 0, 0)
  const world = new RAPIER.World(gravity)

  const renderer = new THREE.WebGPURenderer({ antialias: true })
  renderer.toneMapping = THREE.AgXToneMapping
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;'
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  await renderer.init()

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100)
  camera.position.set(0, 0, 6)

  const debugOverlay = document.createElement('div')
  debugOverlay.style.cssText = 'position:fixed;inset:0;z-index:1;display:none;'
  document.body.appendChild(debugOverlay)

  const controls = new OrbitControls(camera, debugOverlay)
  controls.target.set(0, 0, 0)
  controls.update()

  const params = {
    debug: false,
    background: '#ffffff',
    blurMode: 'blue',
    color: '#ffffff',
    transmission: 1,
    thickness: 1,
    roughness: 0.05,
    ior: 1.5,
    dispersion: 5,
    frostBlur: 0.07,
    frostNoiseAmplitude: 0.2,
    frostNoiseFrequency: 0.1,
    attenuationColor: '#ffffff',
    attenuationDistance: 2,
    envMapIntensity: 1,
    iridescence: 2,
    iridescenceIOR: 1,
    iridescenceThicknessMin: 100,
    iridescenceThicknessMax: 400,
    clearcoat: 0,
    clearcoatRoughness: 0,
    specularIntensity: 1,
    specularColor: '#ffffff',
    mouseBallRadius: 0.46,
    wanderStrength: 0.86,
    wanderSpeed: 0.3,
    attractionStrength: 10,
    linearDamping: 1.4,
    angularDamping: 5.08,
    friction: 0.2,
    restitution: 0.14,
    waterDrag: true,
    waterDragCoefficient: 1.19,
    ambientIntensity: 0.6,
    spotIntensity: 200,
  }

  scene.background = new THREE.Color(params.background)

  const ambientLight = new THREE.AmbientLight('#ffffff', params.ambientIntensity)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight('#ffffff', params.spotIntensity, 0, 0.15, 1)
  spotLight.position.set(10, 10, 10)
  scene.add(spotLight)

  function createLightformerEnvMap() {
    const envScene = new THREE.Scene()
    const group = new THREE.Group()
    group.rotation.set(-Math.PI / 3, 0, 1)
    envScene.add(group)

    const circleMat = (intensity) =>
      new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity), side: THREE.DoubleSide })
    const circleGeo = new THREE.CircleGeometry(1, 64)

    const lf1 = new THREE.Mesh(circleGeo, circleMat(4))
    lf1.rotation.x = Math.PI / 2
    lf1.position.set(0, 5, -9)
    lf1.scale.setScalar(2)
    group.add(lf1)

    const lf2 = new THREE.Mesh(circleGeo, circleMat(2))
    lf2.rotation.y = Math.PI / 2
    lf2.position.set(-5, 1, -1)
    lf2.scale.setScalar(2)
    group.add(lf2)

    const lf3 = new THREE.Mesh(circleGeo, circleMat(2))
    lf3.rotation.y = Math.PI / 2
    lf3.position.set(-5, -1, -1)
    lf3.scale.setScalar(2)
    group.add(lf3)

    const lf4 = new THREE.Mesh(circleGeo, circleMat(2))
    lf4.rotation.y = -Math.PI / 2
    lf4.position.set(10, 1, 0)
    lf4.scale.setScalar(8)
    group.add(lf4)

    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envMap = pmremGenerator.fromScene(envScene, 0, 0.1, 100).texture
    pmremGenerator.dispose()
    envScene.clear()
    return envMap
  }

  scene.environment = createLightformerEnvMap()

  // ─── Glass material ─────────────────────────────────────────────────────────

  const glassMaterial = new TransmissionMaterial(params)

  // ─── Donuts with physics ─────────────────────────────────────────────────────

  const torusRadius = 0.55
  const tubeRadius = 0.28
  const geometry = new THREE.TorusGeometry(torusRadius, tubeRadius, 32, 80)

  function createTorusColliders(rigidBody) {
    const segments = 12
    const sphereR = tubeRadius * 0.85
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const cx = Math.cos(angle) * torusRadius
      const cy = Math.sin(angle) * torusRadius
      const desc = RAPIER.ColliderDesc.ball(sphereR)
        .setTranslation(cx, cy, 0)
        .setRestitution(params.restitution)
        .setFriction(params.friction)
      world.createCollider(desc, rigidBody)
    }
    const coreDesc = RAPIER.ColliderDesc.ball(torusRadius * 0.35)
      .setRestitution(params.restitution)
      .setFriction(params.friction)
    world.createCollider(coreDesc, rigidBody)
  }

  const donutStartPositions = [
    [0, 0, 1],
    [2, 1.5, -0.5],
    [-1.8, -1.2, 0.4],
    [1, -1.8, -0.8],
  ]

  const cubeBodies = donutStartPositions.map((pos) => {
    const mesh = glassMaterial.createMesh(geometry)
    mesh.position.set(...pos)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    scene.add(mesh)

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(...pos)
      .setLinearDamping(params.linearDamping)
      .setAngularDamping(params.angularDamping)
    const rigidBody = world.createRigidBody(rigidBodyDesc)
    const q = new THREE.Quaternion().setFromEuler(mesh.rotation)
    rigidBody.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true)
    createTorusColliders(rigidBody)

    return { mesh, rigidBody }
  })

  const wanderSeeds = cubeBodies.map(() => ({
    ox: Math.random() * 1000,
    oy: Math.random() * 1000,
    oz: Math.random() * 1000,
  }))

  // ─── Mouse sphere collider ───────────────────────────────────────────────────

  const raycaster = new THREE.Raycaster()
  const mouseNDC = new THREE.Vector2(-Infinity, -Infinity)

  const raycastSphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 8), new THREE.MeshBasicMaterial({ visible: false }))
  scene.add(raycastSphere)

  const mouseBallBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(100, 100, 100)
  const mouseBallBody = world.createRigidBody(mouseBallBodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.ball(params.mouseBallRadius).setRestitution(0.5).setFriction(0.1),
    mouseBallBody,
  )

  const mouseBallDebugMesh = new THREE.Mesh(
    new THREE.SphereGeometry(params.mouseBallRadius, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),
  )
  mouseBallDebugMesh.visible = false
  scene.add(mouseBallDebugMesh)

  const _mouseBallPos = new THREE.Vector3()

  const onPointerMove = (event) => {
    mouseNDC.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
  }
  window.addEventListener('pointermove', onPointerMove)

  // ─── Wall colliders ──────────────────────────────────────────────────────────

  const wallThickness = 0.5
  const zExtent = 2

  function createWalls() {
    const vFov = THREE.MathUtils.degToRad(camera.fov / 2)
    const dist = camera.position.z
    const visibleH = 2 * dist * Math.tan(vFov)
    const visibleW = visibleH * camera.aspect
    const halfW = visibleW / 2
    const halfH = visibleH / 2
    const bigHalf = Math.max(halfW, halfH) + wallThickness

    const walls = [
      { pos: [-halfW - wallThickness / 2, 0, 0], half: [wallThickness / 2, bigHalf, bigHalf] },
      { pos: [halfW + wallThickness / 2, 0, 0], half: [wallThickness / 2, bigHalf, bigHalf] },
      { pos: [0, halfH + wallThickness / 2, 0], half: [bigHalf, wallThickness / 2, bigHalf] },
      { pos: [0, -halfH - wallThickness / 2, 0], half: [bigHalf, wallThickness / 2, bigHalf] },
      { pos: [0, 0, zExtent + wallThickness / 2], half: [bigHalf, bigHalf, wallThickness / 2] },
      { pos: [0, 0, -zExtent - wallThickness / 2], half: [bigHalf, bigHalf, wallThickness / 2] },
    ]

    return walls.map(({ pos, half }) => {
      const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(...pos)
      const body = world.createRigidBody(bodyDesc)
      const collider = RAPIER.ColliderDesc.cuboid(...half).setRestitution(0.5).setFriction(0.1)
      world.createCollider(collider, body)
      return body
    })
  }

  let wallBodies = createWalls()

  // ─── Debug GUI ───────────────────────────────────────────────────────────────

  const gui = new GUI({ closeFolders: true })
  gui.domElement.style.display = 'none'

  function setDebug(v) {
    debugOverlay.style.display = v ? '' : 'none'
    controls.enabled = v
    mouseBallDebugMesh.visible = v
    if (v) gui.domElement.style.display = ''
  }

  setDebug(params.debug)

  const envFolder = gui.addFolder('Environment')
  envFolder.addColor(params, 'background').name('Background').onChange((v) => { scene.background = new THREE.Color(v) })
  envFolder.add(params, 'ambientIntensity', 0, 5).name('Ambient').onChange((v) => (ambientLight.intensity = v))
  envFolder.add(params, 'spotIntensity', 0, 1000).name('Spot').onChange((v) => (spotLight.intensity = v))

  const matFolder = gui.addFolder('Material')
  matFolder.addColor(params, 'color').name('Color').onChange((v) => (glassMaterial.color = v))
  matFolder.add(params, 'transmission', 0, 1).name('Transmission').onChange((v) => (glassMaterial.transmission = v))
  matFolder.add(params, 'thickness', 0, 5).name('Thickness').onChange((v) => (glassMaterial.thickness = v))
  matFolder.add(params, 'roughness', 0, 1).name('Roughness').onChange((v) => (glassMaterial.roughness = v))
  matFolder.add(params, 'ior', 1, 2.33).name('IOR').onChange((v) => (glassMaterial.ior = v))
  matFolder.add(params, 'dispersion', 0, 40).name('Dispersion').onChange((v) => (glassMaterial.dispersion = v))
  matFolder.add(params, 'frostBlur', 0, 1).name('Frost Blur').onChange((v) => (glassMaterial.frostBlur = v))
  matFolder.add(params, 'iridescence', 0, 8).name('Iridescence').onChange((v) => (glassMaterial.iridescence = v))

  const physicsFolder = gui.addFolder('Physics')
  physicsFolder.add(params, 'wanderStrength', 0, 3, 0.01).name('Wander Strength')
  physicsFolder.add(params, 'wanderSpeed', 0, 2, 0.01).name('Wander Speed')
  physicsFolder.add(params, 'attractionStrength', 0, 30, 0.01).name('Attraction')

  const onKeyDown = (e) => {
    if (e.key === 'c' || e.key === 'C') {
      const hidden = gui.domElement.style.display === 'none'
      gui.domElement.style.display = hidden ? '' : 'none'
    }
    if (e.key === 'p' || e.key === 'P') {
      params.debug = !params.debug
      setDebug(params.debug)
    }
  }
  window.addEventListener('keydown', onKeyDown)

  // ─── Resize ──────────────────────────────────────────────────────────────────

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    for (const body of wallBodies) world.removeRigidBody(body)
    wallBodies = createWalls()
  }
  window.addEventListener('resize', onResize)

  // ─── Animation loop ──────────────────────────────────────────────────────────

  const _attractDir = new THREE.Vector3()
  const _wanderDir = new THREE.Vector3()
  const physicsTimestep = new FixedTimestep()

  renderer.setAnimationLoop(async (timestamp) => {
    raycaster.setFromCamera(mouseNDC, camera)
    const intersects = raycaster.intersectObject(raycastSphere)

    if (intersects.length > 0) {
      const ray = raycaster.ray
      const t = -ray.origin.dot(ray.direction)
      _mouseBallPos.copy(ray.direction).multiplyScalar(t).add(ray.origin)
      mouseBallDebugMesh.position.copy(_mouseBallPos)
    } else {
      _mouseBallPos.set(100, 100, 100)
      mouseBallDebugMesh.position.set(100, 100, 100)
    }

    const steps = physicsTimestep.update(timestamp)
    const dt = physicsTimestep.dt
    for (let i = 0; i < steps; i++) {
      try {
        mouseBallBody.setNextKinematicTranslation({ x: _mouseBallPos.x, y: _mouseBallPos.y, z: _mouseBallPos.z })

        const t = timestamp * 0.001
        for (let j = 0; j < cubeBodies.length; j++) {
          const { rigidBody } = cubeBodies[j]
          const pos = rigidBody.translation()
          const seed = wanderSeeds[j]

          _attractDir.set(-pos.x, -pos.y, -pos.z).normalize().multiplyScalar(params.attractionStrength * dt)

          const s = params.wanderSpeed
          _wanderDir.set(
            Math.sin(t * s + seed.ox) + Math.sin(t * s * 0.57 + seed.ox * 2),
            Math.sin(t * s * 0.77 + seed.oy) + Math.sin(t * s * 0.43 + seed.oy * 2),
            Math.sin(t * s * 0.63 + seed.oz) + Math.sin(t * s * 0.37 + seed.oz * 2),
          )
          _wanderDir.normalize().multiplyScalar(params.wanderStrength * dt)
          _attractDir.add(_wanderDir)

          if (params.waterDrag) {
            const vel = rigidBody.linvel()
            const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z)
            if (speed > 0.001) {
              const dragForce = params.waterDragCoefficient * speed * speed * dt
              const invSpeed = 1 / speed
              _attractDir.x -= vel.x * invSpeed * dragForce
              _attractDir.y -= vel.y * invSpeed * dragForce
              _attractDir.z -= vel.z * invSpeed * dragForce
            }
          }

          rigidBody.applyImpulse(_attractDir, true)
        }
        world.step()
      } catch {}
    }

    for (let j = 0; j < cubeBodies.length; j++) {
      const { mesh, rigidBody } = cubeBodies[j]
      try {
        const pos = rigidBody.translation()
        const rot = rigidBody.rotation()
        mesh.position.set(pos.x, pos.y, pos.z)
        mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
      } catch {}
    }

    renderer.render(scene, camera)
  })

  // ─── Cleanup ─────────────────────────────────────────────────────────────────

  return function destroy() {
    renderer.setAnimationLoop(null)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('keydown', onKeyDown)
    renderer.dispose()
    gui.destroy()
    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    if (document.body.contains(debugOverlay)) document.body.removeChild(debugOverlay)
    geometry.dispose()
  }
}
