// Lens.js
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ShaderMaterial, WebGLRenderTarget } from 'three'
import { OrbitControls } from '@react-three/drei'
import { LensRefractionShader } from 'three-stdlib/shaders/LensRefractionShader'




function RefractivePlane() {
  const mesh = useRef()
  const { gl, scene, camera, size } = useThree()
  const renderTarget = useRef(
    new WebGLRenderTarget(size.width, size.height)
  )
  const material = useRef(
    new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uRefractionBias: { value: 0.1 },
        uMaxRefraction: { value: 0.2 },
      },
      vertexShader: LensRefractionShader.vertexShader,
      fragmentShader: LensRefractionShader.fragmentShader,
    })
  )

  useFrame(() => {
    // render the scene behind into our target
    gl.setRenderTarget(renderTarget.current)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    // feed that texture into our refraction shader
    material.current.uniforms.tDiffuse.value = renderTarget.current.texture
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <circleBufferGeometry args={[1, 64]} />
      <primitive object={material.current} attach="material" />
    </mesh>
  )
}

export default function Lens({ diameter = 2, x = 0, y = 0 }) {
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2"
      style={{ width: diameter * 100, height: diameter * 100 }}
    >
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
        <RefractivePlane />
        {/* optional: <OrbitControls /> for debugging */}
      </Canvas>
    </div>
  )
}
