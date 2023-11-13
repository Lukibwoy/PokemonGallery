import React, { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'
import { ThemeContext } from './DarkMode/ThemeContext'
import { themeDark, themeLight } from './DarkMode/Theme'


const PokemonApp = () => {
	const [isDarkMode, setIsDarkMode] = useState(true)
	const [pokemon, setPokemon] = useState([])
	const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon')
	const [nextPage, setNextPage] = useState()
	const [prevPage, setPrevPage] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		axios.get(currentPage).then(res => {
			setLoading(false)
			setNextPage(res.data.next)
			setPrevPage(res.data.previous)
			setPokemon(res.data.results.map(p => p.name))
		})
	}, [currentPage])

	if (loading) return 'Loading...'

	function goToNextPage() {
		setCurrentPage(nextPage)
	}

	function goToPrevPage() {
		setCurrentPage(prevPage)
	}

	return (
		<div>
			<ThemeContext.Provider value={{ themeDark, themeLight, isDarkMode }}>
					<label className="switch">
					<input type="checkbox" onClick={() => setIsDarkMode(!isDarkMode)} />
					<span className="slider"></span>
				</label>
				<h1 className="text-6xl leading-normal mt-0 mb-2 text-yellow-800 flex flex-wrap flex-col text-center font-bold">
					Pokemon Galerry
				</h1>
				<div className="flex flex-wrap justify-center">
					{pokemon.map(pokemonName => (
						<PokemonCard key={pokemonName} pokemonName={pokemonName} />
					))}
				</div>
				<div>
					<div className="flex flex-wrap justify-center mt-300">
						<button
							className="bg-yellow-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
							onClick={goToPrevPage}
							disabled={!prevPage}>
							Previous
						</button>
						<button
							className="bg-yellow-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
							onClick={goToNextPage}
							disabled={!nextPage}>
							Load More
						</button>
					</div>
				</div>
			</ThemeContext.Provider>
		</div>
	)
}

export default PokemonApp
