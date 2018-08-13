import React, { Component } from 'react'
import api from './Api'
import { Redirect, Link } from 'react-router-dom'

const statuses = {
  'watched': 'Assistido',
  'watching': 'Assistindo',
  'toWatch': 'Assistir'
}

class Shows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      series: []
    }
    this.renderShows = this.renderShows.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  componentDidMount() {
    this.loadData()
  }

  loadData(){
    this.setState({ isLoading: true })
    api.loadShows(this.props.match.params.genre)
      .then((res) =>
        this.setState({
          isLoading: false,
          series: res.data
        })
      )
  }
  
  deleteShows(id){
    api.deleteShow(id)
      .then((res) => this.loadData())
  }
  renderShows(show) {
    return (
      <div key={show.id} className="item  col-xs-4 col-lg-4">
        <div className="thumbnail">
          <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              {show.name}</h4>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead">
                  {show.genre} / {statuses[show.status]}</p>
              </div>
              <div className="col-xs-12 col-md-6">
                <Link className="btn btn-success" to={'/series-edit/'+show.id}>Editar</Link>
                <a className="btn btn-success" onClick={() => this.deleteShows(show.id)}>Excluir</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <section id="intro" className="intro-section">
        <h1> Séries {this.props.match.params.genre}</h1>
        {this.state.isLoading && 
          <p> Loading now, please wait... </p>
        }
        {
          !this.state.isLoading && this.state.series.length === 0 &&
          <div className="alert alert-info"> Sorry, we don't have any shows here </div>
        }
        <div id="series" className="row list-group">
          {!this.state.isLoading &&
            this.state.series.map(this.renderShows)
          }
        </div>
      </section>
    )
  }
}
export default Shows