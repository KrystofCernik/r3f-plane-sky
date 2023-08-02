import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, Sphere } from "@react-three/drei"
import { LayerMaterial, Gradient } from 'lamina'

export const Background = ({ backgroundColors }) => {

	const start = 0.2
	const end = - 0.5

	const gradient = useRef()
	const gradientEnv = useRef()

	useFrame(() => {
		gradient.current.colorA = new THREE.Color(backgroundColors.current.colorA)
		gradient.current.colorB = new THREE.Color(backgroundColors.current.colorB)
		gradientEnv.current.colorB = new THREE.Color(backgroundColors.current.colorA)
		gradientEnv.current.colorB = new THREE.Color(backgroundColors.current.colorB)
	})

  return (
	<>
		<Sphere scale={[ 500, 500, 500 ]} rotation-y={ Math.PI / 2 }>
			<LayerMaterial
				color={'#ffffff'}
				side={ THREE.BackSide }
			>
				<Gradient
					ref={gradient}
					axes={'y'}
					start={ start }
					end={ end }
				/>
			</LayerMaterial>
		</Sphere>
		<Environment resolution={ 256 }>
			<Sphere scale={[ 100, 100, 100 ]} rotation-y={ Math.PI / 2 } rotation-x={Math.PI}>
				<LayerMaterial
					color={'#ffffff'}
					side={ THREE.BackSide }
				>
					<Gradient
						ref={gradientEnv}
						axes={'y'}
						start={ start }
						end={ end }
					/>
				</LayerMaterial>
			</Sphere>
		</Environment>
	</>
  )
}
