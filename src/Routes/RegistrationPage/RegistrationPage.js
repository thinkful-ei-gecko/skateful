import React from 'react';
import './RegistrationPage.css'

export default class RegistationPage extends React.Component {
  render() {
    return (
      <fieldset>
      <form>
        <label htmlFor='email'>email: </label>
        <input type='email' id='email' /> <br />
        <label htmlFor='user_name'>username: </label>
        <input type='text' id='user_name' /><br />
        <label htmlFor='password'>password: </label>
        <input type='password' id='password' /><br />
        <label htmlFor='confirm_password'> confirm password: </label>
        <input type='password' id='confirm_password' /><br />
        <input className='submit' type='submit' />
      </form>
    </fieldset>
    )
  }
}