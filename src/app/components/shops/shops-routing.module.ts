//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopsComponent } from './shops.component';

const routes: Routes = [
  {
    path: '', component: ShopsComponent, children: [
      // {
      //   path: 'details/:id', component: ShopDetailsComponent
      // }, 
      {
        path: 'details/:name', component: ShopDetailsComponent
      },
      { 
        path: 'list/:category', component: ShopListComponent 
      },
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      }
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
