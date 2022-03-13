import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { from } from 'rxjs';
import { HomeListResponse } from 'src/app/shared/responses/home-list-response';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { SharedService } from 'src/app/services/shared.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Place } from 'src/app/shared/models/place';
import { Category } from 'src/app/shared/models/category';
import { AppSettings } from 'src/app/services/color-option.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {


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

  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];
  public productType:string;
  selectedCategory: number;
  latValue: any;
  longValue: any;
  categories: Category[];
  settings: any;

  constructor(private productService: ProductService, 
    private homeService: HomeService,    
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    public appSettings:AppSettings,
    @Inject(PLATFORM_ID) private platformId: Object) {    

    this.settings = this.appSettings.settings;

    
      this.sharedService.sharingPlaceData.subscribe((place: Place) => {  
        //console.log(res);
        //this.Component3Data = res;  
        this.pageNo=1; 
               
        this.loadCategories("all");
        this.searchProduct();
      });  

      
    if (isPlatformBrowser(this.platformId)) {
      var recentPlace = localStorage.getItem("place") ;

      if(recentPlace === null || recentPlace === undefined || recentPlace === "undefined") {
        
        var place = this.settings.defaultPlace; 
        this.latValue = place.lat;
        this.longValue = place.lng;
        localStorage.setItem("place", JSON.stringify(place));
      
      }
      else{
        var place = JSON.parse(localStorage.getItem("place")) ;
        this.latValue = place.lat;
        this.longValue = place.lng;
      }
    }



      console.log(router.url);
      if(router.url.toString().endsWith("featured")){
        this.productType ="featured-products";
      }
      else if(router.url.toString().endsWith("latest")){
        this.productType ="latest-products";
      }
      
  }

  

public onPageChanged(event){
  if (isPlatformBrowser(this.platformId)) {
  this.page = event;
  this.pageNo=this.page;
  console.log(this.page);
  window.scrollTo(0,0);
  this.searchProduct();
  }
}

  searchProduct(){
    
  if (isPlatformBrowser(this.platformId)) {
    var spinnerRef = this.spinnerService.start();

if(this.productType == "featured-products") {
    this.homeService.getFeaturedProducts(this.latValue,this.longValue,this.pageNo).subscribe(data => {
      this.allItems = data.products;
      this.totalCount = data.totalCount;
      
     this.spinnerService.stop(spinnerRef);
     window.scrollTo(0,0);
      //this.products = products.slice(0.8);
      //this.getTags(products)
      //this.getColors(products)
       });
      }
      else if(this.productType == "latest-products"){
        this.homeService.getRecentlyAddedProducts(this.latValue,this.longValue,this.pageNo).subscribe(data => {
          this.allItems = data.products;
          this.totalCount = data.totalCount;
          
         this.spinnerService.stop(spinnerRef);
          //this.products = products.slice(0.8);
          //this.getTags(products)
          //this.getColors(products)
           });
          }
        }
      
  }



     // Get current product tags
     public getTags(products) {
      var uniqueBrands = []
      var itemBrand = Array();
      products.map((product, index) => {
         if(product.tags) {
            product.tags.map((tag) => {
            const index = uniqueBrands.indexOf(tag);
            if(index === -1)  uniqueBrands.push(tag);
         })
        }
      });
      for (var i = 0; i < uniqueBrands.length; i++) {
           itemBrand.push({brand:uniqueBrands[i]})
      }
      this.tags = itemBrand
   }

     // Get current product colors
     public getColors(products) {
      var uniqueColors = []
      var itemColor = Array();
      products.map((product, index) => {
        if(product.colors) {
        product.colors.map((color) => {
            const index = uniqueColors.indexOf(color);
            if(index === -1)  uniqueColors.push(color);
        })
       }
      });
      for (var i = 0; i < uniqueColors.length; i++) {
           itemColor.push({color:uniqueColors[i]})
      }
      this.colors = itemColor
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
    this.loadCategories("all");
    this.searchProduct();
  }

  loadCategories(strCategory:string){
    if (isPlatformBrowser(this.platformId)) {
    var place =  JSON.parse(localStorage.getItem("place")) ;
    
    if(strCategory == "all"){
      this.selectedCategory=0;
    }
    //this.displayProgressSpinner = true;
      this.latValue=place.lat;
      this.longValue=place.lng;

    var categorylistRquest:ListRequest={
      latitude:this.latValue,
      longitude:this.longValue,
      cid:null,
      mid:null,
      key:null
    }

 this.homeService.getCategories(categorylistRquest)
 .subscribe(
  data => {
     this.categories = data.Categories;
     var lstCategories = this.categories.filter(element => {
      return element.name == strCategory;
    });
    if(lstCategories.length > 0)
      this.selectedCategory = lstCategories[0].id;
    //this.serachProducts();
   }
 );
  }
  }
  serachProducts() {
    throw new Error('Method not implemented.');
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
   public filterItems(): Product[] {
//     return this.items.filter((item: Product) => {
//         const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
//           if(item.colors){
//             if (item.colors.includes(curr.color)) {
//               return prev && true;
//             }
//           }
//         }, true);
//         const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
//           if(item.tags) {
//             if (item.tags.includes(curr)) {
//               return prev && true;
//             }
//           }
//         }, true);
//         return Colors && Tags; // return true
//     });
return [];

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

onBrendsChanged(newBrend) {
  // console.log(newBrend);
  // this.allItems = newBrend === 'all' ? this.products : this.products.filter(

  //   item => item.brand === newBrend
  // )
  // console.log(this.allItems);


}


}

  







 