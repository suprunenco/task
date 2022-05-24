import { defineStore } from 'pinia'
import apiCall from '../utils/api'

export const useGoodsStore = defineStore({
  id: 'goods',
  state: () => ({
    goods: [],
    names: {}
  }),
  actions: {
    loadGoods () {
      apiCall({ url: '../_data/data.json', method: 'GET' })
        .then(resp => {
          try {
            this.goods = resp.data.Value.Goods
          } catch (e) {
            this.goods = []
          }
        })
        .catch(err => {
          console.log(err)
        })
      apiCall({ url: '../_data/names.json', method: 'GET' })
        .then(resp => {
          try {
            this.names = resp.data
          } catch (e) {
            this.names = {}
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    setCategoryName (id, name) {
      try {
        this.names[id].G = name
      } catch (e) {
        console.log(e)
      }
    },
    setGoodName (categoryId, id, name) {
      try {
        this.names[categoryId].B[id].N = name
      } catch (e) {
        console.log(e)
      }
    },
    setGoodQnt (id, qnt) {
      try {
        let goodIndex = this.goods.findIndex(good => {
          return good.T === id
        })
        if (goodIndex !== -1) this.goods[goodIndex].P = parseInt(qnt)

      } catch (e) {
        console.log(e)
      }
    },
    setGoodPrice (id, price) {
      try {
        let goodIndex = this.goods.findIndex(good => {
          return good.T === id
        })
        if (goodIndex !== -1) this.goods[goodIndex].C = parseFloat(price)

      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    goodsByCategories: (state) => {
      let goodsByCategories = {}
      if (state.goods.length && Object.keys(state.names).length) {
        try {
          state.goods.forEach(good => {
            try {
              goodsByCategories[good.G] = goodsByCategories[good.G] || {}
              goodsByCategories[good.G].name = state.names[good.G].G
              goodsByCategories[good.G].goods = goodsByCategories[good.G].goods || {}
              goodsByCategories[good.G].goods[good.T] = {}
              goodsByCategories[good.G].goods[good.T].name = state.names[good.G].B[good.T].N
              goodsByCategories[good.G].goods[good.T].price = parseFloat(good.C)
              goodsByCategories[good.G].goods[good.T].count = parseInt(good.P)
            } catch (e) {
              console.log(e)
            }
          })
        } catch (e) {
          return {}
        }
      }
      return goodsByCategories
    },
    goodById: (state) => (goodId) => {
      let needleGood = {}
      if (state.goods.length && Object.keys(state.names).length) {
        try {
          const goodItem = state.goods.find(g => parseInt(g.T) === parseInt(goodId))
          needleGood.name = state.names[goodItem.G].B[goodId].N
          needleGood.price = parseFloat(goodItem.C)
          needleGood.count = parseInt(goodItem.P)
        } catch (e) {
          return {}
        }
      }
      return needleGood
    }
  }
})
