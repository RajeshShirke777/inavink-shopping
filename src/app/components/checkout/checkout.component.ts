import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart-item';
import { ProductService } from 'src/app/services/product.service';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerAddress } from 'src/app/shared/models/customer-address';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OrderService } from 'src/app/services/order.service';
import { ProductOrder } from 'src/app/shared/models/product-order';
import { ProductOrderDetail } from 'src/app/shared/models/product-order-detail';
import { OrderRequest } from 'src/app/shared/requests/order-request';
import { MerchantService } from 'src/app/services/merchant.service';
import { ListRequest } from 'src/app/shared/requests/list-request';
import { Merchant } from 'src/app/shared/models/merchant';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SharedService } from 'src/app/services/shared.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isChecked = true;
  isAddressSelected = true;
  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  AddressList: CustomerAddress[];
  shopList: CustomerAddress[];
  userId: number;

  amount: number=0;
  shippingFee:number=0;
  total:number=0;
  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  paymentOptions: any[] = [{name:'Cash On Delivery', checked:false},{name: 'Swipe On Delivery', checked:false},{name: 'Scan On Delivery', checked:false}];
  customerAddress: CustomerAddress={
    id:0,
    address_line_1:'',
    address_line_2:'',
    address_type:'',
    contact_name:'',
    contact_no:'',
    is_deleted:false,
    lat:0,
    lng:0,
    location_details:'',
    user_id:0
  };
  emailId: string;
  merchant: Merchant;
  user:any;
  googleMapUrl: string;

  constructor(private cartService: CartService, public productService: ProductService,    
    private accountService:AccountService,
    private orderService:OrderService,    
    private merchantService:MerchantService,    
    private sharedService:SharedService,
    public spinnerService:SpinnerService,
    private titleService: Title,
    private metaTagService: Meta,
    public snackBar: MatSnackBar,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
      var userData = localStorage.getItem("user") ;
      if(userData === null || userData === undefined || userData === "undefined"){
        
        this.router.navigate(['/accounts/login'], { queryParams: { returnUrl: '/checkout' }});
      }
      else{
        this.user = JSON.parse(localStorage.getItem("user")) ;
        console.log(this.user);
        //this.userId=user.id;
      }
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
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => { 
      this.buyProducts = products;
      this.calculateTotal();
    });
    this.getSubTotal().subscribe(amount => {
      this.amount = amount
    });
    
    this. getMerchantDetails()
    this.getAddressList();

  }

  getMerchantDetails(){
    
    if(this.buyProducts.length > 0)
    {
      
      if (isPlatformBrowser(this.platformId)) {
      var recentPlace = localStorage.getItem("place") ;
    
        if(recentPlace != null && recentPlace != undefined && recentPlace != "undefined") {
          
          var place = JSON.parse(localStorage.getItem("place")) ;
          
        }
      var merchantlistRquest: ListRequest={
        latitude:place.lat,
        longitude:place.lng,
        cid:null,
        mid:this.buyProducts[0].product.mid == undefined? this.buyProducts[0].product.merchant_id:this.buyProducts[0].product.mid,
        key:null
      }
    console.log(merchantlistRquest);
        this.merchantService.getMerchantDetails(merchantlistRquest.mid).subscribe(data => {
          //if(data.merchant.length > 0){
            console.log(data.merchant);
          this.merchant = data.merchant;  
          
          //this.calculateTotal();
          
          if(this.isChecked == true && this.amount <= this.merchant.charge){
            this.shippingFee =  this.merchant.delivery_charges;
          }
          else{
            this.shippingFee = 0;
          }
      
          this.total = this.amount + this.shippingFee;
          this.googleMapUrl="https://www.google.com/maps/place/"+this.merchant.latitude+','+this.merchant.longitude;

          console.log(this.merchant );
          //this.allItems = data.merchant;
          //this.totalCount = data.totalCount;
          //}
          
          //this.products = products.slice(0.8);
          //this.getTags(products)
          //this.getColors(products)
           }); 
          }
       
    }
  }

  calculateTotal() {
    if(this.merchant != null){
      
      if(this.isChecked == true && this.amount <= this.merchant.charge){
        this.shippingFee =  this.merchant.delivery_charges;
      }
      else{
        this.shippingFee = 0;
        
      }

      this.total = this.amount + this.shippingFee;
    }
  } 

  
  public getSubTotal(): Observable<number> {
    return this.cartService.getTotal();
    }  

  getAddressList(){
    this.accountService.getAddressList(this.user.id).subscribe(data =>
      {
        
          this.isAddressSelected =  data.addressList.length > 0 ? true : false;
          this.AddressList = data.addressList;
          this.shopList = data.addressList;
          this.customerAddress = this.AddressList[0];
      });
  }
  public selectAddress(address:CustomerAddress){
      this.customerAddress= address;
      console.log(this.customerAddress);
  }



    public submitOrder(){
      var selectedPaymentOptions = this.paymentOptions.filter(x => x.checked === true).map(x => x.name);
      if(selectedPaymentOptions.length > 0){
        if(this.isChecked === false || (this.isChecked === true && this.isAddressSelected === true)){
        var spinnerRef = this.spinnerService.start(); 
        let address:string='';
        let shipping:string='';
        let total:number=0;
        this.cartService.getTotal().subscribe( data => total=data);

        if(this.isChecked){
          address = this.customerAddress.address_line_1 + ' ' + this.customerAddress.address_line_2 + ' ' + this.customerAddress.location_details;
          shipping = 'Home Delivery';          
        }
        
        
        let productOrder:ProductOrder = {
          id:0,
          address: shipping == 'Home Delivery' ? address : '',
          lat:  shipping == 'Home Delivery' ? this.customerAddress.lat: 0,
          lng:  shipping == 'Home Delivery' ? this.customerAddress.lng: 0,
          contact_name:  shipping == 'Home Delivery' ? this.customerAddress.contact_name: '',    
          contact_no:  shipping == 'Home Delivery' ? this.customerAddress.contact_no: '',         
          buyer:this.user.username,     
          phone:this.user.mobileno,     
          email:this.user.email,
          code:'',
          comment:'',
          created_at:0,
          cust_id:this.user.id,
          date_ship:0,
          last_update:0,
          shipping:shipping,
          payment_method:selectedPaymentOptions,
          status:'Confirm',
          tax:0,
          shipping_charge:this.shippingFee,
          total_fees:total,   
          product_order_detail:[],

        }

        this.buyProducts.forEach(item => {
          let productOrderDetail:ProductOrderDetail={
            id:0,
            order_id:0,
            product_id:item.product.id,
            product_name:item.product.name,
            amount:item.quantity,
            created_at:0,
            last_update:0,
            merchant_id:item.product.mid == undefined? item.product.merchant_id:item.product.mid,
            price_item:item.product.price * item.quantity,
            total:item.total
          };
          productOrder.product_order_detail.push(productOrderDetail);
        });
        
        // let orderRequest:OrderRequest={
        //   product_order:productOrder
        // }

        this.orderService.submitOrder(productOrder).subscribe(
          data => {
            console.log(data);
            if(data.status == "success"){
              this.sharedService.orderSuccessMessage = data.msg;
              var len = this.buyProducts.length;
              for(var i=0; i< len; i++){
                var item = this.buyProducts[0];
                this.cartService.removeFromCart(item);
                console.log(item);
              }
              // this.buyProducts.forEach(item => {
                    
              // });
              this.router.navigate(['/orders/order-success']);
              //this.snackBar.open(data.msg, '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
      
            }
            else{
              this.snackBar.open(data.msg, '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      
            }
            
            this.spinnerService.stop(spinnerRef);
          }
        );
        }
        else{
          this.snackBar.open("Please add address for Home delivery", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        
        }
      }
      else{
        this.snackBar.open("Select atleast one payment option", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
      
      }
    }

}
