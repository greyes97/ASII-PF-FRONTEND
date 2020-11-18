import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
  shadow: true,
})
export class AppFooter {

  render() {
    return (
      <Host>
        <div class="container-fluid footer">
          <div class="row pt-4">
            <div class="col-md-12 text-center mb-2">
              <small> © 2020 made by <span
                  class="text-secondary font-weight-bold">Edy Developer Jr <i class="fas fa-layer-group"></i></span></small>
            </div>
            <div class="col-md-12 text-center mb-3">
              <a href="https://github.com/greyes97/ASII-PF-FRONTEND.git" target="_blank"
                class="btn btn-sm bg-light text-dark shadow-sm rounded-circle text-light m-2"><i class="fab fa-github"></i></a>
            </div>
            <div class="col-md-12 text-center">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=greyes97&repo=ASII-PF-FRONTEND&type=fork&count=true&size=small"
                frameborder="0" scrolling="0" width="80px" height="20px"></iframe>

              <iframe
                src="https://ghbtns.com/github-btn.html?user=greyes97&repo=ASII-PF-FRONTEND&type=star&count=true&size=small"
                frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
