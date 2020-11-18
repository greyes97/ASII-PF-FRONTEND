import { Component, Host, h, State, Method } from '@stencil/core';

@Component({
  tag: 'app-patients',
  styleUrl: 'app-patients.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class AppPatients {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @State() search:HTMLElement;
  @State() form:HTMLElement;
  @State() newForm:HTMLElement;
  @State() roomForm:HTMLElement;
  @State() messageHTMLPatient:HTMLElement;
  @State() messageHTMLRoom:HTMLElement;
  @State() loading:HTMLElement;

  @State() loginPatients:boolean = true;
  @State() patientsData:boolean = false;
  @State() loadingRooms:boolean = true;
  @State() withIoutnternet:boolean = false;
  @State() roomData:boolean = false;

  @State() patientsWait:any;
  @State() roomsAvailable:any;

  constructor(){
    this.loading =<div id="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div> 
  }

  openSearch(){
    this.search = <app-patients-search close={()=>this.closeSearch()}  openAsignationRoom={(e,b)=>this.openAsignation(e,b)} ></app-patients-search>
    window.scrollTo(0,300)
    this.newForm=null;
  }

  closeSearch(){
    window.scrollTo(0,0);
    this.search = null;
  }
  openNewPatient(){
    this.search = null;
    this.roomForm = null;
    this.newForm = <app-patient-new closeViewPatient={()=>this.closeNewPatient()} openFormRoom={(e,b)=>this.openAsignation(e,b)}></app-patient-new>
    window.scrollTo(0,341)
  }
  closeNewPatient(){
    this.newForm = null;
    window.scrollTo(0,0)
  }

  openAsignation(e,idPatient){
    e.preventDefault()
    window.scrollTo(0,100)
    this.roomForm = <app-patient-room-asignation closeForm={()=>this.closeAsignation()} idPatient={idPatient}></app-patient-room-asignation>
    this.newForm = null;
    this.search = null;
  }
  closeAsignation(){
    window.scrollTo(0,0)
    this.roomForm = null;
    this.newForm = null;
    this.search = null;
    this.getPatientWait()
  }

  @Method()
  async getPatientWait(){
    this.loginPatients = true;
    let data = await fetch(this.URL+'/patient?'+ new URLSearchParams({
      type:'patientsWait'
    })).then( resp =>{
      return resp.json();
    }).then( data =>{
      return data;
    }).catch( error =>{
      this.patientsData = false
      this.loginPatients = false;
      console.log(error)
      this.withIoutnternet = true;
    })
    if(data.status){
      this.patientsData = true
      this.loginPatients = false;
      this.patientsWait = data.responsePatient;
    }else{
      this.loginPatients = false;
      this.patientsData = false;
      this.patientsWait = data.responsePatient;
      this.messageHTMLPatient = 
      <div class="text-message">{data.message}</div>
    }
  }
  @Method()
  async getRooms(){
    let dataRooms = await fetch(this.URL+'/room?'+new URLSearchParams({
      type:'roomAll'
    })).then(resp =>{
      return resp.json();
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
    })
    if(dataRooms.status){
      this.loadingRooms = false
      this.roomData = true;
      this.roomsAvailable = dataRooms.data
    }else{
      this.roomData = false;
      this.loadingRooms = false;
      this.messageHTMLRoom = <div class="text-message">{dataRooms.message}</div>
    }
  }

  componentWillLoad(){
    this.getPatientWait()
    setTimeout(() => {
      this.getRooms()
    }, 1000);
    
  }


  render() {

    let tablePatient = null;
    if(this.patientsData){
    tablePatient = <div class="table-responsive-md card-info">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sur Name</th>
            <th>Address</th>
            <th>DPI</th>
            <th>Phone</th>
            <th>Emergency Contact</th>
            <th>Search room</th>
          </tr>
        </thead>
        <tbody class="no-border-x">
        {this.patientsWait.map( patient =>(
            <tr>
              <td>{patient.fullName}</td>
              <td>{patient.surName}</td>
              <td>{patient.address}</td>
              <td>{patient.dpi}</td>
              <td>{patient.phone}</td>
              <td class="table-text">{patient.emergencyContact}</td>
              {patient.statusWait&&<td onClick={(e)=>this.openAsignation(e,patient.idPatient)} class="table-text"><button class="btn btn-outline-info"><i class="fas fa-search"></i></button> </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    }else{
      tablePatient = this.messageHTMLPatient
    }
    
    
  let messageHTML = 
  <div class="text-message text-danger">Check your internet connection</div>


  let tableRoom = null;
  if(this.roomData){
    tableRoom = <table class="table card-info">
        <thead>
          <tr>
            <td>Number room</td>
            <td>Capacity</td>
            <td>State</td>
          </tr>
        </thead>
        <tbody>
          {this.roomsAvailable.map(room => (
            <tr>
              <td>{room.numberRoom}</td>
              <td>{room.capacityRoom}</td>
              {room.statusRoom?<td class="text-suecces">available</td>:<td class="text-danger">not available</td>}
            </tr>
          ))}
        </tbody>
     </table>
  }else{
    tableRoom = this.messageHTMLRoom
  }
  
  let loading =<div id="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div> 
      

        
 
    return (
      <Host>
      <h2>Patient's</h2>
      <hr/>
      <h4 class="mb-4 text-muted">Dashboard </h4>
      <div class="row" id="operations">
        <div class="col-12 col-xl-6 mb-4">
          <div class="card border-0 rounded-0" onClick={()=>this.openSearch()}>
            <div class="card-body">
              <div class="card-innerBody d-flex align-items-center">
                <div class="card-icon text-light">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </div>
                <div class="ml-auto">
                  <p class="card-label text-right text-muted">Search to <strong>view</strong>, <strong>modify</strong>, or <strong>delete</strong> a patient.</p>
                  <h4 class="card-text text-right ">Search</h4>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex ">
              <small class="text-muted">Usability</small>
              <small class="text-success ml-auto">
                <i class="fa fa-caret-up" aria-hidden="true"></i>
                5,35%
              </small>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-6 mb-4">
          <div class="card border-0 rounded-0" onClick={()=>this.openNewPatient()}>
            <div class="card-body">
              <div class="card-innerBody d-flex align-items-center">
                <div class="card-icon text-light">
                  <i class="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <div class="ml-auto">
                  <p class="card-label text-right text-muted">Add a new patient to the database.</p>
                  <h4 class="card-text text-right ">New patient</h4>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex ">
              <small class="text-muted">Usability</small>
              <small class="text-success ml-auto">
                <i class="fa fa-caret-up" aria-hidden="true"></i>
                8,66%
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-xl-12 mb-4">
            {this.search}
            {this.newForm}
            {this.roomForm}
        </div>
      </div>


  <div class="row">    
    <div class="col-12 mb-4 align-items-stretch">
      <div class="card h-100 border-0 rounded-0">
        <div class="card-title mb-1 p-3 d-flex">
          <h5>Waiting patients</h5>
          <a class="btn ml-auto p-0 text-lightning"> <i class="fas fa-ellipsis-h"></i> </a>
        </div>
        <div class="card-body">
          {this.loginPatients?this.loading:tablePatient}
          {this.withIoutnternet&&messageHTML}
        </div>
      </div>
    </div>
  </div>
  <div class="row">    
    <div class="col-12 mb-4 align-items-stretch">
      <div class="card h-100 border-0 rounded-0">
        <div class="card-title mb-1 p-3 d-flex">
          <h5>Empty rooms</h5>
          <a class="btn ml-auto p-0 text-lightning"> <i class="fas fa-ellipsis-h"></i> </a>
        </div>
        <div class="card-body text-center">
          {this.loadingRooms?loading:tableRoom}
        </div>
      </div>
    </div>

  </div>
      </Host>
    );
  }

}
