import { Component, h, State } from '@stencil/core';




@Component({
  tag: 'app-navbar',
  styleUrls: ['app-navbar.css'],
  assetsDirs: ['assets'],
  shadow: true,
})

export class AppNavbar {


  private element: HTMLElement;
  private subMenu: HTMLElement;
  private menu:HTMLElement;
  @State() main:HTMLElement = <app-viewopeation></app-viewopeation>;

  handledSubMenu(){
    if(this.subMenu.classList.toString()=='sidebar-dropdown active'){
      console.log("hola")
      this.menu.style.display ='none'
    }else{
      this.menu.style.display ='block'
    }
    this.subMenu.classList.toggle('active')
  }
  handledSubMenu2(){
    this.menu.style.display ='block'
  }
  componentDidRender(){
    setTimeout(()=>{
      this.handledNavbar()
    },500)
    if(Array.from(this.element.getElementsByClassName('sidebar-dropdown'))){
      let data = Array.from(this.element.getElementsByClassName('sidebar-dropdown'))
      for(let i in data){
      this.element.getElementsByClassName('sidebar-dropdown')[i].addEventListener('click',()=>this.handleMenu(i))
    }  
    }else{
      console.log("error")
    }
    
  }

  handleMenu(option){
  if(option==0){
    this.main = <app-patients></app-patients>
    }
  else if(option==1){
    this.main = <app-history></app-history>
  }else if(option==2){
    this.main = <app-meeting></app-meeting>
  }else if(option==3){
    this.main = <app-prescription></app-prescription>
  }
  }

  handledNavbar(){
    this.element.classList.toggle('toggled')
    }
    
  closeSession(){
    localStorage.removeItem('dataU')
    window.location.reload()
  }


  render() {
    let data = null;
    if(JSON.parse(localStorage.getItem('dataU'))){
      data = JSON.parse(localStorage.getItem('dataU')); 
    }
    let dataU = null;
    if(data.data.jsonResponse){
      dataU = data.data.jsonResponse
    }
    
    return (
      
        data && 
        <div class="page-wrapper chiller-theme" ref={el=>this.element = el} id="navbar">
        <a id="show-sidebar" class="btn btn-sm btn-dark" href="#" onClick={()=>this.handledNavbar()} >
          <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
          <div class="sidebar-content">
            <div class="sidebar-brand">
              <a href="#">Hospital A.S</a>
              <div id="close-sidebar" onClick={()=>this.handledNavbar()}>
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div class="sidebar-header">
              <div class="user-pic">
                <img class="img-responsive img-rounded" src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" alt="User picture"/>
              </div>
              <div class="user-info">
                <span class="user-name">
                  <strong>{dataU.userName}</strong>
                </span>
                <span class="user-role">{dataU.role}</span>
                <span class="user-status">
                  <i class="fa fa-circle"></i>
                  <span>Online</span>
                </span>
              </div>
            </div>
            <div class="sidebar-menu">
              <ul>
                <li class="header-menu">
                  <span>General</span>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#">
                    <i class="fa fa-user-injured"></i>
                    <span>Patien's</span>
                    <span class="badge badge-pill badge-warning">New</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#">
                    <i class="fa fa-notes-medical"></i>
                    <span>Medical history</span>
                    <span class="badge badge-pill badge-danger">3</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#">
                    <i class="fas fa-tasks"></i>
                    <span>Meeting's</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#">
                    <i class="fa fa-pills"></i>
                    <span>Prescriptions</span>
                  </a>
                </li>
                <li class="sidebar-dropdown">
                  <a href="#">
                    <i class="fa fa-globe"></i>
                    <span>Maps</span>
                  </a>
                  <div class="sidebar-submenu">
                    <ul>
                      <li>
                        <a href="#">Google maps</a>
                      </li>
                      <li>
                        <a href="#">Open street map</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="header-menu">
                  <span>Extra</span>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-book"></i>
                    <span>Documentation</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-calendar"></i>
                    <span>Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-folder"></i>
                    <span>Examples</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="sidebar-footer">
            <a href="#">
              <i class="fa fa-bell"></i>
              <span class="badge badge-pill badge-warning notification">3</span>
            </a>
            <a href="#">
              <i class="fa fa-envelope"></i>
              <span class="badge badge-pill badge-success notification">7</span>
            </a>
            <a href="#">
              <i class="fa fa-cog"></i>
              <span class="badge-sonar"></span>
            </a>
            <a href="#" onClick={()=>this.closeSession()}>
              <i class="fa fa-power-off"></i>
            </a>
          </div>
        </nav>
        <main class="page-content" id="operation-page">
            <div class="container">
              {this.main}
            </div>
          </main>
        <app-footer></app-footer>
      </div>
    );
  }

}
