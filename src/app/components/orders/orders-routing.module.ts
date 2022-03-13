//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


const routes: Routes = [
  {
    path: '', component: OrdersComponent, children: [
      {
        path: 'order-success', component: OrderSuccessComponent
      },
      {
        path: 'myorders', component: MyOrdersComponent
      },
      {
        path: 'orderdetails/:id', component: OrderDetailsComponent
      },
      {
        path: '', redirectTo: 'my-orders', pathMatch: 'full'
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
