import apiConfig from '@/config/api'

export const api = pathname =>
  (location.origin === 'http://localhost:8080'
    ? apiConfig.dev
    : apiConfig.prod) + pathname

export const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})