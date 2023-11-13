import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonApp from './components/PokemonApp'
import './App.css'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PokemonApp />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
