import { useMemo, useRef } from "react"
import gsap from 'gsap'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, useScroll } from "@react-three/drei"
import { Background } from "./Background"
import { Paperplane } from "./Paperplane"
import { Cloud } from "./Cloud"
import TextSection from "./TextSection"
import { useLayoutEffect } from "react"
import { fadeOnBeforeCompile } from '../utils/fadeMaterial'
import { usePlay } from "../contexts/Play"
import { useEffect } from "react"

export const Experience = () => {

	// Variables
	let n = 1000
	let distance = 250
	let aheadCamera = 0.008
	let aheadPlane = 0.02
	let maxAngle = 35
	let frictionDistance = 42

	// Touch Points
	const curvePoints = useMemo(() => [
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, - distance),
		new THREE.Vector3(50, 0, -2 * distance),
		new THREE.Vector3(-50, 0, -3 * distance),
		new THREE.Vector3(50, 0, -4 * distance),
		new THREE.Vector3(0, 0, -5 * distance),
		new THREE.Vector3(0, 0, -6 * distance),
		new THREE.Vector3(0, 0, -7 * distance),
		new THREE.Vector3(0, 0, -8 * distance),
		new THREE.Vector3(0, 0, -9 * distance),
	], [distance])

	const sceneOpacity = useRef(0)
	const lineMaterialRef = useRef()

	const curve = useMemo(() => {
		return new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5)
	}, [curvePoints])

	// Texts generation
	const textSections = useMemo(() => {
		return [
			{
				position: new THREE.Vector3(
					curvePoints[0].x - 2,
					curvePoints[0].y,
					curvePoints[0].z - 120,
				),
				cameraRailDistance: 1,
				title: `Hello!`
			},
			{
				position: new THREE.Vector3(
					curvePoints[1].x - 3,
					curvePoints[1].y,
					curvePoints[1].z,
				),
				cameraRailDistance: - 1,
				title: 'Welcome!',
				subtitle: `It's really nice to see you here`
			},
			{
				position: new THREE.Vector3(
					curvePoints[2].x + 1,
					curvePoints[2].y,
					curvePoints[2].z,
				),
				cameraRailDistance: 1,
				title: "Let's flyyyy",
				subtitle: `Just hold on to something`
			},
			{
				position: new THREE.Vector3(
					curvePoints[3].x - 3,
					curvePoints[3].y,
					curvePoints[3].z,
				),
				cameraRailDistance: - 1,
				subtitle: `I've been working on this flight for a long time`
			},
			{
				position: new THREE.Vector3(
					curvePoints[4].x + 1,
					curvePoints[4].y,
					curvePoints[4].z,
				),
				cameraRailDistance: 1,
				title: `Just to make it fun for you`
			},
			{
				position: new THREE.Vector3(
					curvePoints[5].x - 3,
					curvePoints[5].y,
					curvePoints[5].z,
				),
				cameraRailDistance: - 1,
				subtitle: `If you would be interested in the process, I can definitely tell you more!`
			},
			{
				position: new THREE.Vector3(
					curvePoints[6].x + 1,
					curvePoints[6].y,
					curvePoints[6].z,
				),
				cameraRailDistance: 1,
				subtitle: `Oh we almost reached the end`
			},
			{
				position: new THREE.Vector3(
					curvePoints[7].x - 3,
					curvePoints[7].y,
					curvePoints[7].z,
				),
				cameraRailDistance: - 1,
				subtitle: `It was amazing to spend time with you`
			},
			{
				position: new THREE.Vector3(
					curvePoints[8].x - 3,
					curvePoints[8].y - 0.5,
					curvePoints[8].z,
				),
				cameraRailDistance: 0,
				title: 'Bye!',
				subtitle: `Till next time`
			}
		]
	}, [curvePoints])

	// Cloud generation
	const clouds = useMemo(() => [
		// STARTING
		{
			position: new THREE.Vector3(-3.5, -3.2, -7),
		},
		{
			position: new THREE.Vector3(3.5, -4, -10),
		},
		{
			scale: new THREE.Vector3(4, 4, 4),
			position: new THREE.Vector3(-18, 0.2, -68),
			rotation: new THREE.Euler(-Math.PI / 5, Math.PI / 6, 0),
		},
		{
			scale: new THREE.Vector3(2.5, 2.5, 2.5),
			position: new THREE.Vector3(10, -1.2, -52),
		},
		// FIRST POINT
		{
			scale: new THREE.Vector3(4, 4, 4),
			position: new THREE.Vector3(
				curvePoints[1].x + 10,
				curvePoints[1].y - 4,
				curvePoints[1].z + 64
			),
		},
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[1].x - 20,
				curvePoints[1].y + 4,
				curvePoints[1].z + 28
			),
			rotation: new THREE.Euler(0, Math.PI / 7, 0),
		},
		{
			rotation: new THREE.Euler(0, Math.PI / 7, Math.PI / 5),
			scale: new THREE.Vector3(5, 5, 5),
			position: new THREE.Vector3(
				curvePoints[1].x - 13,
				curvePoints[1].y + 4,
				curvePoints[1].z - 62
			),
		},
		{
			rotation: new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
			scale: new THREE.Vector3(5, 5, 5),
			position: new THREE.Vector3(
				curvePoints[1].x + 54,
				curvePoints[1].y + 2,
				curvePoints[1].z - 82
			),
		},
		{
			scale: new THREE.Vector3(5, 5, 5),
			position: new THREE.Vector3(
				curvePoints[1].x + 8,
				curvePoints[1].y - 14,
				curvePoints[1].z - 22
			),
		},
		// SECOND POINT
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[2].x + 6,
				curvePoints[2].y - 7,
				curvePoints[2].z + 50
			),
		},
		{
			scale: new THREE.Vector3(2, 2, 2),
			position: new THREE.Vector3(
				curvePoints[2].x - 2,
				curvePoints[2].y + 4,
				curvePoints[2].z - 26
			),
		},
		{
			scale: new THREE.Vector3(4, 4, 4),
			position: new THREE.Vector3(
				curvePoints[2].x + 12,
				curvePoints[2].y + 1,
				curvePoints[2].z - 86
			),
			rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 3),
		},
		// THIRD POINT
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[3].x + 3,
				curvePoints[3].y - 10,
				curvePoints[3].z + 50
			),
		},
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[3].x - 10,
				curvePoints[3].y,
				curvePoints[3].z + 30
			),
			rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
		},
		{
			scale: new THREE.Vector3(4, 4, 4),
			position: new THREE.Vector3(
				curvePoints[3].x - 20,
				curvePoints[3].y - 5,
				curvePoints[3].z - 8
			),
			rotation: new THREE.Euler(Math.PI, 0, Math.PI / 5),
		},
		{
			scale: new THREE.Vector3(5, 5, 5),
			position: new THREE.Vector3(
				curvePoints[3].x + 0,
				curvePoints[3].y - 5,
				curvePoints[3].z - 98
			),
			rotation: new THREE.Euler(0, Math.PI / 3, 0),
		},
		// FOURTH POINT
		{
			scale: new THREE.Vector3(2, 2, 2),
			position: new THREE.Vector3(
				curvePoints[4].x + 3,
				curvePoints[4].y - 10,
				curvePoints[4].z + 2
			),
		},
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[4].x + 24,
				curvePoints[4].y - 6,
				curvePoints[4].z - 42
			),
			rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
		},
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[4].x - 4,
				curvePoints[4].y + 9,
				curvePoints[4].z - 62
			),
			rotation: new THREE.Euler(Math.PI / 3, 0, Math.PI / 3),
		},
		// FINAL
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[7].x + 12,
				curvePoints[7].y - 5,
				curvePoints[7].z + 60
			),
			rotation: new THREE.Euler(-Math.PI / 4, -Math.PI / 6, 0),
		},
		{
			scale: new THREE.Vector3(3, 3, 3),
			position: new THREE.Vector3(
				curvePoints[7].x - 12,
				curvePoints[7].y + 5,
				curvePoints[7].z + 120
			),
			rotation: new THREE.Euler(Math.PI / 4, Math.PI / 6, 0),
		},
	], [])

	const shape = useMemo(() => {
		const shape = new THREE.Shape()
		shape.moveTo(0, -0.08)
		shape.lineTo(0, 0.08)

		return shape
	}, [])

	const paperplane = useRef()
	const cameraGroup = useRef()
	const cameraRail = useRef()
	const scroll = useScroll()
	const lastScroll = useRef(0)

	const { play, setHasScroll, end, setEnd } = usePlay()

	useFrame((state, delta) => {

		if (lastScroll.current <= 0 && scroll.offset > 0) {
			setHasScroll(true)
		}

		lineMaterialRef.current.opacity = sceneOpacity.current

		if (play && sceneOpacity.current < 1) {
			sceneOpacity.current = THREE.MathUtils.lerp(
				sceneOpacity.current,
				1,
				delta * 0.8
			)
		}

		if (end) {
			return
		}

		let friction = 2
		let resetCameraRail = true

		const scrollOffset = Math.max(0, scroll.offset)

		// Look closer to text sections
		textSections.forEach(textSection => {
			const distance = textSection.position.distanceTo(cameraGroup.current.position)

			if (distance < frictionDistance) {
				friction = Math.max(distance / frictionDistance, 0.1)
				const targetCameraRailPosition = new THREE.Vector3(
					(1 - distance / frictionDistance) * textSection.cameraRailDistance,
					0,
					0
				)
				cameraRail.current.position.lerp(targetCameraRailPosition, delta)
				resetCameraRail = false
			}
		})

		if (resetCameraRail) {
			const targetCameraRailPosition = new THREE.Vector3(0, 0, 0)
			cameraRail.current.position.lerp(targetCameraRailPosition, delta)
		}

		let lerpedScrollOffset = THREE.MathUtils.lerp(lastScroll.current, scrollOffset, delta * friction)

		lerpedScrollOffset = Math.min(lerpedScrollOffset, 1)
		lerpedScrollOffset = Math.max(lerpedScrollOffset, 0)

		lastScroll.current = lerpedScrollOffset
		tl.current.seek(lerpedScrollOffset * tl.current.duration())

		// Camera animation

		const curPoint = curve.getPoint(lerpedScrollOffset)

		cameraGroup.current.position.lerp(curPoint, delta * 24)

		const lookAtPoint = curve.getPoint(Math.min(lerpedScrollOffset + aheadCamera, 1))

		const currentLookAt = cameraGroup.current.getWorldDirection(new THREE.Vector3())

		const targetLookAt = new THREE.Vector3().subVectors(curPoint, lookAtPoint).normalize()

		const lookAt = currentLookAt.lerp(targetLookAt, delta * 24)
		cameraGroup.current.lookAt(cameraGroup.current.position.clone().add(lookAt))

		// Paperplane rotation
		const tangent = curve.getTangent(lerpedScrollOffset + aheadPlane)

		const nonLerpLookAt = new THREE.Group()
		nonLerpLookAt.position.copy(curPoint)
		nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt))

		tangent.applyAxisAngle(new THREE.Vector3(0, 1, 0), - nonLerpLookAt.rotation.y)

		let angle = Math.atan2(- tangent.z, tangent.x)
		angle = - Math.PI / 2 + angle

		let angleDegrees = (angle * 180) / Math.PI
		angleDegrees *= 2.4

		if (angleDegrees < 0) {
			angleDegrees = Math.max(angleDegrees, - maxAngle)
		} else if (angleDegrees > 0) {
			angleDegrees = Math.min(angleDegrees, maxAngle)
		}

		angle = (angleDegrees * Math.PI) / 180

		const targetPaperplaneQuaternion = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(paperplane.current.rotation.x, paperplane.current.rotation.y, angle)
		)

		paperplane.current.quaternion.slerp(targetPaperplaneQuaternion, delta * 2)

		if (cameraGroup.current.position.z < curvePoints[curvePoints.length - 1].z + 200) {
			setEnd(true)
			planeOutTl.current.play()
		}
	})

	// Animating background
	const tl = useRef()
	const planeInTl = useRef()
	const planeOutTl = useRef()

	const backgroundColors = useRef({
		colorA: '#6e6edb',
		colorB: '#abaadd'
	})

	useLayoutEffect(() => {
		tl.current = gsap.timeline()

		tl.current.to(backgroundColors.current, {
			colorA: '#aaaae6',
			colorB: '#c79b79',
			duration: 1
		})

		tl.current.to(backgroundColors.current, {
			colorA: '#69acb8',
			colorB: '#e0758a',
			duration: 1
		})

		tl.current.to(backgroundColors.current, {
			colorA: '#ad7bb3',
			colorB: '#7686d6',
			duration: 1
		})

		tl.current.pause()

		planeInTl.current = gsap.timeline()
		planeInTl.current.pause()
		planeInTl.current.from(paperplane.current.position, {
			z: 5,
			y: - 2,
			ease: 'power2.inOut',
			duration: 3
		})

		planeOutTl.current = gsap.timeline()
		planeOutTl.current.pause()
		planeOutTl.current.to(paperplane.current.position, {
			z: -250,
			y: 10,
			ease: 'power2.inOut',
			duration: 10
		})
		planeOutTl.current.to(cameraRail.current.position, {
			y: 20,
			duration: 8,
			ease: 'power2.in',
		}, '<')
		planeOutTl.current.to(paperplane.current.position, {
			z: -100,
			ease: 'power2.inOut',
			duration: 2
		})
	}, [])

	useEffect(() => {
		if (play) {
			planeInTl.current.play()
		}
	}, [play])

  return (
	<>

		<directionalLight position={[ 0, 3, 1 ]} intensity={ 0.1 } />
		<group ref={cameraGroup}>
			<group ref={cameraRail}>
				<PerspectiveCamera position={[ 0, 0, 10 ]} fov={ 30 } makeDefault />
			</group>
			<Background backgroundColors={backgroundColors} />
			<group ref={paperplane}>
				<Float floatIntensity={ 2 } speed={ 1.5 } rotationIntensity={ 0.5 }>
					<Paperplane position-y={ 0.1 } scale={ 0.008 } rotation-x={ Math.PI / 9 } />
				</Float>
			</group>
		</group>

		{/* Texts */}
		{textSections.map((textSection, index) => (
			<TextSection {...textSection} key={index} />
		))}

		<group position-y={ -2 }>
			{/* <Line
				points={linePoints}
				color={'white'}
				opacity={ 0.7 }
				transparent
				lineWidth={ 16 }
			/> */}
			<mesh>
				<extrudeGeometry
					args={[
						shape,
						{
							steps: n,
							bevelEnabled: false,
							extrudePath: curve
						}
					]}
				/>
				<meshStandardMaterial ref={lineMaterialRef} color={'white'} transparent opacity={ 1 } envMapIntensity={ 10 } onBeforeCompile={fadeOnBeforeCompile} />
			</mesh>
		</group>

		{/* Clouds */}
		{clouds.map((cloud, index) => (
			<Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
		))}
	</>
  )
}
