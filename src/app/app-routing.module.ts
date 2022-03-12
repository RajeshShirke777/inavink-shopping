import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//import { ProductDetailsComponent } from './components/product-details/product-details.component';
//import { ProductHomeComponent } from './components/products/product-home/product-home.component';
//import { ProductListComponent } from './components/products/product-list/product-list.component';
//import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
//import { ShopListComponent } from './components/shops/shop-list/shop-list.component';
//import { AboutUsComponent } from './components/about-us/about-us.component';
//import { CheckoutComponent } from './components/checkout/checkout.component';
//import { CartComponent } from './components/cart/cart.component';
//import { ChangePasswordComponent } from './components/change-password/change-password.component';
//import { ContactComponent } from './components/contact/contact.component';
//import { FaqComponent } from './components/faq/faq.component';
//import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
//import { LoginComponent } from './components/login/login.component';
//import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
//import { OrderSuccessComponent } from './components/order-success/order-success.component';
//import { ManageAddressComponent } from './components/profile/manage-address/manage-address.component';
//import { SingUpComponent } from './components/signup/signup.component';
//import { OrderDetailsComponent } from './components/order-details/order-details.component';
//import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
//import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
//import { ShippingAndPaymentsComponent } from './components/pages/shipping-and-payments/shipping-and-payments.component';
//import { CancellationAndReturnsComponent } from './components/cancellation-and-returns/cancellation-and-returns.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  { path: 'accounts', loadChildren: () => import(`./components/accounts/accounts.module`).then(m => m.AccountsModule) },
  { path: 'cart', loadChildren: () => import(`./components/cart/cart.module`).then(m => m.CartModule)  },
  { path: 'checkout', loadChildren: () => import(`./components/checkout/checkout.module`).then(m => m.CheckoutModule)  },
  { path: 'pages', loadChildren: () => import(`./components/pages/pages.module`).then(m => m.PagesModule)  },
  { path: 'about', loadChildren: () => import(`./components/about-us/about-us.module`).then(m => m.AboutUsModule)  },
  { path: 'contact', loadChildren: () => import(`./components/contact/contact.module`).then(m => m.ContactModule)  },
  { path: 'products', loadChildren: () => import(`./components/products/products.module`).then(m => m.ProductsModule)  },
  { path: 'shops', loadChildren: () => import(`./components/shops/shops.module`).then(m => m.ShopsModule)  },
  { path: 'orders', loadChildren: () => import(`./components/orders/orders.module`).then(m => m.OrdersModule)  },
  { path: 'profile', loadChildren: () => import(`./components/profile/profile.module`).then(m => m.ProfileModule)  },
  //{ path: '**', redirectTo: 'pages/error-page' }
  
  //{ path: 'featured-products', component: ProductHomeComponent },
  //{ path: 'nearby-stores', component: ShopListComponent },
  //{ path: 'latest-products', component: ProductHomeComponent },  

  //{ path: 'products/:category', component: ProductListComponent },
  //{ path: 'shops/:category', component: ShopListComponent },


  //{ path: 'product/:id', component: ProductDetailsComponent },
  //{ path: 'shop/:id', component: ShopDetailsComponent },
  //{ path: 'login', component: LoginComponent },
 // { path: 'signup', component: SingUpComponent },
  //{ path: 'forgotpassword', component: ForgotPasswordComponent },
  //{ path: 'manage-address', component: ManageAddressComponent },
  //{ path: 'myorders', component: MyOrdersComponent },
  //{ path: 'myorders/:id', component: OrderDetailsComponent },
  //{ path: 'about', component: AboutUsComponent },
  //{ path: 'checkout', component: CheckoutComponent },
  // { path: 'faq', component: FaqComponent },
  // //{ path: 'contact', component: ContactComponent },
  // { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  // { path: 'privacy-policy', component: PrivacyPolicyComponent },
  // { path: 'shipping-and-payments', component: ShippingAndPaymentsComponent },
  // { path: 'cancellation-and-returns', component: CancellationAndReturnsComponent },
  // { path: 'wishlist', component: WishlistComponent },
  // { path: 'compare', component: CompareComponent },
  // { path: 'my-account', component: MyAccountComponent },
  // { path: 'error', component: ErrorPageComponent },
  // { path: 'testimonials', component: ReviewsComponent },
  //{ path: 'order-success', component: OrderSuccessComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled' 
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
