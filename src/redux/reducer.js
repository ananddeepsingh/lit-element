import { ADD_TODO, UPDATE_TODO_STATUS, CLEAR_COMPLETED, UPDATE_FILTER } from './actions.js';
import { createSelector } from 'reselect';

export const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.todo === todo ? { ...todo, completed: action.completed } : todo
        )
      }
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter( todo => !todo.completed )
      }
    default:
      return state
  }
}

const getToDoSelector = state => state.todos; 
const getFilterSelector = state => state.filter; 

export const getVisibleTodosSelector = createSelector(
  getToDoSelector,
  getFilterSelector,
  (todos, filter) => {
    if ( VisibilityFilters.SHOW_ACTIVE === filter ) {
      return todos.filter(todo => !todo.completed)
    } else if ( VisibilityFilters.SHOW_COMPLETED === filter ) {
      return todos.filter(todo => todo.completed)
    } else {
      return todos
    }
  }
)