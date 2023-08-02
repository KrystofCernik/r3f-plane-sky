import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { fadeOnBeforeCompile } from '../utils/fadeMaterial'
import { useFrame } from '@react-three/fiber'

export const Cloud = ({sceneOpacity, ...props}) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('models/cloud.gltf')

  const materialRef = useRef()

  useFrame(() => {
    materialRef.current.opacity = sceneOpacity.current
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
      <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          {...materials['lambert2SG.001']}
          transparent
          envMapIntensity={ 2 }
      />
      </mesh>
    </group>
  )
}

useGLTF.preload('models/cloud.gltf')
