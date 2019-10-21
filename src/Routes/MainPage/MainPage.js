import React from 'react'
import CardsList from '../../Components/CardsList/CardsList'

export default class MainPage extends React.Component {

  render() {
    return (
      <section className='MainPage'>
          <CardsList />
      </section>
    )
  }
}