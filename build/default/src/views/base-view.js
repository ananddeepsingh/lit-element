import { LitElement, html } from "../../node_modules/@polymer/lit-element/lit-element.js";
export class BaseView extends LitElement {
  createRenderRoot() {
    return this;
  }

}