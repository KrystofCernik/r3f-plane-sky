import { useProgress } from "@react-three/drei"
import { usePlay } from "../contexts/Play"

export const Overlay = () => {

	const { progress } = useProgress()
	const { play, setPlay, hasScroll, end } = usePlay()

	return (
		<div className={`overlay ${play ? 'hide' : ''} ${hasScroll ? 'scroll' : ''}`}>
			<div className={`loader ${progress === 100 ? 'hide' : ''}`} />
			<div className={`end ${end ? '' : 'hide'}`}>
				<h1 className="logo end">Thank you!</h1>
			</div>
			{progress === 100 && (
				<div className={`intro ${play ? 'hide' : ''}`}>
					<h1 className="logo">A Journey</h1>
					<button className="explore" onClick={() => { setPlay(true) }}>explore</button>
					<p className="intro-scroll">Scroll to begin a Journey</p>
				</div>
			)}
		</div>
	)
}