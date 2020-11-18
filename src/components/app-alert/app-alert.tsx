import { Component, h, Prop,Element, Method } from '@stencil/core';

@Component({
  tag: 'app-alert',
  styleUrl: 'app-alert.css',
  shadow: true,
})
export class AppAlert {
  @Prop() messages: string
  @Prop() prueba:(e)=>void;
  @Element() el: HTMLElement;
  @Prop() typeMessage:any;
  

  
 /**
  * Cierra la alerta
  */
  closeAlert(){
    this.prueba(false)
    this.el.style.display = 'none'

  }

  /**
   * Se llama una vez justo después de que el componente se conecte por primera vez al DOM.
   */
  componentWillLoad(){
    this.whatAlert(this.typeMessage)
  }

  /**
   * @param type escoge la opcion que viene desde el prop
   */
  alert = null;
  @Method()
  async whatAlert(type){
    switch (type) {
      case 1: 
        this.alert = 
        <div class="alert success">
          <span class="closebtn"  onClick={()=> this.closeAlert()}>&times;</span>  
          <strong>Succes!</strong> {this.messages}
        </div>
        break;
        case 2: 
        this.alert = 
        <div class="alert warning">
          <span class="closebtn"  onClick={()=> this.closeAlert()}>&times;</span>  
          <strong>Warning!</strong> {this.messages}
        </div>
        break;
        case 3: 
        this.alert = 
        <div class="alert">
          <span class="closebtn"  onClick={()=> this.closeAlert()}>&times;</span>  
          <strong>Error!</strong> {this.messages}
        </div>
        break;
        case 4: 
        this.alert = 
        <div class="alert">
          <strong>Network error!</strong> {this.messages}
        </div>
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      this.alert
    );
  }

}
