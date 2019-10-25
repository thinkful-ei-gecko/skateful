import React from 'react'
import ReactDOM from 'react-dom'
import CommentsSection from './CommentSection'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CommentsSection />, div
    )
    ReactDOM.unmountComponentAtNode(div)
})