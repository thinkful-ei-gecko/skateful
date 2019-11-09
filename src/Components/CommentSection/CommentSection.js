import React from 'react'
import './CommentSection.css'
import SkatersContext from '../../Context/SkatersContext'
import SkaterAPIService from '../../Services/skater-api-service';
import TokenService from '../../Services/token-service';

export default class CommentSection extends React.Component {
  static contextType = SkatersContext;
  
  state = {
    editCommentId: null
  }

  componentDidMount() {
    SkaterAPIService.getSkaters()
      .then(this.context.setSkaters)
    SkaterAPIService.getComments(this.props.match.params.skaterId)
      .then(this.context.setComments)
  }

  handleCommentSubmit = (ev) => {
    ev.preventDefault()
    if (!TokenService.hasAuthToken()) {
      this.context.updateLoginError('You must be logged in to post a comment!')
      this.context.renderLogIn()
      // needs to break here, so that the comment doesn't submit
    }
    else if(TokenService.hasAuthToken()) {
      const { comment }= ev.target
      const skaterId = this.props.match.params.skaterId

      SkaterAPIService.postComment(skaterId, comment.value) 
        .then(this.context.addComment)
        .then(() => {
          this.refs.comment.value = ''
          this.context.renderCommentSection(skaterId)
      })
    }
  }

  handleEditCommentClicked = (id, newComment) => {
    this.context.updateComment(this.props.match.params.skaterId, id, newComment)
    this.setState({
      editCommentId: null
    })
  }

  handleDeleteCommentClicked = (id) => {
    this.context.deleteComment(this.props.match.params.skaterId, id)
  }

  dater = (dateString) =>  {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  render() {
    let skaterId = this.props.match.params.skaterId
    let skaterIdInt = parseInt(skaterId, 10);

    let skater = this.context.skaters.find(skater => skaterIdInt === skater.id) || {name: ''}
    let comments = this.context.comments

    return(
        <div className='CommentBox'>
          <h1> {skater.name} </h1>
          {!comments.length ? <div>No Comments</div> : (
            <ul className='CommentsDisplay'>
                {comments.map((comment, i) => 
                  <li key={i}>
                    <b className='user-name'>
                      {comment.user.user_name}
                    </b> - {comment.id === this.state.editCommentId 
                            ? <div> 
                                <input type='text' defaultValue={comment.comment} ref='comment'/> 
                                <button onClick = {() => this.handleEditCommentClicked(comment.id, this.refs.comment.value)}> done </button>
                                <button onClick={() => this.setState({editCommentId: null})}> cancel </button> 
                              </div>
                            : comment.comment 
                          }
                    <br /> 
                    <i className='date'>
                      {this.dater(comment.date_published)}
                    </i>
                    {window.localStorage.getItem('user') === comment.user.user_name ? 
                    <>
                      <button onClick={() => this.setState({editCommentId: comment.id})}> edit </button>
                      <button onClick={() => this.handleDeleteCommentClicked(comment.id)}> delete </button>
                    </> :
                    null
                    }
                  </li>)}
            </ul> 
          )}
          <form onSubmit={this.handleCommentSubmit}>
            <textarea name='comment' ref='comment'/>
            <input type='submit' className='submit'/>
          </form>
        </div>
    )
  }
}