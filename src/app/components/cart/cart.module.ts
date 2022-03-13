//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    CartRoutingModule, 
  ]
})
export class CartModule { }
