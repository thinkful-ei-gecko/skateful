import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Nav from '../Nav/Nav';
import MainPage from '../../Routes/MainPage/MainPage'
import LoginPage from '../../Routes/LoginPage/LoginPage'
import NewCardPage from '../../Routes/NewCardPage/NewCardPage'
import { SkaterListProvider } from '../../Context/SkatersContext'
import './App.css'
import NotFoundPage from '../../Routes/NotFoundPage/NotFoundPage';
import RegistationPage from '../../Routes/RegistrationPage/RegistrationPage';
import CommentSection from '../CommentSection/CommentSection'
import Footer from '../Footer/Footer'

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <SkaterListProvider>
          <main className='App'>
            <Nav />
            <section className='body'>
             <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/log-in' render={(props) => <LoginPage {...props} onLoginSuccess={this.handleLoginSuccess} />} />
              <Route path='/register' component={RegistationPage} />
              <Route path='/new-card' render={(props) => <NewCardPage {...props} add={this.addSkater}/>} />
              <Route path='/comments/:skaterId' component={CommentSection} />
              <Route component={NotFoundPage} />
             </Switch>
            </section>
          </main>
          <Footer />
        </SkaterListProvider>
      </Router>
    );
  }
}