import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { baseProductURL } from 'src/app/shared/baseurl';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Merchant } from 'src/app/shared/models/merchant';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  public config: SwiperConfigInterface={};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product            :   Product = {
    id: 0,
    pid: 0,
    mid: 0,
    business_name: "",
    store_name: "",
    address_line: "",
    name:  "",
    image:  "",
    stock: 0,
    is_emi_available: false,
    can_exchange: false,
    mrp: 0,
    discount_percentage: 0,
    deal_id: 0,
    deal_name:  "",
    is_deal_lock: false,
    deal_from_date:  "",
    deal_to_date: "",
    draft: false,
    description:  "",
    status:  "",
    created_at: 0,
    updated_on: 0,
    brand_name:  "",
    product_Images:[{name:""}]
  };
  public merchants           :   Merchant[] = [];

  public image: any;
  public zoomImage: any;

  public counter            :   number = 1;

  index: number;
  bigProductImageIndex = 0;
  id:number;
  latValue:number=19.16815248;;
  longValue:number=72.96100317;
  BaseProductImageUrl=baseProductURL;

  constructor(private route: ActivatedRoute, 
    public productService: ProductService,
    public merchantService: MerchantService, 
    public dialog: MatDialog, 
    private router: Router, 
    private cartService: CartService,  
    private spinnerService: SpinnerService, 
    private titleService: Title, 
    private metaTagService: Meta,    
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      var spinnerRef = this.spinnerService.start();
      this.productService.getProduct(this.id).subscribe(data => {
        
    this.spinnerService.stop(spinnerRef);
        this.product = data.product;
        console.log(this.product);
        this.metaTagService.updateTag(
          { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal, ' + 'buy ' + this.product.name + ' ' + this.product.brand_name + ', Model Name, Shops near me, Buy Online' });   
        this.metaTagService.updateTag(    
          { name: 'title', content: 'buy ' + this.product.name + ' ' + this.product.brand_name + ' near me: Inavink: Local Shop near me' });   
        this.metaTagService.updateTag(
          { name: 'description', content: 'buy ' + this.product.name + ' ' + this.product.brand_name + ' near me: Inavink: Local Shop near me'  });
        this.metaTagService.updateTag(
          { name:  'robots', content: 'index, follow' });
        this.metaTagService.updateTag(
          { name: 'author', content: 'InAVink' });
        this.metaTagService.updateTag(
          { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
        this.metaTagService.updateTag(
          { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'});   
          this.titleService.setTitle('buy ' + this.product.name + ' ' + this.product.brand_name + ' near me: Inavink: Local Shop near me');
  this.getRelatedMerchants();
      }
        );

        
    
    });
   }

  ngOnInit() {

    
    

    //this.getRelatedProducts();
  }




  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }


  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: {product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products/details', product.id, product.name]);
      }
    });
  }


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




public increment() {
  this.counter += 1;
}

public decrement() {
  if(this.counter >1){
     this.counter -= 1;
  }
}

getRelatedMerchants() {
  var listRequest:ListRequest={
    latitude:this.latValue,
    longitude:this.longValue,
    pid:this.id,
  }

  this.merchantService.getMerchantsByProductId(listRequest).subscribe(data => {
    this.merchants = data.merchant;
   
    this.merchants.forEach((value,index)=>{
      
      if(value.mid==this.product.merchant_id) this.merchants.splice(index,1);
  });
  console.log(this.merchants);
  }
  );
}

  // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
    console.log(product);
  }

   // Add to cart
   public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product,parseInt(quantity));
      this.router.navigate(['/checkout']);
 }



 public onMouseMove(e){
  if (isPlatformBrowser(this.platformId)) {
  if(window.innerWidth >= 1280){
    var image, offsetX, offsetY, x, y, zoomer;
    image = e.currentTarget;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    x = offsetX/image.offsetWidth*100;
    y = offsetY/image.offsetHeight*100;
    zoomer = this.zoomViewer.nativeElement.children[0];
    if(zoomer){
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
      zoomer.style.display = "block";
      zoomer.style.height = image.height + 'px';
      zoomer.style.width = image.width + 'px';
    }
  }
}
}

public onMouseLeave(event){
  this.zoomViewer.nativeElement.children[0].style.display = "none";
}

public openZoomViewer(){
  this.dialog.open(ProductZoomComponent, {
    data: this.zoomImage,
    panelClass: 'zoom-dialog'
  });
}



}


