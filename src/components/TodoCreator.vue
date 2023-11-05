<script lang="ts" setup>
import { defineEmits, reactive } from 'vue'
import TodoButton from './TodoButton.vue'

const emit = defineEmits(['create-todo'])

// use ref for primitive values
// Non-primitive values are turned into reactive proxies via reactive()
const todoState = reactive({
  todo: '',
  invalid: false,
  errMsg: ''
})

const createTodo = () => {
  todoState.invalid = false
  if (todoState.todo.trim() !== '') {
    emit('create-todo', todoState.todo)
    todoState.todo = ''
    return
  }
  todoState.invalid = true
  todoState.errMsg = 'Todo value cannot be empty'
}
</script>

<template>
  <form @submit.prevent="createTodo" class="input-wrap" :class="{ 'input-err': todoState.invalid }">
    <input type="text" v-model="todoState.todo" />
    <TodoButton />
  </form>
  <p v-show="todoState.invalid" class="err-msg">
    {{ todoState.errMsg }}
  </p>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow:
      0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
