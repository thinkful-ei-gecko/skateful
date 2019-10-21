import React from 'react'
import TokenService from '../../Services/token-service'
import AuthApiService from '../../Services/auth-api-service'
import SkatersContext from '../../Context/SkatersContext'

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
         user_name.value = ''
         password.value = ''
         TokenService.saveAuthToken(res.authToken)
         this.props.onLoginSuccess(res.authToken)
         this.context.handleLoginSuccess(res.authToken)
       })
  }

  render() {
    return(
      <fieldset>
        <form onSubmit={this.handleSubmitJwtAuth}>
					<label htmlFor='user_name'>username: </label>
					<input type='text' id='user_name' /><br />
					<label htmlFor='password'>password: </label>
					<input type='password' id='password' /><br />
					<input className='submit' type='submit' />
        </form>
      </fieldset>
    )
  }
}