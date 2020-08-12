import { BaseView } from './base-view';
import { html } from '@polymer/lit-element';

class StatsView extends BaseView {
  render(){
    return html`
      <h1> Stats View Found </h1>
    `
  }
}

customElements.define('stats-view', StatsView)