import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeDJanviAvatar({ state = 'idle' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 240
    const height = container.clientHeight || 280

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 1.2, 2.5)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. 3D Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 2.5)
    mainLight.position.set(2, 4, 3)
    scene.add(mainLight)

    const rimLight = new THREE.PointLight(0x10b981, 2, 10)
    rimLight.position.set(-2, 2, -2)
    scene.add(rimLight)

    // 3. 3D Head & Torso Mesh (Stylized 3D Digital Avatar Model)
    const headGroup = new THREE.Group()

    // Face Skin Sphere
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32)
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xfdba74,
      roughness: 0.4,
      metalness: 0.1,
    })
    const headMesh = new THREE.Mesh(headGeo, skinMat)
    headMesh.scale.set(1, 1.15, 0.9)
    headGroup.add(headMesh)

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a })
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat)
    eyeLeft.position.set(-0.18, 0.1, 0.42)
    const eyeRight = eyeLeft.clone()
    eyeRight.position.set(0.18, 0.1, 0.42)
    headGroup.add(eyeLeft)
    headGroup.add(eyeRight)

    // Pupils
    const pupilGeo = new THREE.SphereGeometry(0.04, 16, 16)
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const pupilLeft = new THREE.Mesh(pupilGeo, pupilMat)
    pupilLeft.position.set(-0.18, 0.1, 0.49)
    const pupilRight = pupilLeft.clone()
    pupilRight.position.set(0.18, 0.1, 0.49)
    headGroup.add(pupilLeft)
    headGroup.add(pupilRight)

    // 👕 Official JanMitra AI Polo Shirt Mesh
    const torsoGeo = new THREE.CylinderGeometry(0.45, 0.65, 0.9, 32)
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0x071a35,
      roughness: 0.3,
      metalness: 0.2,
    })
    const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat)
    torsoMesh.position.set(0, -0.7, 0)
    headGroup.add(torsoMesh)

    scene.add(headGroup)

    // 4. Animation Loop (Breathing sway & speaking rotation)
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Procedural Head Swaying Motion
      headGroup.position.y = Math.sin(elapsedTime * 2) * 0.04
      headGroup.rotation.y = Math.sin(elapsedTime * 1.2) * 0.08

      if (state === 'speaking') {
        headGroup.position.y += Math.sin(elapsedTime * 12) * 0.02
      } else if (state === 'looking') {
        headGroup.rotation.y = 0.25
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [state])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
