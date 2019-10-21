import React from 'react'
import { withRouter } from 'react-router-dom'

const SkatersContext = React.createContext({
    skaters: [],
    comments: [],
    addSkater: () => {},
    setSkater: () => {},
    handleLoginSuccess: () => {},
    handleLogoutSucess: () => {},
    setComments: () => {},
    addComment: () => {}
})

export default SkatersContext


class SkaterListProvide extends React.Component {
    state = {
        skaters: [],
        comments: [],
        logged_in: null
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

    setSkaters = skaters => {
        this.setState({ skaters })
    }

    setComments = comments => {
        this.setState({ comments })
    }

    doNothing = () => {
        const nothing = 'happens'
    }

    render() {
        const value = {
            skaters: this.state.skaters,
            comments: this.state.comments,
            addSkater: this.addSkater,
            setSkaters: this.setSkaters,
            addComment: this.addComment,
            setComments: this.setComments,
            handleLoginSuccess: this.handleLoginSuccess,
            handleLogoutSuccess: this.handleLogoutSuccess,
            logged_in: this.state.logged_in,
            renderLogIn: this.renderLogIn,
            renderAddNewCard: this.renderAddNewCard,
            renderMainPage: this.renderMainPage,
            doNothing: this.doNothing
        }
        return (
            <SkatersContext.Provider value={value}>
                {this.props.children}
            </SkatersContext.Provider>
        )
    }
}

export const SkaterListProvider = withRouter(SkaterListProvide)

