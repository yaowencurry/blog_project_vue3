import articalApi from './modules/artical'
import commentApi from './modules/comment'

export default {
    ...articalApi,
    ...commentApi
}