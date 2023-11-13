import React from 'react'

export default function SwitchPages({ nextPage, prevPage }) {
	return (
		<div>
			{prevPage && <button onClick={prevPage}>Previous Page</button>}
			{nextPage && <button onClick={nextPage}>Next Page</button>}
		</div>
	)
}


