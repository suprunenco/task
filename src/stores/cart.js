import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    goods: {},
    cost: {}
  }),
  actions: {
    init () {
      this.goods = JSON.parse(localStorage.getItem('cart')) || {}
    },
    addGood (goodId, goodCount) {
      try {
        if (goodCount === 0) delete this.goods[goodId]
        else {
          if (goodCount === undefined) {
            if (this.goods[goodId] !== undefined) goodCount = this.goods[goodId] + 1
            else goodCount = 1
          }
          this.goods[goodId] = parseInt(goodCount)
        }
      } catch (e) {
        return false
      }
      this.saveToStorage()
      return true
    },
    removeGood (goodId) {
      try {
        delete this.goods[goodId]
        delete this.cost[goodId]
      } catch (e) {
        return false
      }
      this.saveToStorage()
      return true
    },
    clearCart () {
      this.goods = {}
      this.cost = {}
      localStorage.removeItem('cart')
    },
    saveToStorage () {
      localStorage.setItem('cart', JSON.stringify(this.goods))
    },
    setGoodCost (goodId, cost) {
      this.cost[goodId] = parseFloat(cost)
    }
  },
  getters: {
    getGoodQuantity: (state) => (goodId) => {
      try {
        return parseInt(state.goods[goodId])
      } catch (e) {
        return 0
      }
    },
    getTotalQuantity: (state) => {
      try {
        return parseInt(Object.values(state.goods).reduce((a, b) => a + b))
      } catch (e) {
        return 0
      }
    },
    getTotalCost: (state) => {
      try {
        return parseFloat(Object.values(state.cost)
                .reduce((a, b) => a + b))
                .toFixed(2)
      } catch (e) {
        return 0
      }
    }
  }
})
