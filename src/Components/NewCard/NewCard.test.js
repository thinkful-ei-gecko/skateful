import React from 'react'
import ReactDOM from 'react-dom'
import NewCard from './NewCard'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <NewCard />, div
    )
    ReactDOM.unmountComponentAtNode(div)
})