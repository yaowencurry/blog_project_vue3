// export const BASE_URL = '/api'
export const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : ''