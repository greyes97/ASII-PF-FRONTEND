import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import Swal from 'sweetalert2'

@Component({
  tag: 'app-patient-form',
  styleUrl: 'app-patient-form.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class AppPatientForm {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @Prop() dataPatient:any = null;
  @Prop() closeViewPatient:()=>void;
  @Prop() state:boolean = false;
  @Prop() loadData:()=>void;
  @Prop() openFormRooms:(e,b)=>void;


  @State() data = this.dataPatient;
  @State() dataUpdate:any;
  @State() stateUpdate:boolean = false;
  @State() loading:boolean = false;
  @State() disabledInputEdit:boolean = false;


  @State() select:string;
  @State() disableInput:boolean = true;
  @State() name:string = this.dataPatient.fullName;
  @State() surName:string = this.dataPatient.surName;
  @State() address:string  = this.dataPatient.address;
  @State() birthday:string  = this.dataPatient.birthday;
  @State() dpi:number  = parseInt(this.dataPatient.dpi);
  @State() nit:number  = parseInt(this.dataPatient.nit);
  @State() phone:number  = parseInt(this.dataPatient.phone);
  @State() emergency:number  = parseInt(this.dataPatient.emergencyContact);
  @State() statePatient:boolean = this.dataPatient.statePatient;


  handlerSubmit(e){
    e.preventDefault()
    if(!this.select){
      this.select = this.dataPatient.gender
    }
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatePatient()
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  handlerChangeInput(e){
    this.select = e.target.value
  }
  handlerName(e){
    this.name = e.target.value
  }
  handlerSurName(e){
    this.surName = e.target.value
  }
  handlerAddres(e){
    this.address = e.target.value
  }
  handlerBirth(e){
    this.birthday = e.target.value
  }
  handlerDpi(e){
    this.dpi = e.target.value
  }
  handlerNit(e){
    this.nit = e.target.value
  }
  handlerPhone(e){
    this.phone = e.target.value
    
  }
  handlerEmer(e){
    this.emergency = e.target.value
  }

  disabledInputs(){

    Swal.fire({
      title: 'Are you sure?',
      text: "What do you want to edit this patient?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.disableInput){
          this.disableInput = false;
          this.disabledInputEdit = true;
        }
      }
    })
  }

  maxLengPhone(e){
    if(this.phone.toString().length == 8){
      e.preventDefault()
    }
  }
  maxLengPhone2(e){
    if(this.emergency.toString().length == 8){
      e.preventDefault()
    }
  }
  maxLengNit(e){
    if(this.nit.toString().length == 9){
      e.preventDefault()
    }
  }

  maxLengDpi(e){
    if(this.dpi.toString().length == 13){
      e.preventDefault()
    }
  }

  @Method()
  async updatePatient(){
    this.loading = true;

    let data = new FormData();
    data.append('idPatient',this.dataPatient.idPatient);
    data.append('fullName',this.name);
    data.append('surName',this.surName);
    data.append('address',this.address);
    data.append('birthday',this.birthday);
    data.append('gender',this.select);
    data.append('dpi',this.dpi.toString());
    data.append('nit',this.nit.toString());
    data.append('phone',this.phone.toString());
    data.append('emergencyContact',this.emergency.toString());
    data.append('statePatient',this.statePatient.toString())


    let dataUpdate = await fetch(this.URL+'/patient',{
      method:'PUT',
      body:data
    }).then(resp =>{
      console.log(resp)
      return resp.json()
    }).then( data =>{
      return data
    }).catch(() => {
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })

    if(dataUpdate.status){
      this.loadData()
      this.loading = false;
      this.disableInput = true;
      this.stateUpdate = true;
      Swal.fire('Saved!', '', 'success')
      
    }else{
      this.loading = false;
      this.stateUpdate = true;
      Swal.fire(dataUpdate.message, '', 'error')
    }
  }

  handlerStatePatient(e){
    e.preventDefault()
  }

  closeForm(e){
    if(e){
      this.closeViewPatient()
    }
  }

  render() {

   
    let data = this.dataPatient;
    let loading = <div id="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div> 

    let statusWait = <div class="alert alert-danger status">
      <p>This patient does not have a room assigned, do you want to assign one?</p>
      <button class="btn btn-outline-success" type="buttom" onClick={(e)=>this.openFormRooms(e,this.dataPatient.idPatient)}>Discharge from the hospital</button>
    </div>
    return (
      <Host>
        <div id="patient-form">
        <form onSubmit={(e)=>this.handlerSubmit(e)}>
          <div class="card border-0 rounded-0 h-100">
          <div class="card-title mb-1 p-2 style-title title-color" >
          <div id="close-sidebar" onClick={()=>this.closeViewPatient()}>
                <i class="fas fa-times"></i>
              </div>  
            <small>View Patient</small>
            </div>
          </div>
          <div class="card-body" id="card-view">
          <div class="row" >
              <div class="col-md-12 col-lg-6 mb-4 align-items-stretch">
                <div class="card border-0 rounded-0 h-100">
                  <div class="card-title mb-1 p-3">
                    <h5>Person Information</h5>
                  </div>
                  <div class="card-body">
                      <div class="form-group">
                        <label htmlFor="inputName">Full Name</label>
                        <input type="text" class="form-control rounded-0" value={data.fullName} onInput={(e)=>this.handlerName(e)} id="inputName" aria-describedby="nameHelp"
                          placeholder="Juan" disabled={this.disableInput} required/>
                          <small id="nameHelp" class="form-text text-muted">Please enter a valid name.</small>
                        <label htmlFor="inputName">Sur Name</label>
                        <input type="text" class="form-control rounded-0" value={data.surName} onInput={(e)=>this.handlerSurName(e)} id="inputName" aria-describedby="surHelp"
                          placeholder="Perez" disabled={this.disableInput} required/>
                          <small id="surHelp" class="form-text text-muted">Please enter a valid sur name.</small>
                        <label htmlFor="inputAdd">Address</label>
                        <input type="text" class="form-control rounded-0" value={data.address} onInput={(e)=>this.handlerAddres(e)} id="inputAdd" aria-describedby="addHelp"
                          placeholder="Ciudad de Guatemala" disabled={this.disableInput} required/>
                          <small id="birthHelp" class="form-text text-muted">Please enter a valid address.</small>
                        <label htmlFor="inputBirth">Birthday</label>
                        <input type="date" class="form-control rounded-0" value={data.birthday} onInput={(e)=>this.handlerBirth(e)} id="inputBirth" aria-describedby="birthHelp"
                          placeholder="" disabled={this.disableInput} required/>
                          <small class="form-text text-muted">Choose your birthday date please.</small>
                        <label htmlFor="inputSelect">Gender</label>
                        <div class="form-group">
                          <select class="form-control" id="inputSelect" onInput={(e)=>this.handlerChangeInput(e)} disabled={this.disableInput}>
                            <option disabled selected={true}>{data.gender}</option>
                            <option selected={this.select == 'F'}>F</option>
                            <option selected={this.select == 'M'}>M</option>
                          </select>
                        </div>
                        <label htmlFor="inputDPI">DPI</label>
                        <input type="text" class="form-control rounded-0" value={data.dpi} onInput={(e)=>this.handlerDpi(e)} id="inputDPI" aria-describedby="dpiHelp"
                          placeholder="0000 00000 0000" disabled={this.disableInput} pattern="[0-9]*" onKeyPress={(e)=>this.maxLengDpi(e)} minlength="13" required/>
                          <small id="dpiHelp" class="form-text text-muted">Enter only number please. Example (5457878784568)</small>
                        <label htmlFor="inputNit">NIT</label>
                        <input type="text" class="form-control rounded-0" value={data.nit} onInput={(e)=>this.handlerNit(e)} id="inputNit" aria-describedby="nitHelp"
                          placeholder="000000000" disabled={this.disableInput} pattern="[0-9]*" onKeyPress={(e)=>this.maxLengNit(e)} minlength="9" required/>
                          <small id="nitHelp" class="form-text text-muted">Enter only number please. Example (0123456789)</small>
                      </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6 mb-4 align-items-stretch">
                <div class="card border-0 rounded-0 h-100">
                  <div class="card-title style-title mb-1 p-3">
                    <h5>Contact information</h5>
                  </div>
                  <div class="card-body">
                    <label htmlFor="inputPhone">Phone</label>
                    <input type="text" class="form-control rounded-0 number" id="inputPhone" value={data.phone} onInput={(e)=>this.handlerPhone(e)} aria-describedby="phoneHelp"
                    placeholder="4599 8800" disabled={this.disableInput} minlength="8" pattern="[0-9]*"  required onKeyPress={(e)=>this.maxLengPhone(e)}/>
                      <small id="phoneHelp" class="form-text text-muted">Enter a valid phone number. Example 4857-568</small>
                    <label htmlFor="inputEmer">Emergency Contact</label>
                    <input type="text" class="form-control rounded-0" id="inputEmer" value={data.emergencyContact} onInput={(e)=>this.handlerEmer(e)} aria-describedby="emerHelp"
                    placeholder="4555 4455" disabled={this.disableInput} minlength="8" pattern="[0-9]*" onKeyPress={(e)=>this.maxLengPhone2(e)} required/>
                      <small id="emerHelp" class="form-text text-muted">Enter a valid phone number. Example 4857-568 or 7832-8954</small>
                    <div class="style-operation">
                    <button type="button" class="btn btn-outline-secondary rounded-0 mb-2 mr-2" disabled={this.disabledInputEdit} onClick={()=>this.disabledInputs()}><i class="fas fa-user-edit"></i></button>
                    <button type="sumbit" class="btn btn-outline-success rounded-0 mb-2 mr-2" disabled={this.disableInput}><i class="far fa-save"></i></button>
                    <button type="button" class="btn btn-outline-danger rounded-0 mb-2" disabled={this.disableInput} onClick={()=>this.closeViewPatient()}><i class="fas fa-window-close"></i></button>
                    <small id="emerHelp" class="form-text text-muted">Before editing, you must make sure to enter all the information that is requested and not leave a single field empty.</small>
                    </div>
                    <div>
                      {this.loading&&loading}
                    </div>
                    {data.statePatient&&<app-patient-status idPatient={data.idPatient} fullName={data.fullName} returnState={(e)=>this.closeForm(e)}></app-patient-status>}
                 
                    {data.statusWait&&statusWait}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </form>
        </div>
      </Host>
    );
  }

}
