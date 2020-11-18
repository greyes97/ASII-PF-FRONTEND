import { Component, h, State, Prop, Method } from '@stencil/core';
import {RouterHistory} from '@stencil/router'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() logeo:boolean;
  @State() data: any;
  @Prop() history: RouterHistory
  @State() dataLogeo: null;


  componentWillLoad(){
    this.getUser()
  }



  @Method()
  async getUser (){
    
    let dataLocal = JSON.parse(localStorage.getItem('dataU'));
    this.dataLogeo = dataLocal;
    if(dataLocal){
      if(new Date().getTime()> dataLocal.timeSession){
        localStorage.removeItem('dataU');
        this.history.push('/')
      }
      this.logeo = dataLocal.data.statusLogin;
    }else{
      this.history.push('/')
    }
  }


  render() {
    return (
      this.logeo && <app-navbar></app-navbar>
    );
  }
}
