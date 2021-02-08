import axios from '../../utils/axios/index'
import { BASE_URL } from '../../utils/consts';

const COMMENT_BASE_URL = BASE_URL + '/comment'

const COMMENT_URL = {
    ADD_COMMENT: COMMENT_BASE_URL + '/addcomment',
    GET_COMMENT_LIST: COMMENT_BASE_URL + '/list',
}

export default {
    //data: condition：string
    ADD_COMMENT: (data) => axios.getRequest(COMMENT_URL.ADD_COMMENT, data),
    GET_COMMENT_LIST: (data) => axios.getRequest(COMMENT_URL.GET_COMMENT_LIST, data, false),
}