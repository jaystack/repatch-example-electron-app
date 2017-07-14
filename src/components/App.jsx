import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTodos, addTodo } from '../actions'
import Item from './Item'

@connect(
  state => ({
    todos: state.todos
  }),
  {
    fetchTodos,
    addTodo
  }
)
export default class App extends React.PureComponent {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.string,
        checked: PropTypes.bool
      })
    ),
    fetchTodos: PropTypes.func,
    addTodo: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { todos, addTodo } = this.props
    return (
      <div className="app">
        {todos.map((todo, index) => <Item key={todo.id} todoIndex={index} />)}
        <button onClick={() => addTodo()}>+</button>
      </div>
    )
  }
}
