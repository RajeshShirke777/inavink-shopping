import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import {Product} from "../../modals/product.model";
//import {CartItem} from "../../modals/cart-item";
//import {ProductService} from "../shared/services/product.service";
//import {CartService} from "../shared/services/cart.service";
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from 'src/app/components/shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from 'src/app/components/shared/sidebar/sidebar-menu.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

 public sidenavMenuItems:Array<any>;
public showHeaderFooter:boolean=false;
  //products: Product[];
  //indexProduct: number;
  //shoppingCartItems: CartItem[] = [];

  public banners = [];

  //wishlistItems  :   Product[] = [];

  public url : string='';

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Home-1',
          iconName: 'group',
          route: '/one'
        }]
      }];

  constructor(public router: Router)  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.toLowerCase();
        console.log(event.url);
        if(this.url.indexOf('login') > 0 || this.url.indexOf('signup') > 0 || this.url.indexOf('forgotpassword'
        ) > 0){
          this.showHeaderFooter=false;
          }
          else{
            
          this.showHeaderFooter=true;
          }
          console.log( this.showHeaderFooter);
      }
    } )
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }
}
