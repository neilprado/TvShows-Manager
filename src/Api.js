import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000/'
})

export const loadGenres = () => api.get('genres')
export const saveSeries = (newSeries) => api.post('series', newSeries)
export const loadShows = (genre) => api.get('series?genre='+genre)

const apis = {
	loadGenres: loadGenres,
	saveSeries: saveSeries,
	loadShows: loadShows
}

export default apis