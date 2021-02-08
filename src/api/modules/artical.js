import axios from '../../utils/axios/index'
import { BASE_URL } from '../../utils/consts';

const ARTICAL_BASE_URL = BASE_URL + '/artical'

const ARTICAL_URL = {
    GET_ARTICAL_LIST: ARTICAL_BASE_URL + '/articallist',
    ADD_ARTICAL: ARTICAL_BASE_URL + '/addartical',
    GET_ARTICAL_DETAIL: ARTICAL_BASE_URL + '/articaldetail',
    GET_HOT_ARTICAL_LIST: ARTICAL_BASE_URL + '/hotlist',
    UPDATE_ARTICAL: ARTICAL_BASE_URL + '/update',
}

export default {
    //data: condition：string
    GET_ARTICAL_LIST: (data) => axios.getRequest(ARTICAL_URL.GET_ARTICAL_LIST, data, false),
    ADD_ARTICAL: (data, isLoading = true) => axios.postRequest(ARTICAL_URL.ADD_ARTICAL, data, isLoading),
    GET_ARTICAL_DETAIL: (data) => axios.getRequest(ARTICAL_URL.GET_ARTICAL_DETAIL, data, false),
    GET_HOT_ARTICAL_LIST: (data) => axios.getRequest(ARTICAL_URL.GET_HOT_ARTICAL_LIST, data, false),
    UPDATE_ARTICAL: (data, isLoading = true) => axios.postRequest(ARTICAL_URL.UPDATE_ARTICAL, data, isLoading, false),
}