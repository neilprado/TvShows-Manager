import React, { Component } from 'react'
import api from './Api'
import {Redirect} from 'react-router-dom'


const statuses = {
	'watched': 'Assistido',
	'watching': 'Assistindo',
	'toWatch': 'Assistir'
}

class EditShows extends Component {
	constructor(props) {
		super(props)

		this.state = {
			genres: [],
			isLoading: false,
      redirect: false,
      series: {}
		}
		this.saveShows = this.saveShows.bind(this)
	}
	componentDidMount() {
		this.setState({ isLoading: true })
		api.loadShowsById(this.props.match.params.id)
      .then((res) => {
        this.setState({series: res.data})
        this.refs.genre.value = this.state.series.genre 
        this.refs.comment.value = this.state.series.comments
        this.refs.status.value = this.state.series.status 
      })
		api.loadGenres()
			.then((res) => {
				this.setState({
					isLoading: false,
					genres: res.data
				})
			})
	}

	saveShows(){
		const newSeries = {
      id: this.props.match.params.id,
			name: this.refs.name.value,
			status: this.refs.status.value,
			genre: this.refs.genre.value,
			comments: this.refs.comment.value  
		}
		api.updateSeries(newSeries)
			.then((res) => {
				this.setState({
					redirect: '/series/'+this.refs.genre.value
				})
			})
		
	}

	render() {
		return (
			<section className="intro-section">
				{this.state.redirect && <Redirect to ={this.state.redirect} />}
				<h1> Edit TvShow </h1>
				<form>
					Name: <input type="text" defaultValue={this.state.series.name} ref='name' className="form-control" /> <br />
					Status: <select ref='status'>
						{Object
							.keys(statuses)
							.map(
								key => <option key = {key} value={key}> {statuses[key]} </option>
							)
						}
					</select> <br />
					Genre: <select ref='genre'>
						{this.state.genres
							.map(
								key => <option key = {key} value={key}> {key} </option>
							)
						}
					</select> <br />
					Comments: <textarea ref='comment' className="form-control" /> <br />
					<button type="button" onClick={this.saveShows}> Submit </button>
				</form>
			</section>
		)
	}
}

export default EditShows