import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import Swal from 'sweetalert2';


@Component({
  tag: 'app-patients-search',
  styleUrl: 'app-patients-search.css',
  shadow: true,
  assetsDirs: ['assets']
})

export class AppPatientsSearch {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @Prop() close:()=>void;

  @Prop() openAsignationRoom:(e,b)=>void;

  @State() dataSearch:any;
  @State() textSearch:string;
  @State() tablaSearch:HTMLElement;
  @State() status:boolean;
  @State() dataError:any;
  @State() loading:boolean;
  @State() formPatient:null;

  
  handlerChangeSubmit(e){
    e.preventDefault()
    this.getPatient();
    this.status=false;
    this.loading = true;
    this.formPatient = null;
  }


  @Method() 
  async getPatient(){

    this.loading = true;
    let data = new FormData();
    data.append('type','patient')
    data.append('idPatient',this.textSearch)
    let dataFetch = await fetch(this.URL+'/patient?'+new URLSearchParams({
      type:'patientsName',
      fullName:this.textSearch,
      status:'true'
    })).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(() =>{
      this.loading = false;
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(dataFetch.status == true){
      this.loading = false;
      this.status = false;
      this.dataSearch = dataFetch.responsePatientObject;
    }else{
      this.loading = false;
      this.dataSearch = null;
      Swal.fire(
        'Whoops!',
        dataFetch.message,
        'warning'
      )
    }
  }
  
  handlerChangeInput(e){
    this.textSearch = e.target.value
  }

  closeAlert(e){
    this.status = e;
  }

  viewPatient(patient){
    window.scrollTo(0,680);
    this.formPatient = <app-patient-form closeViewPatient={()=> this.closeForm()} dataPatient={patient} loadData={()=> this.loadSearch()} openFormRooms={(e)=>this.openAsignationRoom(e,patient.idPatient)}></app-patient-form>;
  }

  closeForm(){
    this.formPatient = null;
    window.scrollTo(0,300)
  }

  loadSearch(){
    this.getPatient()
  }
  

  render() {

    let alert = null;
    if(this.status){
      alert = <div id="alertSearch">
        <app-alert messages={this.dataError.message} typeMessage={this.dataError.typeMessage} prueba={(e)=>this.closeAlert(e)}></app-alert>
      </div>
    }

    let result = null;
    if(this.dataSearch){
      result = <div>
      <hr/>
      <div class="row">
        <div class="col-xl-12">
          <p>You searched {this.textSearch}</p>
          <div class="table-responsive-md">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sur Name</th>
                    <th>Address</th>
                    <th>Birthday</th>
                    <th>Gender</th>
                    <th>DPI</th>
                    <th>Nit</th>
                    <th>Phone</th>
                    <th>Emergency Contact</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody class="no-border-x">
                {this.dataSearch.map( patient =>(
                    <tr onClick={()=>this.viewPatient(patient)}>
                      <td>{patient.fullName}</td>
                      <td>{patient.surName}</td>
                      <td>{patient.address}</td>
                      <td>{patient.birthday}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.dpi}</td>
                      <td>{patient.nit}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.emergencyContact}</td>
                      {patient.statePatient?<td class="text-success">Joined</td>:<td class="text-warning">Discharged</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>
      </div>
    }

    let loading = <div id="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div> 

    
    return (
      <Host>
        <div class="card border-0 rounded-0">
        <div id="close-sidebar"  onClick={()=>this.close()}>
                <i class="fas fa-times"></i>
              </div>
          <div class="card-body style">
            <div class="card-innerBody ">
              <form onSubmit={(e)=>this.handlerChangeSubmit(e)}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search" aria-hidden="true"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="search" value={this.textSearch} onInput={(e)=>this.handlerChangeInput(e)}  aria-describedby="basic-addon1" required/>
                  <div class="input-group-append">
                      <button type="submit" class="input-group-text btn btn-dark">search</button>
                  </div>
                </div>
              </form>
              {result}
              {alert}
              {this.loading&&loading}
            </div>
          </div>
        </div>
        {this.formPatient&&this.formPatient}
      </Host>
    );
  }

}
