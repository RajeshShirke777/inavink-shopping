import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { baseProductURL } from 'src/app/shared/baseurl';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { SpinnerService } from 'src/app/services/spinner.service';
import { SharedService } from 'src/app/services/shared.service';
import { Merchant } from 'src/app/shared/models/merchant';
import { Place } from 'src/app/shared/models/place';
import { baseShopImageURL } from 'src/app/shared/baseurl';
import { Category } from 'src/app/shared/models/category';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  working_hours:string='';
  googleMapUrl:string='';
  BaseShopImageUrl=baseShopImageURL;
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public loadSpinnerForPagination:boolean=false;
  public filterForm: FormGroup;
  //public colorFilters :   ColorFilter[] = [];

  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public totalCount:number=0;
  public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public merchantId:number =0;
  public unique_name:string ='';
  public merchant:Merchant;
  public store_name:string='';
  cid: number;

  
  public categories:Category[];
  public selectedCategory:number=0;
  public selectedCategoryName:string;
  key: string='';

  public banners = [
    { title: '', subtitle: '', image: 'assets/images/carousel/banner1.png' },
    // { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    // { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    // { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];
  latValue: any;
  longValue: any;
  constructor(public productService: ProductService,
    public merchantService: MerchantService,     
    public homeService: HomeService,     
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private metaTagService:Meta,
    @Inject(PLATFORM_ID) private platformId: Object) {
      console.log("data - ");
     
      this.route.params.subscribe(
      (params: Params) => {
        //this.merchantId  = params['id'];
        this.unique_name  = params['name'];
        
        
          //var spinnerRef = this.spinnerService.start();
          //
            
            this.merchantService.getStoreDetails(this.unique_name).subscribe(data => {
              if(data.status == "success"){
              this.merchant = data.merchant;
              this.merchantId = this.merchant.mid;
              this.store_name =  this.merchant.store_name;
              this.banners = [ { title: '', subtitle: '',image: this.merchant.store_images[0]}]
              console.log("data - " + this.merchant );
              this.googleMapUrl="https://www.google.com/maps/place/"+this.merchant.latitude+','+this.merchant.longitude;

              this.metaTagService.updateTag(
      { name: 'keywords', content: this.merchant.store_name + ',' + this.merchant.city +', Buy Online , near me' });   
    this.metaTagService.updateTag(    
      { name: 'title', content: this.merchant.store_name + ': ' + this.merchant.city + ' : Buy products' });   
    this.metaTagService.updateTag(
      { name: 'description', content: 'buy Online from Local Stores near you. Order Online from ' + this.merchant.store_name + ' in ' + this.merchant.city  + ' near you, ' + this.merchant.phone_no + ' and ' + this.merchant.address_line1 + ' ' + this.merchant.address_line2 + ' ' + this.merchant.city + ' ' + this.merchant.pincode  });
    this.metaTagService.updateTag(
      { name:  'robots', content: 'index, follow' });
    this.metaTagService.updateTag(
      { name: 'author', content: 'InAVink' });
    this.metaTagService.updateTag(
      { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
    this.metaTagService.updateTag(
      { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'});   
      
    this.titleService.setTitle(this.merchant.store_name + ': ' + this.merchant.city + ' : Buy products');
              }

              
    this.loadMerchantCategories();
    //this.loadMerchant();
    this.loadMerchantProducts();
              
             //this.spinnerService.stop(spinnerRef);
               }); 
        //}    
      }
    );
    if (isPlatformBrowser(this.platformId)) {
    this.sharedService.sharingPlaceData.subscribe((place: Place) => {  
      //console.log(res);
      //this.Component3Data = res; 
      this.page=1; 
      this.selectedCategory=0;
             
    }); 

    
  }
  }

  ngOnInit() {
    
  }

  loadMerchantCategories(){
    if (isPlatformBrowser(this.platformId)) {
    var place =  JSON.parse(localStorage.getItem("place")) ;
    
      this.selectedCategory=0;
      this.selectedCategoryName='all';

    //this.displayProgressSpinner = true;
      this.latValue=place.lat;
      this.longValue=place.lng;

    var categorylistRquest:ListRequest={
      latitude:this.latValue,
      longitude:this.longValue,
      cid:null,
      mid:this.merchantId,
      key:null
    }

 this.homeService.getCategories(categorylistRquest)
 .subscribe(
  data => {
     this.categories = data.Categories;
    });
  }
  }

  loadMerchant(){
    
    
  }

  
  
  loadMerchantProducts(){

    if (isPlatformBrowser(this.platformId)) {
      var spinnerRef;

      if(this.loadSpinnerForPagination)
        spinnerRef = this.spinnerService.start();

    var place =  JSON.parse(localStorage.getItem("place")) ;

    var productlistRquest: ListRequest={
      latitude:place.lat,
      longitude:place.lng,
      cid:this.selectedCategory,
      mid:this.merchantId,
      key:this.key,
      pageNo:this.page,
      itemsPerPage:12,
    }

    this.productService.listProduct(productlistRquest).subscribe(data => {
      this.allItems = data.product;
      this.totalCount = data.totalCount;
       if(this.loadSpinnerForPagination){
          this.spinnerService.stop(spinnerRef);
       }
      //this.products = products.slice(0.8);
      //this.getTags(products)
      //this.getColors(products)
       }); 
      }
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
    // Animation Effect fadeIn
    public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

    // Update tags filter
    public updateTagFilters(tags: any[]) {
      this.tagsFilters = tags;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }



    // sorting type ASC / DESC / A-Z / Z-A etc.
    public onChangeSorting(val) {
      this.sortByOrder = val;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
   }

     // Initialize filetr Items
  

public onPageChanged(event){
  if (isPlatformBrowser(this.platformId)) {
    this.loadSpinnerForPagination=true;
  this.page = event;
  this.allItems;

  window.scrollTo(0,720);
  this.loadMerchantProducts();
  }
}

public onCategoryChange (event){
  
  this.loadSpinnerForPagination=true;
    this.key="";
    this.page = 1;
    var lstCategories = this.categories.filter(element => {
      return element.id == this.selectedCategory;
    });
    if(lstCategories.length > 0){
      this.selectedCategoryName= lstCategories[0].name;
    }
    this.loadMerchantProducts();

  }

  onChangeEvent(event: any){
    this.page = 1;
  this.key=event.target.value;
    this.loadMerchantProducts();
  //console.log(event.target.value);
}

onProductChange(){
  this.page = 1;
  this.loadSpinnerForPagination=true;
    this.loadMerchantProducts();
  //console.log(event.target.value);
}


  // Update price filter
//   public updatePriceFilters(price: any) {
//     let items: any[] = [];
//     this.products.filter((item: Product) => {
//         if (item.price >= price[0] && item.price <= price[1] )  {
//            items.push(item); // push in array
//         }
//     });
//     this.items = items;
// }


  // Update price filter
  public updatePriceFilters(price: any) {
    console.log(price);
    console.log(this.products);


   this.allItems = this.products.filter((item: Product) => {
     return item.price >= price.priceFrom && item.price <= price.priceTo
    });
     console.log(this.products);

}


}


