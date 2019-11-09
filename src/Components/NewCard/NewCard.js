import React from 'react';
import './NewCard.css';
import SkatersContext from '../../Context/SkatersContext'
import TokenService from '../../Services/token-service'

export default class NewCard extends React.Component {
  static contextType = SkatersContext
  
  handleAddCardButtonClick = () => {
    TokenService.hasAuthToken() 
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