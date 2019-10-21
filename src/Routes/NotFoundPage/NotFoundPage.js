import React, { Component } from 'react'

export default class NotFoundPage extends Component {
  render() {
    return (
      <>
        <h2>404 - Page not found</h2>
            <p>Try going back to the previous page.</p>
            <img src='shitpencil.png' alt='skate-comic-shitpencil' style={{height: '500px', width: 'relative'}} />
      </>
    )
  }
}