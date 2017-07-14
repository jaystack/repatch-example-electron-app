import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  checkTodo,
  updateTodo,
  removeTodo,
  cancelRemovingTodo,
  confirmRemovingTodo
} from '../actions'

@connect(
  (state, { todoIndex }) => ({
    todo: state.todos[todoIndex],
    isRemovingTodo: state.removingTodoId === state.todos[todoIndex].id
  }),
  {
    checkTodo,
    updateTodo,
    removeTodo,
    cancelRemovingTodo,
    confirmRemovingTodo
  }
)
export default class Item extends React.PureComponent {
  static propTypes = {
    todoIndex: PropTypes.number,
    todo: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      checked: PropTypes.bool
    }),
    isRemovingTodo: PropTypes.bool,
    checkTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    cancelRemovingTodo: PropTypes.func,
    confirmRemovingTodo: PropTypes.func
  }

  render() {
    const {
      todo: { id, message, checked },
      isRemovingTodo,
      checkTodo,
      updateTodo,
      removeTodo,
      cancelRemovingTodo,
      confirmRemovingTodo
    } = this.props
    return (
      <div className="item">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => checkTodo(id)}
        />
        <input
          type="text"
          value={message}
          onChange={evt => updateTodo(id, evt.target.value)}
        />
        {isRemovingTodo
          ? <span>
              <button onClick={() => confirmRemovingTodo()}>YES</button>
              <button onClick={() => cancelRemovingTodo()}>NO</button>
            </span>
          : <button onClick={() => removeTodo(id)}>X</button>}
      </div>
    )
  }
}
