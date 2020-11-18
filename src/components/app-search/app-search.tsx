import { Component, Host, h, Prop, State, Method } from '@stencil/core';
import Swal from 'sweetalert2';

@Component({
  tag: 'app-search',
  styleUrl: 'app-search.css',
  shadow: true,
})
export class AppSearch {
  private URL:string = 'https://hospital-as2.herokuapp.com';

  @Prop() type:string;
  @Prop() closeComponent:(e)=>void;
  @Prop() returnData:(e)=>void;
  @Prop() textViewInput:string;
  @Prop() textInfoInput:string;
  @Prop() history:boolean;
  
  @State() searchText:string;
  @State() loading:boolean;

  componentWillLoad(){
    window.scrollTo(0,100)
  }

  whatComponent(e){
    e.preventDefault()
    
    this.loading = true;
    switch (this.type) {
      case "patients":
        this.getPatients()
        break;
      case "meetings":
        this.getMeetings()
        break;
      case "history":
        this.getHisotory()
        break;
      case "prescriptions":
        this.getPrescriptions()
        break;
      default:
        break;
    }
  }
  @Method()
  async getMeetings(){
    let data = await fetch(this.URL+'/appointment?'+ new URLSearchParams({
      type:'appointmentByName',
      search:this.searchText
    })).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      this.loading = false;
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
      console.log(error)
    })
    if(data.status){
      this.loading = false;
      this.returnData(data.list);
    }else{
      this.loading = false;
      Swal.fire(
        'Whoops!',
        data.message,
        'warning'
      )
    }
  }
  @Method()
  async getPatients(){
    let data = await fetch(this.URL+'/patient?'+ new URLSearchParams({
      type:'patientsName',
      fullName:this.searchText,
      status:'false'
    })).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      this.loading = false;
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
      console.log(error)
    })
    if(data.status){
      this.loading = false;
      this.returnData(data.responsePatientObject);
    }else{
      this.loading = false;
      Swal.fire(
        'Whoops!',
        data.message,
        'warning'
      )
    }
  }

  @Method()
  async getHisotory(){
    let data = await fetch(this.URL+'/medicalHistory?'+ new URLSearchParams({
      searchParam:this.searchText,
    })).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      this.loading = false;
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
      console.log(error)
    })
    if(data.status){
      this.loading = false;
      this.returnData(data.object);
    }else{
      this.loading = false;
      Swal.fire(
        'Whoops!',
        data.message,
        'warning'
      )
    }
  }

  @Method()
  async getPrescriptions(){
    let data = await fetch(this.URL+'/prescription?'+ new URLSearchParams({
      type:'searchParameter',
      searchParameter:this.searchText
    })).then(resp =>{
      return resp.json()
    }).then(data =>{
      return data;
    }).catch(error =>{
      Swal.fire(
        'The Internet?',
        'I think you dont have an internet connection.',
        'error'
      )
      console.log(error)
    })
    if(data.status){
      this.loading = false;
      this.returnData(data.object);
    }else{
      this.loading = false;
      Swal.fire(
        'Whoops!',
        data.message,
        'warning'
      )
    }
  }

  handlerChangeInput(e){
    this.searchText = e.target.value
  }


  render() {
    let loading = <div id="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div> 
    return (
      <Host>
        <div class="row">
          <div class="col-xl-12 mb-4"> 
          <div class="card border-0 rounded-0 fadeInDown">
        <div id="close-sidebar" style={this.history?{display:'none'}:{display:'block'}}  onClick={()=>this.closeComponent(false)}>
                <i class="fas fa-times"></i>
              </div>
          <div class="card-body style">
            <div class="card-innerBody ">
              <form onSubmit={(e)=>this.whatComponent(e)}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="fas fa-search" aria-hidden="true"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder={this.textViewInput} value={this.searchText} onInput={(e)=>this.handlerChangeInput(e)}  aria-describedby="basic-addon1" required/>
                  <div class="input-group-append">
                      <button type="submit" class="input-group-text btn btn-dark">search</button>
                  </div>
                </div>
                <div>
                  <small class="form-text text-muted">{this.textInfoInput}</small>
                </div>
              </form>
              {this.loading&&loading}
            </div>
          </div>
        </div>
          </div>
        </div>
        
      </Host>
    );
  }

}
