import React from 'react'
import CardsList from '../../Components/CardsList/CardsList'
import './MainPage.css'

export default class MainPage extends React.Component {

  render() {
    return (
      <section className='MainPage'>
        <p className='TextBox'>Hello! Welcome to Skateful. Here you can add, vote and discuss
          about your favorite skateboarders. You can share their instagram
          as well, and it will link directly to their instagram page. 
          To get started, simply register for an account and Log in!

        </p>
        <CardsList />
      </section>
    )
  }
}