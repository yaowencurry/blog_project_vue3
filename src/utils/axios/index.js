import axios from 'axios'
import { Loading } from 'element-ui'

let LoadingRequest

function getRequest (url, data) {
  LoadingRequest = Loading.service({
    fullscreen: true,
    text: '数据加载中~~~',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return axios.get(url, {
    params: { ...data }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    LoadingRequest.close()
  })
}
function postRequest (url, data) {
  LoadingRequest = Loading.service({
    fullscreen: true,
    text: '数据加载中~~~',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  return axios.post(url, data)
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setTimeout(() => {
        LoadingRequest.close()
      }, 2000)
    })
}
export default {
  get: getRequest,
  post: postRequest
}
