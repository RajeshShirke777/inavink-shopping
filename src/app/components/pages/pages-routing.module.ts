//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CancellationAndReturnsComponent} from './cancellation-and-returns/cancellation-and-returns.component'
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ShippingAndPaymentsComponent } from './shipping-and-payments/shipping-and-payments.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: 'cancellation-and-returns', component: CancellationAndReturnsComponent
      },
      {
        path: 'faq', component: FaqComponent
      },
      {
        path: 'privacy-policy', component: PrivacyPolicyComponent
      },
      {
        path: 'shipping-and-payments', component: ShippingAndPaymentsComponent
      },
      {
        path: 'terms-and-conditions', component: TermsAndConditionsComponent
      },
      {
        path: 'error-page', component: ErrorPageComponent
      },
      {
        path: '', redirectTo: 'faq', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
