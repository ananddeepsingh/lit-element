import { router, navigator } from 'lit-element-router';
import './src/views/todo-view.js'

window.addEventListener('load', () => {
  // initRouter()
  registerSW();
});

async function registerSW(){
  if("serviceWorker" in window.navigator){
    try{
      await window.navigator.serviceWorker.register('./sw.js');
    }catch(e){
      console.log('Service Worker Failed')
    }
  }else{
    console.log('Service Worker Does not supported by browser')
  }
}

const initRouter = () => {
  const router = document.querySelector('main');
  router.setRoutes([
    {
      path: '/',
      component: 'todo-view'
    },
    {
      path: '/stats',
      component: 'stats-view',
      action: () => import('./src/views/stats-view')
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () => import('./src/views/not-found-view')
    }
  ])
}

// import { LitElement, html } from '@polymer/lit-element';

// import './src/views/todo-view.js'
// import './src/views/stats-view.js'


// class App extends LitElement {
//   static get properties() {
//     return {
//       params: { type: Object },
//       query: { type: Object },
//       data: { type: Object }
//     };
//   }

//   static get routes() {
//     return [
//       {
//         name: "home",
//         pattern: "todo-view",
//         // data: { title: "Home" }
//       },
//       {
//         name: "stats",
//         pattern: "stats-view"
//       },
//       {
//         name: "not-found",
//         pattern: "*"
//       }
//     ];
//   }

//   constructor() {
//     super();
//     this.params = {};
//     this.query = {};
//     this.data = {};
//   }

//   router(route, params, query, data) {
//     this.activeRoute = route;
//     this.params = params;
//     this.query = query;
//     this.data = data;
//     console.log(route, params, query, data);
//   }

//   render() {
//     return html`
//     <a href="/">Home</a>
//     <a href="/stats">Stats</a>

//     <app-main active-route=${this.route}>
//       <h1 route="home">Home</h1>
//       <h1 route="stats">stats ${this.query.data}</h1>
//     </app-main>
//     `;
//   }

//   linkClick(event) {
//     event.preventDefault();
//     this.navigate(event.target.href);
//   }
// }

// customElements.define("my-app", App);