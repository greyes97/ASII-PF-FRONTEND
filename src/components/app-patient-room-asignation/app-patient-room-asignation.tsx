import { Component, Host, h, Prop, Method, State } from '@stencil/core';
import Swal from 'sweetalert2';

@Component({
  tag: 'app-patient-room-asignation',
  styleUrl: 'app-patient-room-asignation.css',
  shadow: true,
})
export class AppPatientRoomAsignation {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @Prop() idPatient:any;
  @Prop() closeForm:()=>void;

  @State() roomData:any; 
  @State() statusRoomLoading: boolean = true;
  @State() statusLoading: boolean = false;
  @State() changeStatePatient: boolean = false;


  @State() tableRoom: HTMLElement;
  @State() loading: HTMLElement;
  @State() update:HTMLElement;

  componentWillLoad (){
    this.getRooms()
  }

  @Method()
  async getRooms(){
    let dataRooms = await fetch(this.URL+'/room?'+new URLSearchParams({
      status:'true',
      type:'status'
    })).then(resp =>{
      return resp.json();
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
    })
    if(dataRooms.status){
      this.roomData = dataRooms.data;
      this.statusRoomLoading = false;
        this.tableRoom = <table class="table">
        <thead>
          <tr>
            <td>Number room</td>
            <td>Capacity</td>
            <td>State</td>
          </tr>
        </thead>
        <tbody>
          {this.roomData.map(room => (
            <tr>
              <td>{room.numberRoom}</td>
              <td>{room.capacityRoom}</td>
              <td><button class="btn btn-success" onClick={()=>this.asignationRoom(room)}>To assign <i class="far fa-check-circle"></i></button></td>
            </tr>
          ))}
        </tbody>
     </table>

    }else{
      this.statusRoomLoading = false;
      Swal.fire({
        title: 'No rooms',
        text: "There are no rooms available, in this case the patient will be put on the waiting list.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.changeStatePatient = true;
          this.statusLoading = true;
          this.update =
          <div>
            <div id="loading">
              <p>We are updating the patient's status, please wait...</p>
            </div> 
          </div>
          this.updatePatient("true")
        }
      })
    }
  }

  asignationRoom(room){
    Swal.fire({
      title: 'Are you sure?',
      text: "What do you want to assign this room to the patient?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.statusLoading = true;
        let data = new FormData();
        data.append('idPatient',this.idPatient);
        data.append('idRoom',room.idRoom);
        this.saveRoomPatient(data)
      }
    })
  }

  @Method()
  async saveRoomPatient(data){
    
      let dataRoomPatient = await fetch(this.URL+'/patientRoom',{
        method:'POST',
        body:data
      }).then(resp =>{
        return resp.json()
      }).then(data =>{
        return data;
      }).catch(error =>{
        console.log(error)
        this.statusLoading = false;
        Swal.fire(
          'The Internet?',
          'I think you dont have an internet connection.',
          'error'
        )
      })

      if(dataRoomPatient.status){
        this.statusLoading = false;
        this.closeForm()
        Swal.fire('Saved!', '', 'success');
        this.updatePatient("false");
      }else{
        this.statusLoading = false;
        Swal.fire(dataRoomPatient.message, '', 'error')
      }
  }

  @Method()
  async updatePatient(status){
    let data = await fetch(this.URL+'/patient?' +new URLSearchParams({
      type:'updateWait',
      idPatient:this.idPatient,
      status:status
    })).then(resp => {
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      console.log(error)
    })
    if(data.status){
      this.statusLoading = false;
      this.closeForm()
      Swal.fire('Saved!', '', 'success');
    }else{
      this.statusLoading = false;
      Swal.fire(data.message, '', 'error')
    }
  }

  render() {
    let loading = <div id="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div> 

    return (
      <Host>
        <div id="asignation">
          <div class="card border-0 rounded-0 h-100">
            <div class="card border-0 rounded-0 h-100">
              <div class="card-title mb-1 p-2 style-title title-color" >
                <div id="close-sidebar" onClick={()=>this.closeForm()}>
                  <i class="fas fa-times"></i>
                </div>
                <small>Room assignation</small>
              </div>
              <div class="card-body">
                <h6>Rooms available</h6>
                <div class="row" id="row-table">
                  <div class="col-lg-6  align-items-center">
                    <div id="table-rooms">
                      {this.statusRoomLoading?loading : this.tableRoom}
                      {this.changeStatePatient&&this.update}
                      {this.statusLoading&&loading}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
