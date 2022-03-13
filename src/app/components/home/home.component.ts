import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID  } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomeService } from 'src/app/services/home.service';
import { Product } from 'src/app/shared/models/product';
import { Banner } from 'src/app/shared/models/banner';
import { Merchant } from 'src/app/shared/models/merchant';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { from } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { SharedService } from 'src/app/services/shared.service';
import { Place } from 'src/app/shared/models/place';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { isPlatformBrowser } from '@angular/common';
import { AppSettings } from 'src/app/services/color-option.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  

  featuredProducts: Product[]=[];
  latestProducts: Product[]=[];
  nearByStores: Merchant[]=[];
  latValue:number=0;
  longValue:number=0;
  contentLoaded = false;
  categoryLoaded = false;
  bannerLoaded = false;
  banners : Banner[]=[];
  topCategories: Category[]=[];
  place:Place= { lat:0, lng:0, postal_code:'', formatted_address:'',name:'',place_id:''};
  public slides : Banner[]=[];
  banner1:Banner={
    brief_content:'',
    id:1,
    title:'',
    created_at:1,
    draft:false,
    full_content:'',
    last_update:1,
    status:true,
    image: 'assets/banner/Local Shop Online Inavink Home Banner_new.png'
  }
    // { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    // { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    // { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  //];
  settings: any;

  constructor(private homeService: HomeService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    public appSettings:AppSettings,
    private metaTagService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object) { 

      this.settings = this.appSettings.settings;
      this.sharedService.sharingPlaceData.subscribe((place: Place) => {  
        //console.log(res);
        //this.Component3Data = res;  
        this.categoryLoaded=false;
        this.contentLoaded=false;
        this.ShowData(place.lat,place.lng);
      })

      if (isPlatformBrowser(this.platformId)) {
        var recentPlace = localStorage.getItem("place") ;        
    
        if(recentPlace === null || recentPlace === undefined || recentPlace === "undefined") {
          
          this.place = this.settings.defaultPlace; 
          
          localStorage.setItem("place", JSON.stringify(this.place)); 

           
          this.ShowData( this.place.lat, this.place.lng);             
        
        }
        else{
          
          var myplace = JSON.parse(localStorage.getItem("place")) ;
           
          this.ShowData(myplace.lat,myplace.lng);  
        }
      }     
    }

    
    ShowData(lat: number,lng:number) {
      //var spinnerRef = this.spinnerService.start(); 
      //this.displayProgressSpinner = true;
    this.latValue=lat;
    this.longValue=lng;

      this.homeService.getFeaturedProducts(this.latValue,this.longValue,0)
 .subscribe(
  data => {
     this.featuredProducts = data.products;
     this.contentLoaded=true;
     //this.spinnerService.stop(spinnerRef);
     //this.displayProgressSpinner = false;
   }
 )

 this.homeService.getRecentlyAddedProducts(this.latValue,this.longValue,0)
 .subscribe(
  data => {
     this.latestProducts = data.products
   }
 )

 this.homeService.getNearbyStores(this.latValue,this.longValue,0, "", 0)
 .subscribe(
  data => {
     this.nearByStores = data.merchant
   }
 )

  var categorylistRquest:ListRequest={
    latitude:this.latValue,
    longitude:this.longValue,
    cid:undefined,
    mid:0,
    key:undefined
  }

  var spinnerRef = this.spinnerService.start();
 this.homeService.getCategories(categorylistRquest)
 .subscribe(
  data => {
     this.topCategories = data.Categories.slice(0, data.Categories.length > 7 ? 7 : data.Categories.length);
     this.categoryLoaded=true;
     
    this.spinnerService.stop(spinnerRef);
   }
 );
  }

  ngOnInit() {

    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.addTags([     
      { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' },
      { name: 'title', content: 'Buy Online from Local Shops Near you | Vocal for Local | Near Me ' },      
      { name: 'description', content: 'Be Vocal for Local, now checkout and Shop Online from Local Shops near me. One of the Best of India Shopping site to support Local stores' },      
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'InAVink' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    
    this.slides.push(this.banner1);
    this.homeService.getBanners()
    .subscribe(
      data => {this.banners = data.banners; this.bannerLoaded=true;}
    );

   }

  // Display progress spinner for 3 secs on click of button
  showProgressSpinner = () => {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3000);
  };
  showSpinnerWithoutBackdrop = () => {
    this.spinnerWithoutBackdrop = true;
    setTimeout(() => {
      this.spinnerWithoutBackdrop = false;
    }, 3000);
  };

  
}