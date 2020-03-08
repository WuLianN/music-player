import api from '../../api/index'
import { tencent, kuwo } from './common'

export default {
  WY: (id) => {
    return api.getUrl(id)
  },

  QQ: (id) => {
    return Promise.resolve(
      `${tencent}/url?id=${id}`
    )
  },

  KW: (id) => {
    return Promise.resolve(
      `${kuwo}/url?id=${id}`
    )
  }
}
