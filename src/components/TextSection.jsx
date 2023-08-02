import { Text } from "@react-three/drei"
import { fadeOnBeforeCompileFlat } from '../utils/fadeMaterial'

export default function TextSection({ title, subtitle, ...props }) {


	return (
		<>
			<group {...props}>
				{title && (
					<Text
						anchorX={'left'}
						anchorY={subtitle ? 'bottom' : 'middle'}
						font="fonts/Iskry.woff"
						fontSize={ 0.6 }
						lineHeight={ 1 }
						maxWidth={ 3.5 }
					>
						{title}
						<meshStandardMaterial envMapIntensity={ 10 } color={'white'} onBeforeCompile={fadeOnBeforeCompileFlat} />
					</Text>
				)}
				{subtitle && (
					<Text
						anchorX={'left'}
						anchorY={title ? 'top' : 'middle'}
						font="fonts/Iskry.woff"
						fontSize={ 0.3 }
						maxWidth={ 2.5 }
					>
						{subtitle}
						<meshStandardMaterial envMapIntensity={ 10 } color={'white'} onBeforeCompile={fadeOnBeforeCompileFlat} />
					</Text>
				)}
			</group>
		</>
	)
}
