import { defineStore } from 'pinia'
import { uid } from 'uid'
import { computed, ref } from 'vue'

interface Todo {
  id: string
  todo: string
  isCompleted: boolean
  isEditing: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  const todoCompleted = computed(() => {
    return todos.value.every((todo) => todo.isCompleted)
  })

  const createTodo = (todo: string) => {
    todos.value.push({
      id: uid(),
      todo,
      isCompleted: false,
      isEditing: false
    })
  }

  const toggleTodoComplete = (todoIdx: number) => {
    todos.value[todoIdx].isCompleted = !todos.value[todoIdx].isCompleted
  }

  const toggleEditTodo = (todoIdx: number) => {
    todos.value[todoIdx].isEditing = !todos.value[todoIdx].isEditing
  }

  const updateTodo = (todoVal: string, todoIdx: number) => {
    todos.value[todoIdx].todo = todoVal
  }

  const deleteTodo = (todoId: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== todoId)
  }

  const loadtodosFromLocalStorage = () => {
    const savedtodos = JSON.parse(localStorage.getItem('vue-todos') || '[]')
    if (savedtodos) {
      todos.value = savedtodos
    }
  }

  const savetodosToLocalStorage = () => {
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
