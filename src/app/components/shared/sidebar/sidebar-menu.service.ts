import { Injectable, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})




export class SidebarMenuService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {

  }

  private sidenav: MatSidenav;


    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
      return this.sidenav.open();
  }


  public close() {
      return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
   }

}







