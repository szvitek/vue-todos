<script setup>
import { ref, watch } from 'vue'
import { uid } from 'uid'
import { Icon } from '@iconify/vue'
import TodoCreator from '../components/TodoCreator.vue'
import TodoItem from '../components/TodoItem.vue'
const todoList = ref([])

watch(
  todoList,
  (/*newValue, oldValue*/) => {
    saveTodoListToLocalStorage()
  },
  {
    deep: true
  }
)

const loadTodoListFromLocalStorage = () => {
  const savedTodoList = JSON.parse(localStorage.getItem('vue-todos'))
  if (savedTodoList) {
    todoList.value = savedTodoList
  }
}

loadTodoListFromLocalStorage()

const saveTodoListToLocalStorage = () => {
  console.log('update localstorage')
  localStorage.setItem('vue-todos', JSON.stringify(todoList.value))
}

const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: null,
    isEditing: null
  })
}

const toggleTodoComplete = (todoIdx) => {
  todoList.value[todoIdx].isCompleted = !todoList.value[todoIdx].isCompleted
}

const toggleEditTodo = (todoIdx) => {
  todoList.value[todoIdx].isEditing = !todoList.value[todoIdx].isEditing
}

const updateTodo = (todoVal, todoIdx) => {
  todoList.value[todoIdx].todo = todoVal
}

const deleteTodo = (todoId) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== todoId)
}
</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <TodoCreator @create-todo="createTodo" />
    <ul class="todo-list" v-if="todoList.length">
      <TodoItem
        v-for="(todo, index) in todoList"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle-complete="toggleTodoComplete"
        @edit-todo="toggleEditTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="noto-v1:sad-but-relieved-face" width="22" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
