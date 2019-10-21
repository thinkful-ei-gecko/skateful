import React from 'react';
import SkatersContext from '../../Context/SkatersContext'
import './NewCardPage.css'
import SkaterAPIService from '../../Services/skater-api-service'

export default class NewCardPage extends React.Component {
  static contextType = SkatersContext;

  handleSubmit = (ev) => {
    ev.preventDefault()
    !this.context.logged_in ? window.alert('Must be logged in!') && this.context.renderLogIn() : this.context.doNothing()
    const { name, location, instagram, bio, img_url } = ev.target

    SkaterAPIService.postSkater(name.value, location.value, instagram.value, bio.value, img_url.value)
      .then(this.context.addSkater)
      .then(() => {
        this.refs.name.value = ''
        this.refs.location.value = ''
        this.refs.instagram.value = ''
        this.refs.bio.value = ''
        this.refs.img_url.value = ''
        this.context.renderMainPage()
      })
  }

  render() {
    return (
      <fieldset>
        <img src='logo512.png' alt='logo' style={{width: '80px', height: '80px'}}/>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'> skater name: </label>
            <input name='name' ref ='name' type='text' required />
              <br />
          <label htmlFor='location'> where from? </label>
            <input name='location' ref='location' type='text' required />
              <br />
          <label htmlFor='instagram'> instagram? </label>
            <input name='instagram' ref='instagram' type='text' placeholder='@someone' />
              <br />
          <label htmlFor='img_url'> image url: </label>
            <input name='img_url' ref='img_url' type='text' />
              <br />
          <label htmlFor='bio'> bio: </label>
            <br />
          <textarea name='bio' ref='bio' type='text' />
            <br />
          <input className ='submit' type='submit' />
        </form>
      </fieldset>
  )}
}