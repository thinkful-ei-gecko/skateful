import React from 'react'
import './CardsList.css'
import Card from '../Card/Card'
import SkatersContext from '../../Context/SkatersContext'
import SkaterAPIService from '../../Services/skater-api-service'
import NewCard from '../../Components/NewCard/NewCard'

export default class CardsList extends React.Component {
  static contextType = SkatersContext

  componentDidMount() {
    SkaterAPIService.getSkaters()
      .then(this.context.setSkaters)
  }

  render() {
    return (
      <SkatersContext.Consumer>
        {context => (
        <>
          <h3>Skaters</h3>
          <div className='CardsList'>
            {!context.skaters.length ? <div>No Skaters</div> : (
              <div className='CardsDisplay'>
                {context.skaters.map((skater, i) => 
                  <Card skater={skater} key={i} />)}
              </div>
            )}
            <NewCard />
          </div>
        </>
        )}
      </SkatersContext.Consumer>
    )
  }
}