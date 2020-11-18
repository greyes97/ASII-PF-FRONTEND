import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-viewopeation',
  styleUrl: 'app-viewopeation.css',
  shadow: true,
})
export class AppViewopeation {

  render() {
    let style={
      color:'red'
    }
    return (
      <Host>
        <h2>Analysis project II</h2>
      <hr/>
      <div class="row" id="info">
        <div class="col-xl-12 mb-4">
        <div class="card border-0 rounded-0">
          <div class="card-img-top">
          <div class="card-body">
            <div class="card-body align-items-center">
              <div class="form-group ">
                <p>This project was made with the <strong>Stencil Js</strong> framework, which in turn integrates <strong> Bootstrap 4.</strong></p>
                <hr/>
                <div class="alert enableBlur">
                <div class="disableBlur">
                <p><strong>Why Stencil?</strong></p>
                <p>Stencil was created by the Ionic Framework team to help build faster, more capable components that worked across all major frameworks.

                While Ionic primarily targeted Cordova apps, the emergence of Progressive Web Apps as a rapidly growing target for web developers demanded a different approach to web app development performance. With Ionic's classic use of traditional frameworks and bundling techniques, the team was struggling to meet latency and code size demands for Progressive Web Apps that ran equally well on fast and slow networks, across a diversity of platforms and devices.</p>
                <p>
                Additionally, framework fragmentation had created a web development interoperability nightmare, where components built for one framework didn't work with another framework.

                Web Components offered a solution to both problems, pushing more work to the browser for better performance, and targeting a standards-based component model that all frameworks could use.
                </p>
                </div>
                </div>
                <hr/>
                <p> You can find the full code on <a href="https://github.com/greyes97/ASII-PF-FRONTEND.git" target="_blank">
                    Github</a>, it also contains background images.</p>
              </div>
              <div class="form-group ">
                <iframe src="https://ghbtns.com/github-btn.html?user=greyes97&repo=ASII-PF-FRONTEND&type=watch&count=true&v=2" frameborder="0" scrolling="0" width="90px" height="30px"></iframe>
                <iframe src="https://ghbtns.com/github-btn.html?user=greyes97&repo=ASII-PF-FRONTEND&type=fork&count=true" frameborder="0" scrolling="0" width="90px" height="30px"></iframe>
              </div>
              
            </div>

          </div>
            
          </div>
          
        </div>
        </div>
      </div>
      <h5>More information</h5>
      <hr/>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="card rounded-0 p-0 shadow-sm">
            <img src="https://mydigitalbo.com/cursos/uploads/curso_21_portada.jpg" class="card-img-top rounded-0"/>
            <div class="card-body text-center">
              <h6>On the back-end side, it was used</h6>
              <h5 class="card-title">Spring Boot</h5>
              <a href="https://github.com/greyes97/ASII-PF-BACKEND.git" target="_blank" class="btn btn-primary btn-sm">Github</a>
              <hr/>
              <div class="text-center">
              <div class="mb-2">
              <a href="https://github.com/greyes97/ASII-PF-BACKEND.git" target="_blank">
                <img alt="GitHub stars" src="https://img.shields.io/github/stars/greyes97/ASII-PF-BACKEND?style=social" />
              </a>
              <a href="https://github.com/greyes97/ASII-PF-BACKEND.git" target="_blank">
                <img alt="GitHub stars" src="https://img.shields.io/github/forks/greyes97/ASII-PF-BACKEND?style=social" />
              </a>
              <br/>
                <small>
                  by <i class="fa fa-heart" style={style}></i> - <a target="_blank"  href="#">
                    Fernando Sicay
                  </a>
                </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="card rounded-0 p-0 shadow-sm">
            <img src="https://images.idgesg.net/images/article/2019/11/image-20191014-001142-100817676-large.jpg" class="card-img-top rounded-0" alt="Angular pro sidebar"/>
            <div class="card-body text-center">
              <h6>For the organization of the project,</h6>
              <h5 class="card-title">Jira, Atlassian.</h5>
              <a href="https://www.atlassian.com/es" target="_blank" class="btn btn-primary btn-sm">Jira</a>
              <hr/>
                <small>
                  by <i class="fa fa-heart" style={style}></i> - <a target="_blank"  href="#">
                    Angel Arturo & Gustavo Reyes.
                  </a>
                </small>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      </Host>
    );
  }

}
