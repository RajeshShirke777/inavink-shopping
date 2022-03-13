import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { Settings, AppSettings } from 'src/app/services/color-option.service';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

//import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  
  title = 'Home';
  public settings: Settings;
  public url : any;

  constructor(private spinner: NgxSpinnerService, 
    public appSettings:AppSettings, 
    public router: Router,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  }


  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0)
    }
  });
  if (isPlatformBrowser(this.platformId)) {
  document.documentElement.style.setProperty('--theme-deafult', '#2d4f66');
  }
  }

}