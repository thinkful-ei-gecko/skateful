import React from 'react'
import { withRouter } from 'react-router-dom'
import SkatersService from '../Services/skater-api-service'

const SkatersContext = React.createContext({
    skaters: [],
    comments: [],
    addSkater: () => {},
    setSkater: () => {},
    deleteSkater: () => {},
    handleLoginSuccess: () => {},
    handleLogoutSucess: () => {},
    setComments: () => {},
    addComment: () => {},
    log_in_error: null,
    logged_in: null,
    updateLoginError: () => {},
    user: null,
    updateUser: () => {},
    deleteComment: () => {},
    updateComment: () => {},
    renderAddNewCard: () => {},
    renderMainPage: () => {},
    renderLogIn: () => {},
    renderCommentSection: () => {},
    addUpVote: () => {},
})

export default SkatersContext


class SkaterListProvide extends React.Component {
    state = {
        skaters: [],
        comments: [],
        logged_in: null,
        log_in_error: null,
        user: null
    }

    addUpVote = (skaterId, newUpvoteCount) => {
      console.log(this.state.skaters.map(skater => skater.up_votes))
      SkatersService.addVote(skaterId, newUpvoteCount)
    }

    updateComment = (skaterId, commentId, newComment) => {
      SkatersService.editComment(skaterId, commentId, newComment)
        .then(() => {
          let newComments = [...this.state.comments]
          newComments.find(comment => comment.id === commentId).comment = newComment;
          this.setState({
            comments: newComments
          })
        })
        .catch(error => console.log(error))
    }

    deleteSkater = (skaterId) => {
      SkatersService.deleteSkater(skaterId)
        .then(() => {
          let newSkaters = [...this.state.skaters]
          newSkaters = newSkaters.filter(skater => skater.id !== skaterId)
          this.setState({
            skaters: newSkaters
          })
        }) 
        .catch(err => console.log(err))
    }

    deleteComment = (skaterId, commentId) => {
      console.log(commentId)
      SkatersService.deleteComment(skaterId, commentId)
        .then(() => {
          let newComments = [...this.state.comments]
          newComments = newComments.filter(comment => comment.id !== commentId)
          this.setState({
            comments: newComments
          })
        })
        .catch(error => console.log(error))  
    } 

    updateUser = (user) => {
      this.setState({
        user: user
      })
    }

    updateLoginError = (errorMessage) => {
      console.log(errorMessage)
        this.setState({
            log_in_error: errorMessage
        })
    }

    addSkater = (skater) => {
        this.setState({
          skaters: [...this.state.skaters, skater]
        })
    }
    
    addComment = (comment) => {
        this.setState({
            comments: [...this.state.comments, comment]
        })
    }

    handleLoginSuccess = (authToken) => {
        this.setState({
            logged_in: authToken
        })
        this.props.history.push('/')
    }

    handleLogoutSuccess = () => {
        this.setState({
            logged_in: null
        })
        this.props.history.push('/')
    }

    renderMainPage = () => {
        this.props.history.push('/')
    }

    renderLogIn = () => {
        this.props.history.push('/log-in')
    }

    renderAddNewCard = () => {
        this.props.history.push('/new-card')
    }

    renderCommentSection = (skaterId) => {
        this.props.history.push(`/comments/${skaterId}`)
    }

    setSkaters = skaters => {
        this.setState({ skaters })
    }

    setComments = comments => {
        this.setState({ comments })
    }

    render() {
        const value = {
            skaters: this.state.skaters,
            comments: this.state.comments,
            addSkater: this.addSkater,
            setSkaters: this.setSkaters,
            deleteSkater: this.deleteSkater,
            addComment: this.addComment,
            setComments: this.setComments,
            handleLoginSuccess: this.handleLoginSuccess,
            handleLogoutSuccess: this.handleLogoutSuccess,
            logged_in: this.state.logged_in,
            renderLogIn: this.renderLogIn,
            renderAddNewCard: this.renderAddNewCard,
            renderMainPage: this.renderMainPage,
            log_in_error: this.state.log_in_error,
            updateLoginError: this.updateLoginError,
            renderCommentSection: this.renderCommentSection,
            user: this.state.user,
            updateUser: this.updateUser,
            deleteComment: this.deleteComment,
            updateComment: this.updateComment,
            addUpVote: this.addUpVote
        }
        return (
            <SkatersContext.Provider value={value}>
                {this.props.children}
            </SkatersContext.Provider>
        )
    }
}

export const SkaterListProvider = withRouter(SkaterListProvide)

