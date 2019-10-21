import React from 'react';
import './NewCard.css';
import SkatersContext from '../../Context/SkatersContext'

export default class NewCard extends React.Component {
  static contextType = SkatersContext

  handleAddCardButtonClick = () => {
    this.context.logged_in 
     ? this.context.renderAddNewCard()
     : this.context.renderLogIn()
  }

  render() {
    return (
        <div className='NewCard'>
          <button className='plus-b' onClick={this.handleAddCardButtonClick}>
            <div className='front-plus'>
              <img src='plus.svg' alt='plus' />
            </div>
            <div className='back-plus'>
              <img src='plus-hover.svg' alt='plus-hover'/>
            </div>
          </button>
        </div> 
    )
  }
}