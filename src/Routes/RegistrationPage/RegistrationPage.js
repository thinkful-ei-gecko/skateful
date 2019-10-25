import React from 'react';
import AuthApiService from '../../Services/auth-api-service'
import SkatersContext from '../../Context/SkatersContext'
import './RegistrationPage.css'

export default class RegistationPage extends React.Component {
  static contextType = SkatersContext

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password, email } = ev.target

    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      email: email.value,
    })
      .then(user => {
        this.refs.user_name.value = ''
        this.refs.password.value = ''
        this.refs.email.value = ''
        this.context.renderLogIn()
        this.context.updateLoginError(null)
      })
      .catch(err => this.context.updateLoginError(err))
  }
  render() {
    return (
      <fieldset>
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <p className='error'>{ this.context.log_in_error && <span> Username already exists </span> }</p>
        <label htmlFor='email'>email: </label>
        <input type='email' name='email' ref='email' /> <br />
        <label htmlFor='user_name'>username: </label>
        <input type='text' name='user_name' ref='user_name' /><br />
        <label htmlFor='password'>password: </label>
        <input type='password' name='password' ref='password' /><br />
        {/* <label htmlFor='confirm_password'> confirm password: </label>
        <input type='password' name='confirm_password' /><br /> */}
        <input className='submit' type='submit' />
      </form>
    </fieldset>
    )
  }
}