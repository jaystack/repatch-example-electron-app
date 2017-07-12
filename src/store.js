import Store, { thunk, Reducer, Thunk } from 'repatch'
import api from './api'

export default new Store({
  todos: [],
  isFetching: false,
  error: null,
  removingTodoId: null
}).addMiddleware(thunk.withExtraArgument(api))
