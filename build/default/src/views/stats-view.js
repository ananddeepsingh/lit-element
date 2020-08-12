import { BaseView } from "./base-view.js";
import { html } from "../../node_modules/@polymer/lit-element/lit-element.js";

class StatsView extends BaseView {
  render() {
    return html`
      <h1> Stats View Found </h1>
    `;
  }

}

customElements.define('stats-view', StatsView);