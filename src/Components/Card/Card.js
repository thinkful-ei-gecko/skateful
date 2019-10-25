import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'
import SkatersContext from '../../Context/SkatersContext';

export default class Card extends React.Component {
  static contextType = SkatersContext

  constructor(props) {
    super(props);
    this.state = {
      skater: this.props.skater,
      up_votes: this.props.skater.up_votes
    }
  }
  
  handleUpVoteClick = () => {
    if (!this.context.logged_in){
      this.context.renderLogIn()
      window.alert('Must be logged in!')
    }
    else if (this.context.logged_in){
      this.setState({
        up_votes: this.state.up_votes + 1
      }, () => {
        this.context.addUpVote(this.props.skater.id, this.state.up_votes)
      })     
    }
  }

  handleDeleteButtonClicked = () => {
    this.context.deleteSkater(this.props.skater.id)
  }

  render() {
    let skater = this.props.skater
    return (
        <div className='Card'>
            <div className='inner'>
                <div className='back'>
                    {this.context.user === 'admin' &&
                      <button onClick={() => this.handleDeleteButtonClicked()} className='delete'>
                        <div className='front-x'>
                          <img src='error.svg' alt='x'/>
                        </div>
                        <div className='back-x'>
                          <img src='error-hover.svg' alt='x' />
                        </div>
                      </button>}
                    <h1 className='skater-heading'> {skater.name} </h1>
                    <p> {skater.location} </p>
                    <p> {skater.bio} </p>
                    <p> <a href={`http://www.instagram.com/${skater.instagram}`} target='blank'> @{skater.instagram} </a> </p>
                    <p> {this.state.up_votes} up-votes </p>
                    <button onClick={() => this.handleUpVoteClick()} className='Upvote'> up-vote </button><br />
                    <Link to={{ pathname: `/comments/${skater.id}`,
                                state: {
                                    skater: {skater}
                                }
                            }} className='view-comments'> view comments </Link>
                </div>
                <div className='front'>
                    <img className='skater-img' src={skater.img_url} alt={skater.name} style={{height: '200px', width: 'auto'}}/>
                    <h2> {skater.name} </h2>
                    <p> Up Votes: {this.state.up_votes} </p>
                </div>
            </div>
        </div>
    )
  }
}

Card.defaultProps = {
    skaters: {},
}