// Import dependencies
import axios     from 'axios'
import Constants from 'expo-constants'

const api = axios.create({
  baseURL: Constants?.manifest?.extra?.api
})

export default api
