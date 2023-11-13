import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ThemeContext } from './DarkMode/ThemeContext'
import axios from 'axios'

const PokemonCard = ({ pokemonName }) => {
	const [pokemonData, setPokemonData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isCardClicked, setIsCardClicked] = useState(false)
	const { themeLight, themeDark, isDarkMode } = useContext(ThemeContext)

	useEffect(() => {
		setLoading(true)
		axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res => {
			setPokemonData({
				name: res.data.name,
				types: res.data.types.map(type => type.type.name),
				sprite: res.data.sprites.front_default,
				weight: res.data.weight,
				height: res.data.height,
			})
			setLoading(false)
		})
	}, [pokemonName])

	const toggleCardClick = () => {
		setIsCardClicked(!isCardClicked)
	}

	const style = {}

	if (loading) return 'Loading...'

	return (
		<div
			className="pokemon-card bg-white rounded-lg shadow-md p-10 m-6 text-center shadow-2x opacity-90 cursor-pointer"
			style={{
				...style,
				backgroundColor: isDarkMode ? themeDark.colors.backgroundColor : themeLight.colors.backgroundColor,
				color: isDarkMode ? themeDark.colors.color : themeLight.colors.color,
			}}
			onClick={toggleCardClick}>
			<img src={pokemonData.sprite} alt={pokemonData.name} className="mx-auto mb-2 rounded-lg text-center" />
			<div>
				<strong className="block text-xl font-semibold text-center">{pokemonData.name}</strong>
			</div>
			<div className="text-black-600 flex flex-wrap flex-col text-center">{pokemonData.types.join(', ')}</div>
			{isCardClicked && (
				<div className="zoom-card mt-5 ">
					<strong className="block text font-semibold text-center">Weight: {pokemonData.weight}kg</strong>
					<strong className="block text font-semibold text-center">Height: {pokemonData.height}m</strong>
				</div>
			)}
		</div>
	)
}

export default PokemonCard
