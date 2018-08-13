import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000/'
})

export const loadGenres = () => api.get('genres')
export const saveSeries = (newSeries) => api.post('series', newSeries)
export const updateSeries = (series) => api.put('series/'+ series.id, series)
export const loadShows = (genre) => api.get('series?genre='+genre)
export const deleteShow = (id) => api.delete('series/'+id)
export const loadShowsById = (id) => api.get('series/'+id)

const apis = {
	loadGenres,
	saveSeries,
	updateSeries,
	loadShows,
	deleteShow,
	loadShowsById
}

export default apis