import React from 'react';
import {Component} from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import sendRequest from '../../lib/sendRequest';
import checkSession from './lib/checkSession.js';
import './styles/index.scss';


// Parents
// show a welcome message and some misc stuff
import Home from './pages/Home';
// show a search page with results
import Search from './pages/Search';
// show a sepcific item
import Show from './pages/Show';
// show the users liked recipes
import Favorites from './pages/Favorites';

// Components
// login / signup form
import Login from './components/forms/login';


class App extends Component{
  constructor(props){
    super()
    this.state = {
      isLoggedIn: null,
      loginMode: false,
      user: null
    }
  }

  componentDidMount(){
    this.conditionalySetToken();
    this.getUserInfo();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.isLoggedIn !== prevState.isLoggedIn){
      this.getUserInfo();
    }
  }

  conditionalySetToken = () => {
    const token = checkSession()
    if(token){
      // set the user info to state
      this.setState({isLoggedIn:token})
    } else {
      this.setState({isLoggedIn: null})
    }
  }

  getUserInfo = () => {
    if (this.state.isLoggedIn === "true") {
      const userInfo = JSON.parse( localStorage.getItem('user') ).data
      this.setState({user: userInfo})
    }
  }

  handleLoginModeChange = () => {
    this.state.loginMode ? this.setState({loginMode: false}) : this.setState({loginMode: true})
  }

  handleLogin = (event, signup, credentials) => {
    event.preventDefault();
      if(credentials.username && credentials.password){
      if(!signup){
        sendRequest('/login', 'POST', credentials)
        .then(r => {
          sessionStorage.setItem('cookToken', 'true');
          // security is but a distant dream now
          localStorage.setItem('user', JSON.stringify(r.data))
          this.conditionalySetToken();
        })
      } else {
        sendRequest('/user/create', 'POST', credentials)
        .then(r => {
          this.handleLoginModeChange()
        })
      }
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.setItem('user', '')
    this.conditionalySetToken();
  }


  render() {
    return (
      <div className="App">
        { this.state.isLoggedIn !== null ?
          <div className="wrapper">
            <article className="nav-wrapper">
              <nav>
                <Link to="/">Home</Link>
                <Link to="/client/search">Search</Link>
                <Link to="/client/likes">Your Recipes</Link>
              </nav>
              <button onClick={(e) => this.handleLogout(e)}>Logout</button>
            </article>
            <Routes>
              <Route path="/" element={<Home user={this.state.user} />} />
              <Route path="/client/search" element={<Search user={this.state.user} />} />
              <Route path="/client/show/:id" element={<Show user={this.state.user} />} />
              <Route path="/client/likes" element={<Favorites user={this.state.user} />} />
            </Routes>
          </div>
        :
          <Login
            handleSubmit={this.handleLogin}
            handleLoginModeChange={this.handleLoginModeChange}
            mode={this.state.loginMode}
          />
        }
      </div>
    )
  }
}



const root = createRoot( document.getElementById('root') )
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

