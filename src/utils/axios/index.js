import axios from 'axios'
import { ElLoading } from 'element-plus'

let LoadingRequest

axios.default.baseURL = 'http://localhost:6300';

function getRequest (url, data, isLoading = true) {
  if (isLoading) {
    LoadingRequest = ElLoading.service({
      fullscreen: true,
      text: '数据加载中~~~',
      background: 'rgba(0, 0, 0, 0.3)',
      spinner: 'el-icon-loading'
    })
  }
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: { ...data }
    }).then(res => {
      if (res.code === 500) {
        reject(res.message)
      } else {
        resolve(res.data)
      }
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      if (isLoading) {
        LoadingRequest.close()
      }
    })
  })
}
function postRequest (url, data, isLoading = true) {
  if (isLoading) {
    LoadingRequest = ElLoading.service({
      fullscreen: true,
      text: '数据加载中~~~',
      background: 'rgba(0, 0, 0, 0.3)',
      spinner: 'el-icon-loading'
    })
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      if (res.code === 500) {
        reject(res.message)
      } else {
        resolve(res.data)
      }
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      if (isLoading) {
        LoadingRequest.close()
      }
    })
  })

}
export default {
  getRequest,
  postRequest
}
