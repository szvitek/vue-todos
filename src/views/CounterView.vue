<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { decrement, increment } = store

function add(value) {
  // method 1:
  // store.$patch({
  //   count: count.value + value
  // })

  // method 2:
  store.$patch((state) => {
    state.count += value
  })
}

function reset() {
  store.$reset()
}
</script>

<template>
  <div class="counter-wrapper">
    <div class="count">{{ count }}</div>
    <div class="count">Double: {{ doubleCount }}</div>
    <div class="buttons">
      <button @click="decrement">-</button>
      <button @click="increment">+</button>
      <button @click="add(2)">+2</button>
      <button @click="reset">reset</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .count {
    font-size: 60px;
    margin: 20px;
  }

  .buttons button {
    font-size: 40px;
    margin: 10px;
  }
}
</style>
