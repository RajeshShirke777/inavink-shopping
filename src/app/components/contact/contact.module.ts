//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule, 
  ]
})
export class ContactModule { }
