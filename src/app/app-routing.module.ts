import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantsComponent } from './merchants/merchants.component';
import { ViewMerchantComponent } from './view-merchant/view-merchant.component';

const routes: Routes = [
  {path: '', component: MerchantsComponent },
  {path: 'merchant/:id', component: ViewMerchantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
