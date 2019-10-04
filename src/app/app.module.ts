import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { MerchantsService } from './services/merchants.service';
import { ViewMerchantComponent } from './view-merchant/view-merchant.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    MerchantsComponent,
    ViewMerchantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MerchantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
