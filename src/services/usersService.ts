import {
  GetDeckStructureRequest,
  GetDeckStructureResponse,
  GetRevisionHistoryRequest,
  GetRevisionHistoryResponse,
  GetUserInterestsRequest,
  GetUserInterestsResponse,
  GetUserStatsRequest,
  GetUserStatsRequestResponse,
  SaveHistoricalRevisionRequest,
  SaveHistoricalRevisionResponse,
  UpdateRevisionRequest,
  UpdateRevisionResponse,
  UpdateUserInterestRequest,
  UpdateUserInterestResponse,
  UpdateUserStatsRequest,
  UpdateUserStatsResponse
} from '../constants/types'
// import { removeExtraDataFromRevisionHistory } from '../utils/helper'

import axios from './axiosInstance'

const setDefaults = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencode'
  axios.defaults.headers.common.DEVICE          = 'MOBILE'
  axios.defaults.headers.common.Accept          = 'application/json'
}

const GetRevisionHistory = ({ token }: GetRevisionHistoryRequest): Promise<GetRevisionHistoryResponse> => {
  setDefaults()

  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get('/user/revision').then(response => {
      resolve(response.data)

      // TODO: Remove this once checked with the client
      // if (!sort) { resolve(response.data) }

      // if (response.data && !Array.isArray(response.data)) {  resolve(response.data) }

      // if (response?.data.length > 0) {
      //   const updatedRevisions = moveRevisionsForward(response.data)

      //   updatedRevisions.forEach(revision => {
      //     revision.due_date = moment(revision.due_date).isValid() ? revision.due_date.replace(/-/g, '/') : revision.due_date
      //   })

      //   return updatedRevisions.sort((a, b) => {
      //     return moment(a.due_date).isBefore(moment(b.due_date)) ? -1 : 1
      //   })
      // }
    })
      .catch((error) => { console.log(error); reject(error.response) })
  })
}

const GetUserStats = ({ token }: GetUserStatsRequest): Promise<GetUserStatsRequestResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get('/user/stats')
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const GetUserInterests = ({ token }: GetUserInterestsRequest): Promise<GetUserInterestsResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get('/user/interest')
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const GetDeckStructure = ({ token }: GetDeckStructureRequest): Promise<GetDeckStructureResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.get('/user/structure')
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const UpdateUserInterests = ({  token, user_interests }: UpdateUserInterestRequest): Promise<UpdateUserInterestResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.put('/user/interest', { user_interests })
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const UpdateRevision = ({ token, revision_history }: UpdateRevisionRequest): Promise<UpdateRevisionResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    // removing card property from revision history causes error. Thats
    // const dataToUpload                          = removeExtraDataFromRevisionHistory(revision_history)

    axios.put('/user/revision', { revision_history })
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

const UpdateUserStats = ({ token, data }: UpdateUserStatsRequest): Promise<UpdateUserStatsResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`

    axios.put('/user/stats', data)
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

const SaveHistoricalRevision = ({ token, data }: SaveHistoricalRevisionRequest): Promise<SaveHistoricalRevisionResponse> => {
  setDefaults()
  return new Promise((resolve, reject) => {
    if (!token) reject(new Error('No token provided'))
    axios.defaults.headers.common.Authorization = `Beareer ${token}`
    axios.defaults.headers.common.isEnCoded     = true

    axios.post('/historical-revision', {data})
      .then(response => resolve(response.data))
      .catch((error) => { reject(error.response) })
  })
}

export {
  GetRevisionHistory,
  GetUserStats,
  GetUserInterests,
  GetDeckStructure,
  UpdateUserInterests,
  UpdateRevision,
  UpdateUserStats,
  SaveHistoricalRevision
}
