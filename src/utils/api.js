import axios from 'axios'

const apiCall = ({ url, method, ...args }) => new Promise((resolve, reject) => {
  switch (method) {
    case 'POST':
      axios.post(url, args)
      .then(response => {
        if (response) {
            resolve(response)
        }
      })
      .catch(err => {
        reject(err)
      })
      break
    case 'GET':
      axios.get(url, args)
      .then(response => {
        if (response) {
          resolve(response)
        }
      })
      .catch(err => {
        reject(err)
      })
      break
  }
})

export default apiCall
