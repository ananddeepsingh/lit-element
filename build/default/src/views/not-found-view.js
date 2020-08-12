import { BaseView } from "./base-view.js";
import { html } from "../../node_modules/@polymer/lit-element/lit-element.js";

class NotFoundView extends BaseView {
  render() {
    return html`
      <h1> Not Found </h1>
    `;
  }

}

customElements.define('not-found-view', NotFoundView);