import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { from } from 'rxjs';
import { HomeListResponse } from 'src/app/shared/responses/home-list-response';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { SharedService } from 'src/app/services/shared.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Place } from 'src/app/shared/models/place';
import { Category } from 'src/app/shared/models/category';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {


  public productlistRequest:ListRequest=null;
  public sidenavOpen:boolean = true;
  public animation    :   any;   // Animation
  public sortByOrder  :   string = '';   // sorting
  public page:any;
  public pageNo:number=1;
  public tagsFilters  :   any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  //public colorFilters :   ColorFilter[] = [];
  public categories:Category[];
  public selectedCategory:number=0;
  public selectedCategoryName:string;
  public items        :   Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags         :   any[] = [];
  public colors       :   any[] = [];

  public latValue:number;
  public longValue:number;
  totalCount: any;
  key: string='';

  constructor(private productService: ProductService, 
    private elRef : ElementRef,
    private homeService: HomeService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router :Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
      
      // this.sharedService.sharingPlaceData.subscribe((place: Place) => {  
      //   //console.log(res);
      //   //this.Component3Data = res;  
      //   this.pageNo=1; 
      //   this.selectedCategory=0;
               
      //   this.loadCategories("all");
      //   this.serachProducts();
      // }); 

      this.route.queryParamMap
      .subscribe((params) => {
      var parameters = params["params"];
      var strCategory = "all";
      var strSeachKey = null;

      if(parameters['category'] != null && parameters['category'] !== undefined){
        strCategory = parameters["category"];
      }
    
      if(parameters['searchkey'] != null && parameters['searchkey'] !== undefined){
        this.key = parameters['searchkey'];
      }

      console.log(strCategory + "-" + this.key);

      this.loadCategories(strCategory);
    } 
  );

    //   this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log('params' + JSON.stringify(params));
    //     var strCategory = params['category'];
    //     var strSeachKey = null;
    //     if(params['searchkey'] != null && params['searchkey'] === undefined){
    //        strSeachKey = params['searchKey'];
    //     }

    //     console.log("searchKey - " + strSeachKey);

    //     this.loadCategories(strCategory, strSeachKey);
    //   }
    // )
  }

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {
      let el = this.elRef.nativeElement.querySelector(".products-wrapper");
      el.focus();
    }
  }

  loadCategories(strCategory:string){
    if (isPlatformBrowser(this.platformId)) {
      
    var spinnerRef = this.spinnerService.start(); 
    var place =  JSON.parse(localStorage.getItem("place")) ;
    
    if(strCategory == "all"){
      this.selectedCategory=0;
      this.selectedCategoryName=strCategory;
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

      this.homeService.getCategories(categorylistRquest)
      .subscribe(
        data => {
          this.categories = data.Categories;
          var lstCategories = this.categories.filter(element => {
            return element.name == strCategory;
          });
          if(lstCategories.length > 0){
            this.selectedCategory = lstCategories[0].id;
            
            this.selectedCategoryName=lstCategories[0].name;
          }
          
      this.spinnerService.stop(spinnerRef);
          this.serachProducts();
        }
      );
    }
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
  }
  serachProducts(){

    var spinnerRef = this.spinnerService.start(); 
    this.productlistRequest = {
      latitude:this.latValue,
      longitude:this.longValue,
      cid:this.selectedCategory != 0 ? this.selectedCategory: null,
      mid:null,
      key:this.key,
      pageNo:this.page,
      itemsPerPage:12,

    }

    this.productService.listProduct(this.productlistRequest).subscribe(data => {
      this.allItems = data.product;
      this.totalCount=data.totalCount;
      this.spinnerService.stop(spinnerRef);
      });
  }

  public onPageChanged(event){
    if (isPlatformBrowser(this.platformId)) {
    this.page = event;
    this.pageNo=this.page;
    console.log(this.page);
    window.scrollTo(0,0);
    this.serachProducts();
    }
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

    this.router.navigateByUrl('/products?category=' + this.selectedCategoryName);

    //this.serachProducts();

  }

  onChangeEvent(event: any){
    this.page = 1;
    this.pageNo=1;
  this.key=event.target.value;
    this.serachProducts();
  //console.log(event.target.value);
}

onProductChange(){
  this.page = 1;
  this.pageNo=1;
  
  this.router.navigateByUrl('/products?category=' + this.selectedCategoryName);
    //this.serachProducts();
  //console.log(event.target.value);
}

     // Get current product tags
  //    public getTags(products) {
  //     var uniqueBrands = []
  //     var itemBrand = Array();
  //     products.map((product, index) => {
  //        if(product.tags) {
  //           product.tags.map((tag) => {
  //           const index = uniqueBrands.indexOf(tag);
  //           if(index === -1)  uniqueBrands.push(tag);
  //        })
  //       }
  //     });
  //     for (var i = 0; i < uniqueBrands.length; i++) {
  //          itemBrand.push({brand:uniqueBrands[i]})
  //     }
  //     this.tags = itemBrand
  //  }

     // Get current product colors
  //    public getColors(products) {
  //     var uniqueColors = []
  //     var itemColor = Array();
  //     products.map((product, index) => {
  //       if(product.colors) {
  //       product.colors.map((color) => {
  //           const index = uniqueColors.indexOf(color);
  //           if(index === -1)  uniqueColors.push(color);
  //       })
  //      }
  //     });
  //     for (var i = 0; i < uniqueColors.length; i++) {
  //          itemColor.push({color:uniqueColors[i]})
  //     }
  //     this.colors = itemColor
  //  }




  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  //   // Animation Effect fadeIn
  //   public fadeIn() {
  //     this.animation = 'fadeIn';
  // }

  // Animation Effect fadeOut
  // public fadeOut() {
  //     this.animation = 'fadeOut';
  // }

  //   // Update tags filter
  //   public updateTagFilters(tags: any[]) {
  //     this.tagsFilters = tags;
  //     this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  // }



    // sorting type ASC / DESC / A-Z / Z-A etc.
  //   public onChangeSorting(val) {
  //     this.sortByOrder = val;
  //     this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  //  }

     // Initialize filetr Items
//   public filterItems(): Product[] {
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

// }


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

  







 