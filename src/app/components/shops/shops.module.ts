//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { SharedModule } from '../shared/shared.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

@NgModule({
  declarations: [
    ShopListComponent,
    ShopDetailsComponent,
    ShopsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    ShopsRoutingModule, 
  ]
})
export class ShopsModule { }
