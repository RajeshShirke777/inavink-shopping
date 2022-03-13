import { Component, OnInit, HostBinding, Input, Inject, PLATFORM_ID, ElementRef, AfterViewInit } from '@angular/core';
import { SidebarMenuService } from './sidebar-menu.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {  SidenavMenu } from './sidebar-menu.model';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  expanded: boolean;
  @Input() inputSideNav: MatSidenav;
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavMenu;
  @Input() depth: number;

  constructor(private sidenavMenuService:SidebarMenuService, private elRef : ElementRef, 
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.sidenavMenuService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        // this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      let mySideNav = this.elRef.nativeElement.querySelector(".mySideNav");
        console.log(mySideNav);
    }
  }

  onItemSelected(item: SidenavMenu) {
    if (!item.children || !item.children.length) {
      if(item.displayName == "Log Out"){
        if (isPlatformBrowser(this.platformId)) {
          localStorage.getItem("place") ;
          localStorage.removeItem("isPostBack") ;
          localStorage.removeItem("user") ;
          
        this.sidenavMenuService.close();
          this.snackBar.open("Successful Logged Out", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          //this.router.navigate(["/Home"]);
          //this.router.navigate(['/two'],{relativeTo:this.route});
          setTimeout(() => {
            
            window.location.reload();
                  //this.contentLoaded = true;
                }, 3000);
        }
      }
      else{
        this.sidenavMenuService.close();
        
        this.router.navigate([item.route]);
      }
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
