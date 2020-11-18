import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'app-history',
  styleUrl: 'app-history.css',
  shadow: true,
})
export class AppHistory {
  @State() stateData:boolean;
  @State() stateSearch:boolean = true;

  @State() dataAuxPre:any;
  @State() dataAuxRo:any;
  @State() dataAuxMe:any;

  @State() dataPatient:any;
  @State() viewHistory:HTMLElement;
  @State() searchHistory:HTMLElement;
  @State() infoPaient:any;
  @State() infoMeetings:null;
  @State() infoPrescriptions:null;
  @State() infoRooms:null;
  @State() cout:number;


  getDataSearch(data){
    if(data){
      this.dataPatient = data;
      this.stateData = true;
      this.stateSearch = false;
      this.infoPaient = data.patient
      
      let presc = data.prescriptions;
      let rooms = data.rooms;
      let meetings = data.appointments;
      if(Array.isArray(presc)&& presc.length){
        this.infoPrescriptions = data.prescriptions
        this.cout = presc.length;
        this.dataAuxPre = data.prescriptions
      }
      if(Array.isArray(rooms)&& rooms.length){
        this.infoRooms = data.rooms;
        this.dataAuxRo = data.rooms;
      }
      if(Array.isArray(meetings)&& meetings.length){
        this.infoMeetings = data.appointments;
        this.dataAuxMe = data.appointments;
      }
    }
  }

  closeViewHistory(){
    this.stateData = false;
    this.stateSearch = true;
    this.dataAuxPre = null;
    this.infoPrescriptions = null;
    this.dataAuxMe = null;
    this.dataAuxRo = null;
    this.infoMeetings = null;
    this.infoRooms = null;
  }

  render() {
    let search = <app-search history={true} type="history" returnData={(e)=>this.getDataSearch(e)} textViewInput="000 0000 000 00" textInfoInput="Quick search engine."></app-search>;
    return (
      <Host>
        <h2>Hisoty Medical</h2>
        <hr/>
        <h4 class="mb-4 text-muted">Dashboard </h4>
        {this.stateSearch&&
        <div>
          <div class="row" id="info">
            <div class="col-xl-12 mb-4">
              <div class="card border-0 rounded-0">
                <div class="card-img-top">
                  <div class="card-body">
                    <div class="card-body align-items-center">
                      <div class="form-group ">
                        <p>Please take note, to access a medical history you must first search for the patient's <strong>ID</strong>  or <strong>DPI</strong>. </p>
                        <hr/>
                        <div class="alert">
                          {search}
                        </div>
                        <hr/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
        {this.stateData&&
        <div class="fadeInDown">
          {this.infoPaient.statePatient?<div class="alert alert-info" role="alert">
          This patient is admitted to the hospital.
          </div>:
          <div class="alert alert-success" role="alert">
          This patient is discharged.
          </div>}
          <div class="row" id="info">
            <div class="col-xl-12 mb-4">
              <div class="card border-0 rounded-0">
                <div class="card-title mb-1 p-2 style-title title-color" >
                  <div id="close-sidebar" onClick={()=>this.closeViewHistory()}>
                    <i class="fas fa-times"></i>
                  </div>  
                  <h6>{this.infoPaient.fullName} track record</h6>
                </div>
                <div class="card-body">
                  <div class="row" id="view">
                    <div class="col-md-12 col-lg-4 mb-4 align-items-stretch">
                      <div class="card border-0 rounded-0 h-100 card-customer">
                        <div class="card-header bg-dark">
                        <h6 class="text-white">Person Information</h6>
                        </div>
                        <div class="card-body">
                          <div class="card">
                            <div class="card-body">
                              <div class="card-innerBody d-flex align-items-center">
                                <div class="card-icon text-light">
                                  <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="ml-auto">
                                <p class="card-label text-right text-muted"><strong>{this.infoPaient.address}<br/> {this.infoPaient.surName}</strong></p>
                                <h4 class="card-text text-right ">{this.infoPaient.fullName}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br/>
                          <div id="card-info-customer">
                            <div class="card">
                                <div class="card-icon text-light icon1">
                                  <i class="fas fa-calendar-day"></i>
                                  <div>{this.infoPaient.birthday}</div>
                                </div>
                              </div>
                            <div class="card">
                              <div class="card-icon text-light icon1">
                                <i class="fas fa-id-card-alt"></i>
                                <div>{this.infoPaient.dpi}</div>
                              </div>
                            </div>
                            <div class="card">
                              <div class="card-icon text-light icon1">
                                <i class="fas fa-id-card-alt"></i>
                                <div>{this.infoPaient.nit}</div>
                              </div>
                            </div>
                            <div class="card">
                              <div class="card-icon text-light icon1">
                                <i class="fas fa-phone"></i>
                                <div>{this.infoPaient.phone}</div>
                              </div>
                            </div>
                            <div class="card">
                              <div class="card-icon text-light icon1">
                                <i class="fas fa-first-aid"></i>
                                <div>{this.infoPaient.emergencyContact}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-5 mb-4 align-items-stretch">
                      <div class="card border-0 rounded-0 h-100">
                          <h6 class="text-secondary">Record</h6>
                        <div class="card-body">
                          <div class="card-title"><h6 class="text-info">Active drugs</h6><hr/></div>
                          {this.infoPrescriptions?<div>
                            {this.infoPaient.fullName} has {this.cout} prescriptions
                            {this.dataAuxPre.map( pres =>(
                              <div>
                                <div class="card mt-3 ">
                                  <div class="card-header">
                                    <h6>{pres.datePrescription} <i class="far fa-calendar-alt"></i></h6>
                                  </div>
                                  <div class="card-body">
                                    {pres.prescription}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>:<div class="text-center">{this.infoPaient.fullName} do not have any active medications at the moment</div>}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-3 mb-4 align-items-stretch">
                      <div class="card border-0 rounded-0 h-100 card-customer">
                        <div class="card-header bg-dark">
                          <h6 class="text-white">Appointments and rooms</h6>
                        </div>
                        <div class="card-body">
                          <div class="card">
                            <div class="card-header bg-dark text-white">
                              <h6>Meetings</h6>
                            </div>
                            <div class="card-body">
                              {this.infoMeetings?
                                <table class="table table-hover">
                                <thead>
                                  <tr>
                                    <td>date</td>
                                    <td>time</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.dataAuxMe.map(meeting =>(
                                    <tr>
                                      <td>{meeting.dateAppointment}</td>
                                      <td class="text-warning">{meeting.timeAppointment}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              :<div class="text-center text-danger">{this.infoPaient.fullName} is not dating at this time</div>}
                            </div>
                          </div>
                          <div class="card mt-3">
                            <div class="card-header bg-dark text-white">
                              <h6>Rooms</h6>
                            </div>
                            <div class="card-body">
                              {this.infoRooms?
                              <table class="table table-hover">
                                <thead>
                                  <tr>
                                    <td>Number</td>
                                    <td>Capacity</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.dataAuxRo.map(room =>(
                                    <tr>
                                      <td class="text-info">{room.numberRoom}</td>
                                      <td>{room.capacityRoom}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              :<div class="text-center text-danger">{this.infoPaient.fullName} is not dating at this time</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </Host>
    );
  }

}
