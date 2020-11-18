import { Component, h, Method, Prop, State } from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import 'stenciljs-bootstrap/dist/stenciljs-bootstrap/stenciljs-bootstrap.css'

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
  shadow: true,
})

export class AppLogin {

  @State() email: string;
  @State() pass: string;
  @State() status: boolean;
  @State() data:any;
  @State() messages: string
  @Prop() history: RouterHistory;
  @State() alert:any;
  private type:any;


  /**
   * Este componente es el que valida la informacion 
   * del usuario para ingresar al sistema.
   * 
   */

   /**
    * El metodo handled obtiene del 
    * @param event el evento por defecto.
    */
  handledSubmit(event){
    event.preventDefault()
    this.validation(this.email,this.pass)
    this.status = false
  }

  handledChangeEmail(e){
    this.email = e.target.value;
  }
  handledChangePass(e){
    this.pass = e.target.value;
  }

  /**Este es un metodo async el cual obtiene la informacion de la base de datos
   * por medio del los @param
   * @param em obtiene el valor del email
   * @param pass obtiene el valor del password del usuario.
   */

  @Method()
  async validation(em,pass){
    let data = new FormData();
    data.append('email',em);
    data.append('password',pass)
    await fetch("https://hospital-as2.herokuapp.com/login",{
      method : 'POST',
      body : data
    }).then( response =>{
      return response.json()
    }).then(data => {
      if(data.statusLogin){
        this.status = false;
        this.data = data.jsonResponse
        let autInfo = {
          data: data,
          timeSession: new Date().getTime() + 1200000
        };
        localStorage.setItem("dataU",JSON.stringify(autInfo));
        this.history.push('/home')
      }else{
        this.status = true;
        this.messages = data.message
        this.type = data.typeMessage
      }
    }).catch(() =>{
      this.status = true;
      this.messages = "No connection to the server has been established, try again ..."
      this.type = 4
    })
    
  }

  /**
   * 
   * @param e obtien el estado que se le envia desde el componente <app-alert> 
   *  
   */
  propChild(e){
    this.status = e
  }

  render() {
    let alert = null;
    if(this.status){
      alert = <app-alert messages={this.messages} typeMessage={this.type} prueba={(e)=>this.propChild(e)}></app-alert>
    }
    return (
      <div class="limiter">
        <div id="login">
        <div class="container-login100 enableBlur">
          <div class="wrap-login100 p-b-20 disableBlur">
            <form class="login100-form validate-form " onSubmit={(e) => this.handledSubmit(e)}>
              <span class="login100-form-title p-b-70">
                Login
              </span>
              <span class="login100-form-avatar">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/71358215365047.56292b885eaa7.gif" alt="AVATAR"/>
              </span>

              <div class="wrap-input100 validate-input  m-b-35" data-validate = "Enter username">
                <input class="input100" type="email" value={this.email} onInput={(e)=> this.handledChangeEmail(e)} name="username" placeholder="Gmail" required/>
              </div>

              <div class="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                <input class="input100" type="password" value={this.pass} onInput={(e)=> this.handledChangePass(e)} name="pass" placeholder="Password" required/>
              </div>

              <div class="container-login100-form-btn m-b-35">
                <button class="login100-form-btn" type="submit">
                  Enter
                </button>
              </div>
            </form>
            {alert}
          </div>
        </div>
        </div>
	    </div>
    );
  }

}
