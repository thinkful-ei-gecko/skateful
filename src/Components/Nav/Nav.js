import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import TokenService from '../../Services/token-service'
import SkaterContext from '../../Context/SkatersContext'
import logo from '../../logo128.png'


export default class Nav extends React.Component {
  static contextType = SkaterContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.context.updateUser(null)
    this.context.handleLogoutSuccess()
  }

  renderLogoutLink() {
    return (
      <>
        <Link
          onClick={this.handleLogoutClick}
          to='/' className='nav-link'>
          Logout
        </Link>
      </>
    )
  }


  renderLoginLink() {
    return (
      <>
        <Link
          to='/register' className='nav-link'>
          Register 
        </Link>
        
        <Link
          to='/log-in' className='nav-link'>
          Log in
        </Link>
      </>
    )
  }

  render() {
    return (
        <header>
            <Link to='/' className='Skateful'> <img id='logo' src={logo} alt='Skateful' style={{width: '40px', height: '40px'}}/> <p> Skateful </p> </Link>
            <Link to='/' className='Slogan'> find and share the best skaters </Link>
            <p>
              {this.context.logged_in 
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </p>
        </header>
    )
  }
}