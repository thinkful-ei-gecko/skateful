import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
      <MemoryRouter><Card /></MemoryRouter>, div
  )
  ReactDOM.unmountComponentAtNode(div)
})