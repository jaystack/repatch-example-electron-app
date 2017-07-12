const todos = [
  {
    id: Math.random().toString(),
    message: 'shopping',
    checked: false
  },
  {
    id: Math.random().toString(),
    message: 'carwash',
    checked: false
  },
  {
    id: Math.random().toString(),
    message: 'haircut',
    checked: true
  }
]

export default {
  '/todos': {
    get: async () => JSON.parse(JSON.stringify(todos)),
    post: async () => {
      todos.push({ id: Math.random().toString(), message: '', checked: false })
    },
    put: async ({ id }, { message }) => {
      const todo = todos.find(todo => todo.id === id)
      todo.message = message
    },
    patch: async ({ id }) => {
      const todo = todos.find(todo => todo.id === id)
      todo.checked = !todo.checked
    },
    delete: async ({ id }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id)
      todos.splice(todoIndex, 1)
    }
  }
}
