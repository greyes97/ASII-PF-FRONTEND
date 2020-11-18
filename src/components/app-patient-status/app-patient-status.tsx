import { Component, Host, h, Prop, Method, State } from '@stencil/core';
import Swal from 'sweetalert2';

@Component({
  tag: 'app-patient-status',
  styleUrl: 'app-patient-status.css',
  shadow: true,
})
export class AppPatientStatus {
  private URL:string = 'https://hospital-as2.herokuapp.com';
  @Prop() idPatient:any;
  @Prop() fullName:string;
  @Prop() returnState:(e)=>void;


  @State() loading:boolean = false;

  @Method()
  async changeStatusPatient(){
    let data = await fetch(this.URL+'/patient?'+new URLSearchParams({
      type:'changeStatus',
      idPatient:this.idPatient
    })).then(resp =>{
      return resp.json()
    }).then( data =>{
      return data;
    }).catch(error =>{
      this.returnState(false)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
      console.log(error)
    })

    if(data.status){
      this.returnState(true)
      Swal.fire(
        'Update!',
         this.fullName+' the patient has been discharged',
        'success'
      )
    }else{
      this.returnState(false)
      Swal.fire(
        'Whoops!',
        data.message,
        'warning'
      )
    }
  }

  changeStatus(e){
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "What do you want to discharge the patient?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.changeStatusPatient()
      }
    })
  }

  render() {
    let loading =<div id="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div> 
    return (
      <Host>
        <div class="alert alert-warning status">
          <p>{this.fullName} he is admitted to the hospital, if you want<strong> to discharge</strong> him, click on this button.</p>
            <i class="fas fa-long-arrow-alt-down"></i><br/>
          <button class="btn btn-outline-danger" type="buttom" onClick={(e)=>this.changeStatus(e)}>Discharge from the hospital</button>
        </div>
        {this.loading&&loading}
      </Host>
    );
  }

}
