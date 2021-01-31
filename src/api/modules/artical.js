import axios from '../../utils/axios/index'
import { BASE_URL } from '../../utils/consts';

const ARTICAL_BASE_URL = BASE_URL + '/artical'

const ARTICAL_URL = {
    GET_ARTICAL_LIST: ARTICAL_BASE_URL + '/articallist',
    ADD_ARTICAL: ARTICAL_BASE_URL + '/addartical',
    GET_ARTICAL_DETAIL: ARTICAL_BASE_URL + '/articaldetail',
}

export default {
    //data: condition：string
    GET_ARTICAL_LIST: (data) => axios.getRequest(ARTICAL_URL.GET_ARTICAL_LIST, data),
    ADD_ARTICAL: (data) => axios.postRequest(ARTICAL_URL.ADD_ARTICAL, data),
    GET_ARTICAL_DETAIL: (data) => axios.getRequest(ARTICAL_URL.GET_ARTICAL_DETAIL, data)
}