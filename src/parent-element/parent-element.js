import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../list-product/list-product.js';
import '../register-product/create-product.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-button/paper-button.js';
/**
 * @customElement
 * @polymer
 */
class ParentElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-button.custom:hover {
          background-color: var(--paper-indigo-100);
        }
      </style>
      <div style="background-color:lightgrey;border-style: ridge;height:120px">
      <h2> [[prop1]]</h2>
     <!-- <a href="/page-one"> <paper-button raised style="color:black; background-color:grey" onclick="_changeRoute">product list</paper-button></a> -->
     <paper-button raised style="color:black; background-color:grey" on-tap="_changeRoute">product list</paper-button>
     <a href="/page-two"> <paper-button raised style="color:black; background-color:grey">Register</paper-button></a>
     <a href="/components/mini-project"> <paper-button raised style="color:black; background-color:grey">Home page</paper-button></a>
      </div>
      <app-location route="{{route}}"></app-location>
      <app-route
             route="{{route}}"
             pattern="/:page"
             data="{{routeData}}"
             tail="{{subroute}}">
      </app-route>
   <iron-pages selected="[[page]]" attr-for-selected="page-name">
     <list-product page-name="page-one" updatedata={{updatedata}}></list-product>
     <create-product page-name="page-two" newdata={{updatedata}}></create-product>
     </iron-pages>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Product details'
      },
      routeData: {
        type: Object,
        observer: "_urlChanged"
      },
      route: {
        type: Object,
        observer: "routeChanged"
      },
      page: {
        type: String
      },
      updatedata: {
        type: Array,
        //observer:"listdata"
      }
    };
  }


  constructor() {
    super();
  }

  routeChanged(route) {
  }

  _urlChanged(urlRoute) {

    this.page = urlRoute.page;
  }
  _changeRoute(e) {
    debugger;
    window.history.pushState({}, null, '/page-one');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
  listdata(ld) {
    // debugger;
    console.log("data", ld);
    this.updatedata = ld;
  }


}

window.customElements.define('parent-element', ParentElement);
