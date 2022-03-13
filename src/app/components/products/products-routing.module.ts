//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      {
        path: 'details/:id', component: ProductDetailsComponent
      },
      { 
        path: 'latest', component: ProductHomeComponent 
      },
      { 
        path: 'featured', component: ProductHomeComponent 
      },
      {
        path: '', component: ProductListComponent
      }
      // {
      //   path: 'list/:category', component: ProductListComponent
      // },
      // {
      //   path: '', redirectTo: 'home', pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
