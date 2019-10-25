import React from 'react'
import TokenService from '../../Services/token-service'
import AuthApiService from '../../Services/auth-api-service'
import SkatersContext from '../../Context/SkatersContext'
import { Link } from 'react-router-dom'
import './LoginPage.css'

export default class LoginPage extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  }

  static contextType = SkatersContext;

  handleSubmitJwtAuth = ev => {
     ev.preventDefault()
     const { user_name, password } = ev.target
 
     AuthApiService.postLogin({
       user_name: user_name.value,
       password: password.value,
     })
       .then(res => {
         this.context.updateUser(user_name.value)
         user_name.value = ''
         password.value = ''
         TokenService.saveAuthToken(res.authToken)
         this.props.onLoginSuccess(res.authToken)
         this.context.handleLoginSuccess(res.authToken)
         this.context.updateLoginError(null) 
       })
       .catch(err => this.context.updateLoginError(err))
  }

  render() {
    console.log(this.context.user)
    return(
      <fieldset className='LoginPage'>
        <h1>Log In</h1>
        {/* <img src='logo512.png' alt='logo' style={{width: '80px', height: '80px'}}/> */}
        <p className='error'>{ this.context.log_in_error && <span>Username or password is not valid</span> }</p>
        <form onSubmit={this.handleSubmitJwtAuth}>
					<label htmlFor='user_name'>username: </label>
					<input type='text' id='user_name' /><br />
					<label htmlFor='password'>password: </label>
					<input type='password' id='password' /><br />
					<input className='submit' type='submit' />
        </form>
        <p className='register'> 
          Don't have an account? Register for one 
          <Link to='/register'> here </Link> 
        </p>
        <p className='demo'>
          For demo purposes, you can login using these credentials:
          'admin': 'password' *admin has special privelages* 
          'badri': 'password'
        </p>
      </fieldset>
    )
  }
}