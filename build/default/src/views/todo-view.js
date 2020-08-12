import { LitElement, html } from "../../node_modules/@polymer/lit-element/lit-element.js";
import { VisibilityFilters, getVisibleTodosSelector } from '../redux/reducer.js';
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import { store } from '../redux/store.js';
import { addTodo, updateTodoStatus, updateFilter, clearCompleted } from '../redux/actions.js';
import { BaseView } from './base-view.js';

class TodoView extends connect(store)(BaseView) {
  static get properties() {
    return {
      todos: {
        type: Array
      },
      filter: {
        type: String
      },
      task: {
        type: String
      }
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
    this.task = "";
  }

  updateTask(e) {
    this.task = e.target.value;
    console.log(this.task);
  }

  addToDo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.querySelector(".task-name").value = "";
    }
  }

  shortcutListener(e) {
    if (e.key === 'Enter') this.addToDo();
  }

  updateToDosStatus(updatedTodo, completed) {
    store.dispatch(updateTodoStatus(updatedTodo, completed)); // this.todos = this.todos.map(todo =>
    //   todo === updatedTodo ? { ...updatedTodo, completed } : todo
    // )
  }

  filterChanged(e) {
    // if (targetEle.parentNode.firstElementChild.classList.contains("task")) {
    //   this.filter = e.target.value;
    //   console.log(this.filter)
    // }
    if (!e.target.classList.contains('visibility-filter')) {
      store.dispatch(updateFilter(e.target.value));
    }
  }

  clearCompleted() {
    // this.todos = this.todos.filter( todo => !todo.completed)
    store.dispatch(clearCompleted());
  }

  render() {
    return html`
    <style>
      .main-heading {
        color: white;
        background-color: #272e3d;
        margin: 0 0 10px;
        padding: 10px;
      }
      
      .container{
        padding: 10px;
      }

      .container .input-layout{
        display: flex;
        justify-content: space-between;
      }
      
      .task-name{
        padding: 10px;
        background-color: bisque;
        border: none;
        flex-grow: 1;
      }

      .task-name:focus{
        border: none;
      }
      
      .add-task-btn{
        color: #fff;
        background-color: blue;
        border: 0;
        padding: 10px;
        cursor: pointer;
      }
      
      .todo-list{
        margin: 20px 0;
        height: 100px;
        overflow-y: auto;
        width: 300px;
      }

      .todo-item input:checked~span{
        text-decoration: line-through;
      }
      
      .clear-completed{
        
      }
      .visibility-filter{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #dedede;
        padding: 10px;
        box-sizing: border-box;
      }
    </style>
      <h1 class="main-heading"> Todo App <small>{ Anand }</small></h1>
      <div class="container" @keyup=${this.shortcutListener}>
        <div class="input-layout">
            <input
            class="task-name"
            type="text"
            value=${this.task} 
            @change=${this.updateTask} 
            placeholder="Enter Task"
            />
            <button class="add-task-btn" @click=${this.addToDo}>Add Task</button>
        </div>

        <div class="todo-list">
          ${this.todos.map(todo => html`
            <div class="todo-item">
              <input 
                type="checkbox" 
                ?checked=${todo.completed} 
                @change=${e => this.updateToDosStatus(todo, e.target.checked)}
              /> <span>${todo.task}</span>
            </div>
          `)}
        </div>

        <div class="visibility-filter" @change="${this.filterChanged}">
          ${Object.values(VisibilityFilters).map(ele => html`
              <input type="radio" id="${ele}" class="task" 
              ?checked=${ele === "All"} 
               name="visibilityFilter" value="${ele}" >
              ${ele}
            `)}
          <button class="clear-completed" @click="${this.clearCompleted}">Clear Completed</button>
        </div>

      </div>
    `;
  }

}

customElements.define('todo-view', TodoView);