import { Component, Host, h, State, Method } from '@stencil/core';
import Swal from 'sweetalert2';

@Component({
  tag: 'app-prescription',
  styleUrl: 'app-prescription.css',
  shadow: true,
})
export class AppPrescription {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @State() stateDataTable:boolean;
  @State() stateResultData:boolean;
  @State() stateResultDataPresc:boolean;

  @State() dataTable:any;
  
  @State() message:HTMLElement;
  @State() searchPatient: HTMLElement;
  @State() searchTablePatient: HTMLElement;
  @State() searchPrescriptions: HTMLElement;
  @State() tableResultPrescrp:HTMLElement;

  @State() formNewPrescription:HTMLElement;

  @State() idDoctor:string;
  @State() prescription:string;
  @State() idPatient:string;



  /**
   * Se llama una vez justo después de que el componente se conecte por primera vez al DOM. 
   * Dado que este método solo se llama una vez, es un buen lugar para cargar datos de forma asincrónica.
   */
  componentWillLoad(){
    this.getDataTable();
  }

  /**
   * Estos handler obtienen el valor del input por medio del evento onInput
   * @param e evento onInput
   */

  handlerIdDoc(e){
    this.idDoctor = e.target.value;
  }
  handlerPres(e){
    this.prescription = e.target.value;
  }


  /**
   * Metodo ASYNC
   * Este metodo obtiene una lista de registros de la base de datos
   * por medio de la API 
   */
  @Method()
  async getDataTable(){
    let data = await fetch(this.URL+'/prescription?'+new URLSearchParams({
      type:'prescriptions'
    })).then(resp =>{
      return resp.json()
    }).then( data =>{
      return data;
    }).catch(error => {
      console.log(error);
    })
    if(data.status){
      this.stateDataTable = true;
      this.dataTable = data.object;
    }else{
    this.message = <div>{data.message}</div>
    }
  }

  /**
   * Este metodo cambia el estado searchPatient por el componente <app-search>
   * @param status para cerrar el componente <app-search></app-search>
   */

  openSearchPatient(status:boolean){
    this.searchPrescriptions = null;
    if(status){
      this.searchPatient = <app-search textViewInput="search by name or surname" textInfoInput="Search for a patient by first name, last name, DPI or ID." type="patients" returnData={(e)=>this.getDataSearchPatient(e)} closeComponent={(e)=>this.openSearchPatient(e)}></app-search>
    }else{
      this.searchPatient = null;
      this.searchTablePatient = null;
      this.searchPrescriptions = null;
      this.tableResultPrescrp = null;
    }
  }

  /**
   * Este metodo es el que se encarga de abrir el formulario para el ingreso de una nueva 
   * prescripcion.
   * @param data obtiene la informacion del paciente el cual se necesita para la creacion
   * de un nuevo registro
   * @param status se encarga de eliminar el elemento del DOM.
   */
  openFormNewPrescription(data,status:boolean){
    this.idPatient = data.idPatient
    if(status){
      this.formNewPrescription = 
      <div class="row">
        <div class="col-12 mb-4 align-items-stretch">
          <div class="card h-100 border-0 rounded-0">
            <div class="card-title mb-1 p-3 d-flex">
              <h5>New prescription</h5>
            </div>
            <div class="card-body">
              <div class="row" id="row-customer">
                <div class="col-md-12 col-lg-6 mb-4 align-items-stretch">
                  <div class="card h-100 border-0 rounded-0 card-info">
                    <div class="card-title mb-1 p-3">
                      <h5>Information guest</h5>
                    </div>
                    <div class="card-body">
                      <div class="form-group">
                        <label htmlFor="inputDoc">ID Doctor</label>
                        <input type="text" id="inputDoc" class="form-control rounded-0" value={this.idDoctor} onInput={(e)=>this.handlerIdDoc(e)} placeholder="00"required/>
                        <small class="form-text text-muted">please enter a valid ID.</small>
                        <label htmlfor="texArea">Prescription</label>
                        <textarea value={this.prescription} onInput={(e)=>this.handlerPres(e)} class="form-control" id="texArea" rows={3}></textarea>
                      </div>
                      <button class="btn btn-outline-info" type="submit">save</button>
                      <button class="btn btn-outline-info" onClick={(e)=>this.openFormNewPrescription(e,false)}>cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      
    }else{
      this.formNewPrescription = null;
    }
    
  }

  /**
   * Este metodo muestra una alerta para hacerle saber al usuario que 
   * creara una nueva prescripcion 
   * @param e obtiene el evento por defecto del DOM.
   */
  saveNewPrescription(e){
    e.preventDefault()
    Swal.fire({
      icon: 'question',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        let info = new FormData();
        info.append('idPatient',this.idPatient);
        info.append('idDoctor',this.idDoctor);
        info.append('prescription',this.prescription)
        this.savePrescri(info)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  /**
   * Metodo ASYNC
   * Este metodo guarda la informacion en la base de
   * datos que ha ingresado en el formulario
   * el usuario.
   * @param data informacion del form
   */
  @Method()
  async savePrescri(data){
    let result = await fetch(this.URL+'/prescription',{
      method:'POST',
      body:data
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error => {
      console.log(error)
      Swal.fire(
        'The Internet?',
        'No connection to the server has been established, try again ...',
        'error'
      )
    })
    if(result.status){
      Swal.fire({
        icon: 'success',
        title: 'The patient has been saved successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.getDataTable()
      this.openFormNewPrescription(data,false);
    }else{
      Swal.fire(
        'Whoops!',
        result.message,
        'warning'
      )
    }
  }

  /**
   * Este metodo genderiza el componente <app-search>
   * @param status hace que el estado del searchPrescriptions cambie
   */
  openSearchPrescriptions(status:boolean){
    this.searchPatient = null;
    if(status){
      this.searchPrescriptions = <app-search textViewInput="00" textInfoInput="You can only search by patient ID." type="prescriptions" returnData={(e)=>this.getDataSearchPrescriptions(e)} closeComponent={(e)=>this.openSearchPrescriptions(e)}></app-search>
    }else{
      this.searchPrescriptions = null;
      this.stateResultDataPresc = false
      this.tableResultPrescrp = null;
      this.searchTablePatient = null;
    }
  }

  /**
   * Estos dos metodos muestran la informacion obtenida de la busqueda del usuario en 
   * una tabla.
   * @param data es la informacion que se obtiene por medio del componente
   * <app-search>
   * 
   * Metodo 1
   */
  getDataSearchPrescriptions(data){
    if(data){
      this.stateResultDataPresc = true;
      this.tableResultPrescrp =
      <div class="row">    
        <div class="col-12 mb-4 align-items-stretch">
          <div class="card h-100 border-0 rounded-0">
            <div class="card-title mb-1 p-3 d-flex">
              <h5>Result of your search</h5>
            </div>
            <div class="card-body">
              <div class="table-resposive-mb" id="table-customer-margin">
                <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr class="bg-info">
                      <td class="text-white">ID Doctor</td>
                      <td class="text-white">ID Patient</td>
                      <td class="text-white">Descriptions</td>
                      <td class="text-white">Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.dataTable.map( pres =>(
                      <tr>
                        <td>{pres.idDoctor}</td>
                        <td>{pres.idPatient}</td>
                        <td>{pres.prescription}</td>
                        <td>{pres.datePrescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  }

  /**
   * Metodo 2
   * @param data obtiene el la informacion de la busqueda del usuario. 
   */


  getDataSearchPatient(data){
    if(data){
      this.stateResultData = true;
      this.searchTablePatient =
      <div class="row">    
        <div class="col-12 mb-4 align-items-stretch">
          <div class="card h-100 border-0 rounded-0">
            <div class="card-title mb-1 p-3 d-flex">
              <h5>Result of your search</h5>
            </div>
            <div class="card-body">
              <div class="table-resposive-mb" id="table-customer-margin">
                <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sur Name</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>DPI</th>
                        <th>Phone</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody class="no-border-x">
                    {data.map( patient =>(
                        <tr onClick={()=>this.openFormNewPrescription(patient,true)}>
                          <td>{patient.fullName}</td>
                          <td>{patient.surName}</td>
                          <td>{patient.address}</td>
                          <td>{patient.birthday}</td>
                          <td>{patient.dpi}</td>
                          <td>{patient.phone}</td>
                          {patient.statePatient?<td class="text-success">Joined</td>:<td class="text-danger">Discharged</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  }


  render() {

    let table = null;
    if(this.stateDataTable){
      table = 
      <table class="table table-hover">
        <thead>
          <tr class="bg-dark">
            <td class="text-white">ID Doctor</td>
            <td class="text-white">ID Patient</td>
            <td class="text-white">Descriptions</td>
            <td class="text-white">Date</td>
          </tr>
        </thead>
        <tbody>
          {this.dataTable.map( pres =>(
            <tr>
              <td>{pres.idDoctor}</td>
              <td>{pres.idPatient}</td>
              <td>{pres.prescription}</td>
              <td>{pres.datePrescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    }

    let loading =<div id="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div> 
    return (
      <Host>
        <h2>Prescription's</h2>
      <hr/>
      <h4 class="mb-4 text-muted">Dashboard </h4>
      <div class="row" id="operations">
        <div class="col-xl-4 mb-4">
          <div class="card border-0" onClick={()=>this.openSearchPatient(true)}>
            <div class="card-body">
              <div class="card-innerBody d-flex align-items-center">
                <div class="card-icon text-ligth">
                  <i class="far fa-file" aria-hidden="true"></i>
                </div>
                <div class="ml-auto">
                  <p class="card-label text-right text-muted">You must look for the patient..</p>
                  <h4 class="card-text text-right">New</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 mb-4">
          <div class="card border-0" onClick={()=>this.openSearchPrescriptions(true)}>
            <div class="card-body">
              <div class="card-innerBody d-flex align-items-center">
                <div class="card-icon text-ligth">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </div>
                <div class="ml-auto">
                  <p class="card-label text-right text-muted">Search by patient.</p>
                  <h4 class="card-text text-right">Search</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.searchPatient}
      {this.searchPrescriptions}
      {this.stateResultData&&this.searchTablePatient}
      {this.stateResultDataPresc&&this.tableResultPrescrp}
      <form onSubmit={(e)=>this.saveNewPrescription(e)}>
      {this.formNewPrescription}
      </form>
      
      <div class="row">
        <div class="col-12 mb-4 align-items-stretch">
          <div class="card ">
            <div class="card-title mb-1 p-3 d-flex ">
              <h4>Latest prescriptions</h4>
              <a class="btn ml-auto p-0 text-lightning"> <i class="fas fa-ellipsis-h"></i> </a>
            </div>
            <div class="card-body">
              {this.stateDataTable?table:loading}
            </div>
          </div>
        </div>
      </div>
      </Host>
    );
  }

}
