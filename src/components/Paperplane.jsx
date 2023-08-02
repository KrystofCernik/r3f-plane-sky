/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Paperplane = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('models/paperplane.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={materials.White} />
    </group>
  )
}

useGLTF.preload('models/paperplane.glb')
