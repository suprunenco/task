import { defineStore } from 'pinia'
import apiCall from '../utils/api'

export const useCurrencyStore = defineStore({
  id: 'currency',
  state: () => ({
    currency: {},
    currentUSD: 0,
    manualCurrency: false
  }),
  actions: {
    loadCurrency () {
      const now = new Date().toDateString()
      try {
        const currency = JSON.parse(localStorage.getItem('currency'))
        if (currency !== null) {
          let lastDate = new Date(currency.date).toDateString()
          if (lastDate === now) {
            this.currency = currency
            return
          }
        }
      } catch (e) {
        localStorage.removeItem('currency')
      }
      apiCall({ url: 'https://www.cbr-xml-daily.ru/daily_json.js', method: 'GET' })
        .then(resp => {
          try {
            this.currency = {
              date: now,
              usd: parseFloat(resp.data.Valute.USD.Value).toFixed(2)
            }
            localStorage.setItem('currency', JSON.stringify(this.currency))
            if (!this.manualCurrency) this.setUSD(resp.data.Valute.USD.Value)
          } catch (e) {
            this.currency = {}
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    setUSD (newValue) {
      this.currentUSD = parseFloat(newValue).toFixed(2)
    },
    setManual (newValue) {
      this.manualCurrency = !!newValue
    }
  },
  getters: {
    getUSD: (state) => {
      try {
        return state.currency.usd
      } catch (e) {
        return 0
      }
    },
    getCurrentUSD: (state) => {
      try {
        return state.currentUSD
      } catch (e) {
        return 0
      }
    }
  }
})
