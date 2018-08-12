import React, { Component } from 'react'
import api from './Api'
import {Redirect} from 'react-router-dom'


const statuses = {
	'watched': 'Assistido',
	'watching': 'Assistindo',
	'toWatch': 'Assistir'
}

class NewTvShow extends Component {
	constructor(props) {
		super(props)

		this.state = {
			genres: [],
			isLoading: false,
			redirect: false
		}
		this.saveShows = this.saveShows.bind(this)
	}
	componentDidMount() {
		this.setState({ isLoading: true })
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
			name: this.refs.name.value,
			status: this.refs.status.value,
			genre: this.refs.genre.value,
			comments: this.refs.comment.value  
		}
		api.saveSeries(newSeries)
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
				<h1> New TvShow </h1>
				<form>
					Name: <input type="text" ref='name' className="form-control" /> <br />
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

export default NewTvShow