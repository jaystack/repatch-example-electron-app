function call(method, path, query, body) {
  return () => async (dispatch, getState, api) => {
    dispatch(state => ({ ...state, isFetching: true }))
    try {
      return await api[path][method.toLowerCase()](query, body)
    } catch (error) {
      dispatch(state => ({ ...state, error: error.message }))
    } finally {
      dispatch(state => ({ ...state, isFetching: false }))
    }
  }
}

export function fetchTodos() {
  return () => async dispatch => {
    dispatch(cancelRemovingTodo())
    const todos = await dispatch(call('GET', '/todos'))
    dispatch(state => ({ ...state, todos }))
  }
}

export function addTodo() {
  return () => async dispatch => {
    dispatch(cancelRemovingTodo())
    await dispatch(call('POST', '/todos'))
    await dispatch(fetchTodos())
  }
}

export function updateTodo(id, message) {
  return () => async dispatch => {
    dispatch(cancelRemovingTodo())
    await dispatch(call('PUT', '/todos', { id }, { message }))
    await dispatch(fetchTodos())
  }
}

export function checkTodo(id) {
  return () => async dispatch => {
    dispatch(cancelRemovingTodo())
    await dispatch(call('PATCH', '/todos', { id }))
    await dispatch(fetchTodos())
  }
}

export function removeTodo(removingTodoId) {
  return state => ({ ...state, removingTodoId })
}

export function cancelRemovingTodo() {
  return state => ({ ...state, removingTodoId: null })
}

export function confirmRemovingTodo() {
  return () => async (dispatch, getState) => {
    const id = getState().removingTodoId
    await dispatch(call('DELETE', '/todos', { id }))
    await dispatch(fetchTodos())
  }
}
