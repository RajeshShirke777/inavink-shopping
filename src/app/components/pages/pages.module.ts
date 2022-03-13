//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CancellationAndReturnsComponent} from './cancellation-and-returns/cancellation-and-returns.component'
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ShippingAndPaymentsComponent } from './shipping-and-payments/shipping-and-payments.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    PagesComponent,
    CancellationAndReturnsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    ShippingAndPaymentsComponent,
    TermsAndConditionsComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule, 
  ]
})
export class PagesModule { }
