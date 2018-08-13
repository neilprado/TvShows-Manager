import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import NewTvShow from './NewTvShow.js'
import Shows from './Shows'
import Home from './Home.js'
import EditShows from './EditShows.js'

// Verificar functional stateless component
const About = () => <section className="intro-section"><h1> Sobre </h1> </section>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                  <img src="/images/logo.png" height="30" />
                </a>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to='/'>Home</Link>
                  </li>
                  <li>
                    <Link to='/new'>New Tv Show</Link>
                  </li>
                  <li>
                    <Link to='/about'>About</Link>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/series-edit/:id/' component={EditShows} />
          <Route path='/series/:genre' component={Shows} />
          <Route exact path='/about' component={About} />
          <Route exact path='/new' component={NewTvShow} />

        </div>
      </Router>
    )
  }
}

export default App
