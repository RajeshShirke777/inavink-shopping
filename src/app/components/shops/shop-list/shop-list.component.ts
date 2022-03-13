import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { from } from 'rxjs';
import { HomeListResponse } from 'src/app/shared/responses/home-list-response';
import { Merchant } from 'src/app/shared/models/merchant';
import { SharedService } from 'src/app/services/shared.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Place } from 'src/app/shared/models/place';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { AppSettings } from 'src/app/services/color-option.service';
import { Category } from 'src/app/shared/models/category';
import { map, startWith } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {


  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public pageNo:number=1;
  public totalCount:number=0;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  //public colorFilters :   ColorFilter[] = [];

  public items        :   Merchant[] = [];
  public allItems: Merchant[] = [];
  public products: Merchant[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  selectedCategory: number;
  selectedCategoryName: string;
  latValue: any;
  longValue: any;
  key: string="";
  categories: Category[];
  settings: any;
  shopControl = new FormControl();
  filteredShops: any;

  constructor(private productService: ProductService, 
    private homeService: HomeService,   
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private route: ActivatedRoute,
    public appSettings:AppSettings,
    @Inject(PLATFORM_ID) private platformId: Object,    
    private metaTagService: Meta) {
      
    this.settings = this.appSettings.settings;
      this.sharedService.sharingPlaceData.subscribe((place: Place) => {  
        //console.log(res);
        //this.Component3Data = res;  
        this.pageNo=1; 
               
               
        this.loadCategories("all");
        this.searchMerchant();
      });  

      this.route.params.subscribe(
        (params: Params) => {
          
          var strCategory = params['category'];
  
          
  
          this.loadCategories(strCategory);
        }
      )
      
      
  }

public onPageChanged(event){
  this.page = event;
  this.pageNo=this.page;
  console.log(this.page);
  window.scrollTo(0,0);
  this.searchMerchant();
}
searchMerchant(){
  var spinnerRef = this.spinnerService.start();

  this.homeService.getNearbyStores(this.latValue,this.longValue, this.selectedCategory, this.key, this.pageNo).subscribe(data => {
    this.allItems = data.merchant;
    this.totalCount = data.totalCount;
    
   this.spinnerService.stop(spinnerRef);
    //this.products = products.slice(0.8);
    //this.getTags(products)
    //this.getColors(products)
     });    
    
}

ngOnInit() {
 
  this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
  this.metaTagService.updateTag(
    { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
  this.metaTagService.updateTag(    
    { name: 'title', content: 'Buy Online from Local Shops Near you | Vocal for Local | Near Me' });   
  this.metaTagService.updateTag(
    { name: 'description', content: 'Be Vocal for Local, now checkout and Shop Online from Local Shops near me. One of the Best of India Shopping site to support Local stores'  });
  this.metaTagService.updateTag(
    { name:  'robots', content: 'index, follow' });
  this.metaTagService.updateTag(
    { name: 'author', content: 'InAVink' });
  this.metaTagService.updateTag(
    { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
  this.metaTagService.updateTag(
    { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'});   
  //this.loadCategories("all")
  //this.searchMerchant();

  
}

onChangeEvent(event: any){
  this.page = 1;
  this.pageNo=1;
  this.key=event.target.value;
    this.searchMerchant();
  //console.log(event.target.value);
}

onShopChange(){
  this.page = 1;
  this.pageNo=1;
    this.searchMerchant();
  //console.log(event.target.value);
}

loadCategories(strCategory:string){
  if (isPlatformBrowser(this.platformId)) {
  var place = JSON.parse(localStorage.getItem("place")) ;
  
  if(strCategory == "all"){
    this.selectedCategory=0;
    this.selectedCategoryName=strCategory;
    console.log(this.selectedCategoryName);
  }
  //this.displayProgressSpinner = true;
    this.latValue=place.lat;
    this.longValue=place.lng;

  var categorylistRquest:ListRequest={
    latitude:this.latValue,
    longitude:this.longValue,
    cid:null,
    mid:0,
    key:null
  }

  var spinnerRef = this.spinnerService.start();
this.homeService.getCategories(categorylistRquest)
.subscribe(
data => {
  
    this.spinnerService.stop(spinnerRef);
   this.categories = data.Categories;
   var lstCategories = this.categories.filter(element => {
    return element.name == strCategory;
  });
  if(lstCategories.length > 0){
    this.selectedCategory = lstCategories[0].id;
    this.selectedCategoryName= lstCategories[0].name;
    console.log(this.selectedCategoryName);
  }
    this.searchMerchant();
 }
);
  }
}
  serachProducts() {
    throw new Error('Method not implemented.');
  }

  public onCategoryChange (event){
    
    this.key="";
    this.page = 1;
    this.pageNo=1;
    var lstCategories = this.categories.filter(element => {
      return element.id == this.selectedCategory;
    });
    if(lstCategories.length > 0){
      this.selectedCategoryName= lstCategories[0].name;
    }
    this.searchMerchant();

  }

  public onChange (event){
    
    this.page = 1;
    this.pageNo=1;
    this.searchMerchant();

  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
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
//   public updatePriceFilters(price: any) {
//     console.log(price);
//     console.log(this.products);


//    this.allItems = this.products.filter((item: Product) => {
//      return item.price >= price.priceFrom && item.price <= price.priceTo
//     });
//      console.log(this.products);

// }

// onBrendsChanged(newBrend) {
//   console.log(newBrend);
//   this.allItems = newBrend === 'all' ? this.products : this.products.filter(

//     item => item.brand === newBrend
//   )
//   console.log(this.allItems);


// }


}

  







 