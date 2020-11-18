import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import Swal from 'sweetalert2';

@Component({
  tag: 'app-meeting-new',
  styleUrl: 'app-meeting-new.css',
  shadow: true,
})
export class AppMeetingNew {
  @Prop() type:string;
  @Prop() idPatient:string;
  @Prop() close:(e,b)=>void;
  @Prop() editMeeting:boolean;
  @Prop() data:any;
  private URL:string = 'https://hospital-as2.herokuapp.com';
  
  @State() date:string;
  @State() idClinic:number=1;
  @State() time:any;
  @State() name:string;
  @State() phone:string;
  @State() surName:string;
  @State() address:string;
  @State() idGuestAppointment:string;

  @State() formElement:HTMLElement;


  componentWillLoad(){
    if(this.editMeeting){
      if(this.type == "patient"){
        this.date = this.data.dateAppointment;
        this.time = this.convertTime12to24(this.data.timeAppointment)
        this.formMeeting()
      }else if(this.type == "guest"){
        window.scrollTo(0,100)
        this.idGuestAppointment = this.data.idGuestAppointment
        this.name = this.data.fullName;
        this.surName = this.data.surName;
        this.address = this.data.address
        this.date = this.data.date
        this.time = this.convertTime12to24(this.data.hour)
        this.formMeeting()
      }
    }else{
      this.formMeeting()
    }
  }
  convertTime12to24(time12h)  {
    let [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }
  
  handlerName(e){
    this.name = e.target.value
  }

  handlerChangeDate(e){
    this.date = e.target.value;
  }
  handlerChangeTime(e){
    this.time = e.target.value;
  }
  handlerPhone(e){
    this.phone = e.target.value;
  }
  handlerSurName(e){
    this.surName = e.target.value;
  }
  handlerAddres(e){
    this.address = e.target.value;
  }
  handlerSubmit(e){
    e.preventDefault()
    this.operations();
  }
  

  formMeeting(){
    this.formElement = null;
    if(this.type == "patient"){
      this.formElement = 
          <div class="col-md-12 col-lg-6 mb-4 align-items-stretch">
         <div class="card border-0 rounded-0 h-100 card-info">
            <div class="card-title mb-1 p-3 d-flex">
                <h5>Information patient</h5>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label htmlFor="inputDate">Date</label>
                <input type="date" class="form-control rounded-0" value={this.date} onInput={(e)=>this.handlerChangeDate(e)} id="inputDate" aria-describedby="nameHelp" required/>
                <small class="form-text text-muted">Please enter a valid date</small>
                <label htmlFor="inputDate">Time</label>
                <input type="time"  class="form-control rounded-0" value={this.time} onInput={(e)=>this.handlerChangeTime(e)} id="inputDate" aria-describedby="nameHelp" required/>
              </div>
            </div>
          </div>
        </div>
    }else if(this.type == "guest"){
      this.formElement = 
      <div class="col-md-12 col-lg-6 mb-4 align-items-stretch">
        <div class="card h-100 border-0 rounded-0">
          <div class="card-title mb-1 p-3">
            <h5>Information guest</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
                <label htmlFor="inputName">Full name</label>
                <input type="text" id="inputName" class="form-control rounded-0" placeholder="Juan Perez" value={this.name} onInput={(e)=>this.handlerName(e)} required/>
                <small class="form-text text-muted">Please enter a valid name.</small>
                <label htmlFor="inputName">Sur Name</label>
                <input type="text" class="form-control rounded-0" value={this.surName} onInput={(e)=>this.handlerSurName(e)} id="inputName" aria-describedby="surHelp"
                placeholder="Perez" required/>
                <small id="surHelp" class="form-text text-muted">Please enter a valid sur name.</small>
                <label htmlFor="inputAdd">Address</label>
                <input type="text" class="form-control rounded-0" value={this.address} onInput={(e)=>this.handlerAddres(e)} id="inputAdd" aria-describedby="addHelp"
                placeholder="Ciudad de Guatemala" required/>
                <small id="birthHelp" class="form-text text-muted">Please enter a valid address.</small>
                <label htmlFor="inputDate">Date</label>
                <input type="date" class="form-control rounded-0" value={this.date} onInput={(e)=>this.handlerChangeDate(e)} id="inputDate" aria-describedby="nameHelp" required/>
                <small class="form-text text-muted">Please enter a valid date</small>
                <label htmlFor="inputDate">Time</label>
                <input type="time" class="form-control rounded-0" value={this.time} onInput={(e)=>this.handlerChangeTime(e)} id="inputDate" aria-describedby="nameHelp" required/>
              </div>
            </div>
        </div>
      </div>
    }
  }

  operations(){
    if(this.editMeeting){
      if(this.type == "patient"){
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateMeetingPatient()
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }else if(this.type == "guest"){
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateMeetingGuest()
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }
    }else{
      if(this.type == "patient"){
        this.saveNewMeetingPatient()
      }else if  (this.type == "guest"){
        this.saveNewMeetingGuest()
      }
    }
  }

  deleteMeeting(e){
    e.preventDefault()
    if(this.type == "patient"){
      Swal.fire({
        icon:'warning',
        title: 'Are you sure?',
        showDenyButton: true,
        confirmButtonText: `Delete`,
        confirmButtonColor: `#dc3545`,
        denyButtonText: `Cancel`,
        denyButtonColor:`#599bd9`
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteMeetingPatient()
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }else if(this.type == "guest"){
      Swal.fire({
        icon:'warning',
        title: 'Are you sure?',
        showDenyButton: true,
        confirmButtonText: `Delete`,
        confirmButtonColor: `#dc3545`,
        denyButtonText: `Cancel`,
        denyButtonColor:`#599bd9`
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteMeetingGuest()
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }
  @Method()
  async saveNewMeetingPatient(){
    let body = new FormData();

    body.append('idPatient',this.idPatient);
    body.append('idClinic','1');
    body.append('date',this.date);
    body.append('time',this.time+":00");

    let data = await fetch(this.URL+'/appointment',{
      method:'POST',
      body:body
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      this.close(data,false);
      Swal.fire('Saved!', '', 'success')
    }else{
      Swal.fire(data.message, '', 'error')
    }
  }

  @Method()
  async updateMeetingPatient(){
    let body = new FormData();
    body.append('idAppointment',this.data.idAppointment)
    body.append('idPatient',this.data.idPatient);
    body.append('idClinic','1');
    body.append('date',this.date);
    body.append('time',this.time+":00");
    console.log(this.data.idPatient,this.date,this.time+":00")
    let data = await fetch(this.URL+'/appointment',{
      method:'PUT',
      body:body
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      this.close(data,false);
      Swal.fire('Saved!', '', 'success')
    }else{
      Swal.fire(data.message, '', 'error')
    }

  }
  @Method()
  async deleteMeetingPatient(){
    let data = await fetch(this.URL+'/appointment?idAppointment='+this.data.idAppointment,{
      method:'DELETE'
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      Swal.fire('Saved!', '', 'success')
      this.close(data,false)
    }else{
      Swal.fire(data.message, '', 'error')
    }
  }
  @Method()
  async deleteMeetingGuest(){
    let data = await fetch(this.URL+'/guestAppointment?'+new URLSearchParams({
      idGuestAppointment:this.data.idGuestAppointment
    }),{
      method:'DELETE'
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      Swal.fire('Saved!', '', 'success')
      this.close(data,false)
    }else{
      Swal.fire(data.message, '', 'error')
    }
  }
  @Method()
  async updateMeetingGuest(){
    let info = new FormData();
    info.append('idGuestAppointment',this.idGuestAppointment)
    info.append('fullName',this.name)
    info.append('surName',this.surName)
    info.append('address',this.address)
    info.append('date',this.date)
    info.append('hour',this.time+":00")

    let data = await fetch(this.URL+'/guestAppointment',{
      method:'PUT',
      body:info
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      Swal.fire('Saved!', '', 'success')
      this.close(data,false)
    }else{
      Swal.fire(data.message, '', 'error')
    }
  }
  

  @Method()
  async saveNewMeetingGuest(){
    let info = new FormData();
    info.append('fullName',this.name)
    info.append('surName',this.surName)
    info.append('address',this.address)
    info.append('date',this.date)
    info.append('hour',this.time+":00")
    let data = await fetch(this.URL+'/guestAppointment',{
      method:'POST',
      body:info
    }).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
    })
    if(data.status){
      Swal.fire('Saved!', '', 'success')
      this.close(data,false)
    }else{
      Swal.fire(data.message, '', 'error')
    }
  }

  closeForm(e){
    e.preventDefault()
    window.scrollTo(0,0)
    this.close(false,false)
  }

  render() {
    let delet = <div class="form-group">
    <button type="button" class="btn btn-outline-danger btn-block" onClick={(e)=>this.deleteMeeting(e)}>delete</button>
    </div>
    return (
      <Host>
        <div id="form-meetings">
          <form onSubmit={(e)=>this.handlerSubmit(e)}>
            <div class="card border-0 rounded-0 h-100">
              <div class="card-title mb-1 p-2 style-title title-color">
                <div id="close-sidebar">
                </div>
                <small>View form</small>
              </div>
              <div class="card-body" id="card-view">
                <div class="row" id="row-customer">
                  {this.formElement}
                  <div class="mb-4 align-items-stretch body-customer" id="card-actions">
                    <div class="card border-0 rounded-0 h-100">
                      <div class="card-title text-muted">
                        <i class="fas fa-arrow-down"></i>
                      </div>
                      <div class="card-body">
                        <div class="form-group">
                        <button type="submit" class="btn btn-outline-success btn-block" >save</button>
                        </div>
                        {this.editMeeting&&delet}
                        <div class="form-group">
                        <button class="btn btn-outline-info btn-block" onClick={(e)=>this.closeForm(e)}>cancel</button>
                        </div>
                     </div>
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
