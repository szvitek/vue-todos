import { defineStore } from 'pinia'

interface CounterState {
  count: number
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
