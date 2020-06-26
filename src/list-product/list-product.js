import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
/**
/**
 * @customElement
 * @polymer
 */
class ListProduct extends PolymerElement {
  static get template() {
    return html`
      <style is="custom-style">
        :host {
          display: block;
          
        }
       
        table, td, th {  
            border: 1px solid #ddd;
            text-align: left;
            
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            padding: 12;
          }
          tr:hover td {
            background-color: rgba(0, 0, 0, 0.2);
          }
          tr:hover th {
            background-color: rgba(0, 0, 0, 0.2);
          }
          tr:nth-child(even){background-color: #f2f2f2}
          paper-button.custom:hover {
            background-color: var(--paper-indigo-100);
          }
      </style>
      <h2> [[heading]]</h2>
      <template is="dom-repeat" items="{{data}}">
      <paper-card style="width: 250px;background: lightblue;">
      <table>
      <tr>
        <th>id</th>
        <td>{{item.id}}</td>
      </tr>
      
      <tr>  
        <th>Name</th>
        <td>{{item.name}}</td>
      </tr> 
      <tr>
         <th>Mfdate</th>
         <td>{{item.mfdate}}</td>
      </tr> 
      <tr>  
          <th>Expdate</th>
          <td>{{item.expdate}}</td>
      </tr>  
        </table>
        <div>
        <a href="/page-two"><paper-button  on-click="action" raised noink>update</paper-button></a>
        </div>
     </paper-card>
     </template>
      <iron-ajax
      auto
      url="http://localhost:8080/api/product"  
      handle-as="json"
      on-response="handleResponse"
      debounce-duration="300">
  </iron-ajax>
      
    `;
  }
  static get properties() {
    return {
      data: {
        type: Array,
        value: this.data
      },
      heading:{
          type:String,
          value:'List of Product'
      },
      updatedata:{
        type:Array,
        value:[],
        notify:true,
        reflectToAttribute:true
      }
    };
  }
  
  constructor(){
    super();
}
handleResponse(response){
    //debugger;//console.log(JSON.stringify)
  this.data=(response.detail.response);
  console.log(this.data);
  }
  action(event){
    
   let update=[{"id":event.model.item.id,
               "name":event.model.item.name,
               "mfdate":event.model.item.mfdate,
               "expdate":event.model.item.expdate}] 
     this.notifyPath("updatedata");
     this.updatedata=JSON.stringify( update);
     console.log(this.updatedata);
     //console.log(this.data);

  }
}
window.customElements.define('list-product', ListProduct);
