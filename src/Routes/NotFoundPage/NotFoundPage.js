import React, { Component } from 'react'
import './NotFoundPage.css'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='notFound'>
        <h2>404 - Page not found</h2><br />
            <p>Try going back to the previous page.</p>
            <img src='shitpencil.png' alt='skate-comic-shitpencil' style={{height: '500px', width: 'relative'}} />
      </div>
    )
  }
}