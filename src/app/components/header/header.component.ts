import { Component, OnInit, ViewChild,Output,EventEmitter, ElementRef, Renderer2, AfterViewInit,HostListener, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { HomeService } from 'src/app/services/home.service';
import { Prediction } from 'src/app/shared/models/prediction';

import {Title} from '@angular/platform-browser';
import { AppSettings, Settings } from 'src/app/services/color-option.service';
import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';
import {FormControl, FormGroup} from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;


import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Place } from 'src/app/shared/models/place';
import { SharedService } from 'src/app/services/shared.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { ListRequest } from 'src/app/shared/requests/list-request';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { LocationInfoComponent } from '../shared/location-info/location-info.component';
import { SidenavMenu } from '../shared/sidebar/sidebar-menu.model';
import { ModalService } from 'src/app/services/modal.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('start') public sidenav: MatSidenav;
  selectedLocation: string='';
  showLocationSearch:boolean=false;
  isSticky: boolean = false;
  lstProducts: Product[];
  UserName: string;
  autocomplete: google.maps.places.AutocompleteService;

  currentPage:string;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    
    if (isPlatformBrowser(this.platformId)) {
    this.isSticky = window.pageYOffset >= 250;
    }
  }

  @Output('changeLocation')
  changeLocation: EventEmitter<Place> = new EventEmitter<Place>();
  @ViewChild('el') elRefs: ElementRef;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public place: Place;
public isLoggedIn=false;
  public sidenavMenuItems:Array<any>;

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]

  // addressValue: GermanAddress = {
  //   streetNumber: '100',
  //   streetName: 'Your StreetName',
  //   vicinity: 'Your vicinity',
  //   postalCode: 37084,
  //   locality: {
  //     long: 'your locality'
  //   }
  // };
   public flag:any;

  products: Product[];
  searchedProducts: Product[]= [];  

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  public settings: Settings;

  
  options: Prediction[] = [];  
  newList=[];
  filteredJSONDataOptions: any[];
  jsonControl = new FormControl();
  locationControl= new FormControl();
  
  filteredProductsOptions: Product[];
  productsControl = new FormControl();
  bodyText: string;
  //public zoomImage: any;

  constructor(private renderer: Renderer2, private elRef : ElementRef, 
    private cartService: CartService,
    private homeService : HomeService,
    private sharedService: SharedService,
    private sidebarMenuService:SidebarMenuService,
    private modalService:ModalService,
    private titleService: Title,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private router: Router , 
    private route:ActivatedRoute,
    public appSettings:AppSettings,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) {

      
      this.sharedService.sharingLoginData.subscribe((isLoggedIn: boolean) => { 
        console.log("isLoggedIn - " + isLoggedIn);
        this.isLoggedIn =  isLoggedIn;
      });
    this.settings = this.appSettings.settings;
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

    route.url.subscribe((url: any[])=> {
      console.log("route.url - " + url[0].path)
      })
    this.currentPage =  router.url;

    if (isPlatformBrowser(this.platformId)) {
    var recentPlace = localStorage.getItem("place") ;
    var isPostBack = localStorage.getItem("isPostBack") ;
    var userData = localStorage.getItem("user") ;
    

    if(recentPlace === null || recentPlace === undefined || recentPlace === "undefined") {
      
      this.place = this.settings.defaultPlace; 
      this.jsonControl.patchValue(this.place.name);
      this.selectedLocation=this.place.name;
      //this.modalService.close('custom-modal-1');
      localStorage.setItem("place", JSON.stringify(this.place));
    
      this.sharedService.sharingPlaceData.next(this.place); 

      
    
    }
    else{
      
      var place = JSON.parse(localStorage.getItem("place")) ;
      this.jsonControl.patchValue(place.name);
      this.selectedLocation=place.name;
      //this.modalService.close('custom-modal-1');
      this.sharedService.sharingPlaceData.next(place);
    }

    this.sharedService.sharingLoginData.subscribe((isLoggedIn: boolean) => {  
      //console.log(res);
      //this.Component3Data = res;  
      console.log("isLoggedIn" + isLoggedIn);
      this.isLoggedIn=isLoggedIn;
      var user = JSON.parse(localStorage.getItem("user")) ;
      this.UserName=user.username;
    });

    if(userData === null || userData === undefined || userData === "undefined"){
      this.isLoggedIn=false;
    }
    else{
      
       var user = JSON.parse(localStorage.getItem("user")) ;
    
      this.isLoggedIn=true;
      this.UserName=user.username;
    }

    if(isPostBack === null || isPostBack === undefined || isPostBack === "undefined"){
      
      localStorage.setItem("isPostBack", "Yes");
    
      this.dialog.open(LocationInfoComponent, {
        data: {},
        panelClass: 'zoom-dialog'
      });
    }
  }
  }

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.sidebarMenuService.setSidenav(this.sidenav);

    let el = this.elRef.nativeElement.querySelector("#txtStickyLocationSearch2");
    let el3 = this.elRef.nativeElement.querySelector("#txtStickyLocationSearch");
    let el2 = this.elRef.nativeElement.querySelector("#txtStickySearch2");
    let el4 = this.elRef.nativeElement.querySelector("#txtStickySearch");
    let el5 = this.elRef.nativeElement.querySelector("#mobileHeader");
    this.renderer.addClass(el5,"removeMargin");
    //let regex = /^b\d$/;
    let classes = el3.getAttribute('class').split(' ');   // get all classes
    console.log(classes);
     classes.forEach((cl) => {
       if(cl == "mat-input-element"){    // match classes b1, b2, b3....
         this.renderer.removeClass(el, cl);
         this.renderer.removeClass(el2, cl);
         this.renderer.removeClass(el3, cl);
         this.renderer.removeClass(el4, cl);
       }
    });
    //this.renderer.addClass(el, 'b4');
  
   
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    //console.log(el);
  }
  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.zoom = 10;
    //this.latitude = 52.520008;
    //this.longitude = 13.404954;

    //this.setCurrentPosition();

   

    // this.filteredJSONDataOptions = this.jsonControl.valueChanges.pipe(
    //    startWith(''),
    //    map(value => this.searchAddress(value))
    // );

  //   this.filteredProductsOptions = this.productsControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this.products_filter(value))
  //  );
  }

  public getProductPredictions2()  {
    
    if (isPlatformBrowser(this.platformId)) {
    if(this.locationControl.value.length<2) {
        console.log('query is too short, bye');
        return [];
    }        

    console.log(this.locationControl.value);

    let newList = [];
    this.filteredJSONDataOptions=[];
    let autocompleteSrv = new google.maps.places.AutocompleteService();
    autocompleteSrv.getPlacePredictions({
      input: this.locationControl.value
  }, function (predictions, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //this?.newList?.push({'description': "Use Current Location", 'place_id': "0", 'name':'' });
    
        this?.filteredJSONDataOptions?.push({'description': "Use Current Location", 'place_id': "0", 'name':'' });
        
        var recentPlace = localStorage.getItem("place") ;
        
    
        if(recentPlace != null && recentPlace != undefined && recentPlace != "undefined") {
          
          var place = JSON.parse(localStorage.getItem("place")) ;
  
          this?.filteredJSONDataOptions?.push({'description': place.formatted_address, 'place_id': place.place_id, 'name':place.name });
        
        }
                  predictions.forEach(element => {
            
                    this?.filteredJSONDataOptions?.push({'description': element.description, 'place_id': element.place_id , 'name':'' });
            
                    });

                    //this.filteredJSONDataOptions =newList;
      }
    });
  }
    // this.getPlacePredictions(this.locationControl.value)
    //     .then(data => {
    //       this.filteredJSONDataOptions =data;
    //     })
    //     .catch(err => console.log(err));
    

    }

  public getProductPredictions()  {
    if (isPlatformBrowser(this.platformId)) {
    if(this.productsControl.value.length<2) {
        console.log('query is too short, bye');
        return [];
    }        

    console.log(this.productsControl.value);
    
          var place = JSON.parse(localStorage.getItem("place")) ;
    
    
    var productSearchRquest:ListRequest={
      latitude:place.lat,
      longitude:place.lng,
      cid:null,
      mid:null,
      key:this.productsControl.value
    }

    this.homeService.searchProducts(productSearchRquest).subscribe(
      data =>{ 
        
        var newList:any;
        newList=[];
        this.searchedProducts = data.product;
        console.log(this.searchedProducts);
        this.searchedProducts.forEach(element => {
          //if (element.description.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            newList.push(element);
          //}
    
        });
        
        
        this.filteredProductsOptions =newList;
      }
    );
    }
    }

  private products_filter(value: string): Product[] {
    
    if (isPlatformBrowser(this.platformId)) {
    var place =JSON.parse(localStorage.getItem("place")) ;
    
    var productSearchRquest:ListRequest={
      latitude:place.lat,
      longitude:place.lng,
      cid:null,
      mid:null,
      key:value
    }

    this.homeService.searchProducts(productSearchRquest).subscribe(
      data => this.searchedProducts = data.product
    );
    console.log(this.searchedProducts);
    //const filterValue = value.toLowerCase();
    let newList = [];
    // newList.push({'description': "Use Current Location", 'place_id': "0", 'name':'' });
    // var recentPlace = localStorage.getItem("place") ;

    // if(recentPlace != null && recentPlace != undefined && recentPlace != "undefined") {
      
    //   var place = JSON.parse(localStorage.getItem("place")) ;
    //   newList.push({'description': place.formatted_address, 'place_id': place.place_id, 'name':place.name });
    
    // }

    this.searchedProducts.forEach(element => {
      //if (element.description.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push(element);
      //}

    });

    return newList;
  }
  }


  public getAutocompletePredictions()  {
    //console.log("test");
    if(this.jsonControl.value.length<2) {
        console.log('query is too short, bye');
        return [];
    }        
    this.getPlacePredictions(this.jsonControl.value)
        .then(data => {
          this.filteredJSONDataOptions =data;
        })
        .catch(err => console.log(err));
}

  private getPlacePredictions(query: string): Promise<any> {
    
    if (isPlatformBrowser(this.platformId)) {
    let newList = [];
    let autocompleteSrv = new google.maps.places.AutocompleteService();
    return new Promise((resolve, reject) => {
      autocompleteSrv.getPlacePredictions({
            input: query
        }, function (predictions, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              newList.push({'description': "Use Current Location", 'place_id': "0", 'name':'' });
    var recentPlace = localStorage.getItem("place") ;

    if(recentPlace != null && recentPlace != undefined && recentPlace != "undefined") {
      
      var place = JSON.parse(localStorage.getItem("place")) ;
      newList.push({'description': place.formatted_address, 'place_id': place.place_id, 'name':place.name });
    
    }
              predictions.forEach(element => {
        
                newList.push({'description': element.description, 'place_id': element.place_id , 'name':'' });
        
                });
                console.log(newList);
                resolve(newList);
            } else {
                reject(status);
            }
        });
    });
  }
}   

  

  public selectHandler(event : MatAutocompleteSelectedEvent) : void
  {
    console.log(event);
    event.option.deselect();
    //this.doStuffWith(event.option.value)
  }
  public onSelectedProduct(value: Product): void {
    this.productsControl.patchValue("");
    this.productsControl.patchValue(value.name);
    console.log(value.name);
  }
  
  public onSelectedPlace(value: Prediction): void {
    
    if (isPlatformBrowser(this.platformId)) {
    //console.log(event); 
    // //.value.description = "test";
    //event.option.deselect();
    if(value.place_id == "0") {
      
      this.jsonControl.patchValue("");
      this.setCurrentPosition();
    }
    else {
      
      this.jsonControl.patchValue("");
    this.homeService.getPlaceDetails(value.place_id).subscribe(
      data => { this.place = data.place;
        //console.log(this.place);
        
        this.jsonControl.patchValue(this.place.name);
        
      this.selectedLocation=this.place.name;
      
      this.modalService.close('custom-modal-1');
      this.showLocationSearch = false;
        localStorage.setItem("place", JSON.stringify(this.place));
        localStorage.setItem("isPostBack", "yes");
        
        this.sharedService.sharingPlaceData.next(this.place); 
        
        this.currentPage =  this.router.url;
        console.log("currentPage - " + this.currentPage);
        this.router.navigate(['/home']);
      }   
  );
    }
  }
    
          
    
  
}

  private setCurrentPosition() {
    
    if (isPlatformBrowser(this.platformId)) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.homeService.getPlaceDetailsByLatLng(this.latitude,this.longitude).subscribe(
          data => { this.place = data.place;
          this.jsonControl.patchValue(this.place.name);
          
      this.selectedLocation=this.place.name;
      this.modalService.close('custom-modal-1');
      this.showLocationSearch = false;
          localStorage.setItem("place", JSON.stringify(this.place));
          localStorage.setItem("isPostBack", "yes");
          this.sharedService.sharingPlaceData.next(this.place); 
          
          
            this.currentPage =  this.router.url;
            console.log("currentPage - " + this.currentPage);
            // if(this.currentPage != '/home' && this.currentPage !="/products" 
            // && this.currentPage !="/shops" && this.currentPage !="/nearby-stores")
          this.router.navigate(['/home']);
        }   
        );
      }); 
    }
  }
  }

  public logOut(){
    
    if (isPlatformBrowser(this.platformId)) {
    localStorage.getItem("place") ;
    localStorage.removeItem("isPostBack") ;
    localStorage.removeItem("user") ;
    
    //this.router.navigate(['/two'],{relativeTo:this.route});
    setTimeout(() => {
      //this.router.navigate(['/home']);
      window.location.reload();
      //this.router.navigate(['/home'],{relativeTo:this.route});
      this.snackBar.open("Successful Logged Out", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
            //this.contentLoaded = true;
          }, 3000);
  }
}

//   private setCurrentPosition() {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.zoom = 12;
//       });
//     }
//   }

//   onAutocompleteSelected(result: PlaceResult) {
//     console.log('onAutocompleteSelected: ', result);
//   }

//   onLocationSelected(location: Location) {
//     console.log('onLocationSelected: ', location);
//     localStorage.setItem("latitude", JSON.stringify(location.latitude));
//     localStorage.setItem("longitude", JSON.stringify(location.longitude));
//     this.latitude = JSON.parse(localStorage.getItem("latitude")) || 0;
//     this.longitude = JSON.parse(localStorage.getItem("longitude")) || 0;
    
//     console.log('latitude: ', this.latitude);
//     console.log('longitude: ', this.longitude);
//   }

//  onGermanAddressMapped($event: GermanAddress) {
//     console.log('onGermanAddressMapped', $event);
//   }

  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'group',
      route: '/home'
    },
    {
      displayName: 'Cart',
      iconName: 'group',
      route: '/cart'
    },
    {
      displayName: 'Checkout',
      iconName: 'group',
      route: '/checkout'
    },
    {
      displayName: 'My Orders',
      iconName: 'group',
      route: '/orders/myorders'
    },
    {
      displayName: 'Manage Address',
      iconName: 'group',
      route: '/profile/manage-address'
    },
    {
      displayName: 'My Profile',
      iconName: 'group',
      route: '/profile/myprofile'
    },
    {
      displayName: 'Log Out',
      iconName: 'group',
      route: '/profile/myprofile'
    }
  ];

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
