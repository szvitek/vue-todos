import { defineStore } from 'pinia'
import { uid } from 'uid'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  const todoCompleted = computed(() => {
    return todos.value.every((todo) => todo.isCompleted)
  })

  const createTodo = (todo) => {
    todos.value.push({
      id: uid(),
      todo,
      isCompleted: null,
      isEditing: null
    })
  }

  const toggleTodoComplete = (todoIdx) => {
    todos.value[todoIdx].isCompleted = !todos.value[todoIdx].isCompleted
  }

  const toggleEditTodo = (todoIdx) => {
    todos.value[todoIdx].isEditing = !todos.value[todoIdx].isEditing
  }

  const updateTodo = (todoVal, todoIdx) => {
    todos.value[todoIdx].todo = todoVal
  }

  const deleteTodo = (todoId) => {
    todos.value = todos.value.filter((todo) => todo.id !== todoId)
  }

  const loadtodosFromLocalStorage = () => {
    const savedtodos = JSON.parse(localStorage.getItem('vue-todos'))
    if (savedtodos) {
      todos.value = savedtodos
    }
  }

  const savetodosToLocalStorage = () => {
    console.log('update localstorage')
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  }

  return {
    todos,
    todoCompleted,
    createTodo,
    toggleTodoComplete,
    toggleEditTodo,
    updateTodo,
    deleteTodo,
    loadtodosFromLocalStorage,
    savetodosToLocalStorage
  }
})
