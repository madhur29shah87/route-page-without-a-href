import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-toast/paper-toast.js';
/**
 * @customElement
 * @polymer
 */
class CreateProduct extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-card {
            max-width: 800px;
            margin-top:60px;
            text-align:center;
            margin-left: 480px;
            width:22%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
           
          }
           
      </style>
      <h2  style="text-align:center;">[[heading]]</h2>

<iron-ajax
  id="iron"
  method="post"
  url="http://localhost:8080/api/addproduct" 
  body="{{data}}"
  handle-as="json"
  content-type="application/json"
  on-response="handleResponse"
  >
</iron-ajax>

<iron-ajax
  id="put"
  method="put"
  url="http://localhost:8080/api/product/[[iddata]]" 
  body="{{newdata}}"
  handle-as="json"
  content-type="application/json"
  on-response="handleupdateResponse"
  >

</iron-ajax>
      

      <paper-card style="width: 600px;background-color:lightgrey;border-style: ridge;">
      <iron-form id="formOne"> 
      <form is="iron-form">
        <paper-input name="id"  auto-validate validator="cats-only" placeholder="id" type=number value={{iddata}} lable="id" required></paper-input>
          <paper-input name="name" auto-validate placeholder="Product name" value={{namedata}} required></paper-input>
          <paper-input name="mfdate" auto-validate placeholder="Mfdate" type=text value={{mfdata}} required></paper-input>
          <paper-input name="expdate" auto-validate placeholder="Expdate" type=text value={{exdata}} required></paper-input>
 <paper-button on-click="submitform" raised style="background-color:grey;color:white">Submit</paper-button>
          <paper-toast id="toast" text="product details submitted succesfully!"></paper-toast>
      </form>
      
  </iron-form>
  
  </paper-card>

    `;
  }
  static get properties() {
    return {
      create: {
        type: Object,
        value: this.create
      },
      heading: {
        type: String,
        value: 'Register product details'
      },
      data: {
        type: Object,
        value: this.data
      },
      newdata: {
        type: Array,
        observer: "pushdata"
      },
      iddata: {
        type: String
      },
      namedata: {
        type: String

      },
      mfdata: {
        type: String

      },
      exdata: {
        type: String

      }
    };
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    //debugger;
    console.log('element created!');
  }
  //for submit
  submitform() {
    debugger;
    this.data = this.$.formOne.serializeForm();
    this.$.iron.generateRequest();
    this.$.toast.open();
  }

  //for post
  handleResponse(e) {
    this.create = JSON.stringify(e.detail.response, null, 2);
    console.log(this.create);
  }



  pushdata(pushdata) {
    debugger;
    let pass = JSON.parse(pushdata);
    // this.updatedata= pass;
    this.iddata = pass[0].id;
    this.namedata = pass[0].name;
    this.mfdata = pass[0].mfdate;
    this.exdata = pass[0].expdate;
  }



}

window.customElements.define('create-product', CreateProduct);
