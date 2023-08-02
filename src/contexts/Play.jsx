import { createContext, useState, useContext } from "react"

const Context = createContext()

export const PlayProvider = ({children}) => {
	const [play, setPlay] = useState(false)
	const [hasScroll, setHasScroll] = useState(false)
	const [end, setEnd] = useState(false)

	return (
		<Context.Provider
			value={{
				play,
				setPlay,
				hasScroll,
				setHasScroll,
				end,
				setEnd
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const usePlay = () => {
	const context = useContext(Context)

	return context
}