import React from 'react'
import './CommentSection.css'
import SkatersContext from '../../Context/SkatersContext'
import SkaterAPIService from '../../Services/skater-api-service';

export default class CommentSection extends React.Component {
  static contextType = SkatersContext;
      
  componentDidMount() {
    SkaterAPIService.getSkaters()
      .then(this.context.setSkaters)
    SkaterAPIService.getComments()
      .then(this.context.setComments)
  }

  render() {
    let skaterId = this.props.match.params.skaterId
    let skaterIdInt = parseInt(skaterId, 10);

    let skater = this.context.skaters.find(skater => skaterIdInt === skater.id) || {name: ''}

    console.log(this.context.comments)

    return(
        <div className='CommentBox'>
          <h1> {skater.name} </h1>
          <p>
            
          </p>
          <form>
            <textarea />
            <input type='submit' />
          </form>
        </div>
    )
  }
}