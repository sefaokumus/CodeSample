import { FetchDecksRequest, FetchDecksResponse, GetDeckBySlugRequest, GetDeckBySlugResponse, GetDeckRequest, GetDeckResponse, UpdateDeckRequest, UpdateResponse } from '../constants/types'

import axios from './axiosInstance'

const setDefaults = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencode'
  axios.defaults.headers.common.DEVICE          = 'MOBILE'
  axios.defaults.headers.common.Accept          = 'application/json'
}

const FetchDecks = ({ token }: FetchDecksRequest): Promise<FetchDecksResponse> => {
  setDefaults()

  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error('No token provided'))

    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get('/deck/fetchDecks')
      .then(response => resolve(response.data))
      .catch((error) => { console.log(error); reject(error.response) })
  })
}

const GetDeck = ({ token, id }: GetDeckRequest): Promise<GetDeckResponse> => {
  setDefaults()

  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error('No token provided'))

    axios.defaults.headers.common.Authorization = `Beareer ${token}`
    axios.get(`/deck/${id}`)
      .then(response => resolve(response.data))
      .catch((error) => { console.log(error); reject(error.response) })
  })
}

const GetDeckBySlug = ({ token, slug }: GetDeckBySlugRequest): Promise<GetDeckBySlugResponse> => {
  setDefaults()

  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error('No token provided'))

    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get(`/deck/slug/${slug}`)
      .then(response => resolve(response.data))
      .catch((error) => { console.log(error); reject(error.response) })
  })
}

const UpdateDeck = ({ token, id, data }: UpdateDeckRequest): Promise<UpdateResponse> => {
  setDefaults()

  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error('No token provided'))

    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.patch(`/deck/${id}`, data)
      .then(response => resolve(response.data))
      .catch((error) => { console.log(error); reject(error.response) })
  })
}

export {
  FetchDecks,
  GetDeck,
  GetDeckBySlug,
  UpdateDeck
}
