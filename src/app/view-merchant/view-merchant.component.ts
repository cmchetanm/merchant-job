import { Component, OnInit } from '@angular/core';
import { MerchantsService } from '../services/merchants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.scss']
})
export class ViewMerchantComponent implements OnInit {

  merchant: any[] = []
  id: string;
	
	constructor(
	  private activatedRoute: ActivatedRoute,
		private merchantService: MerchantsService
	) { }

  ngOnInit() {
  	this.id = this.activatedRoute.snapshot.params.id
  	this.getMerchant();
  }

  getMerchant(){
  	this.merchantService.getMerchant(this.id)
  	.subscribe((res: any)=>{
  		this.merchant = res.data.merchant
  	},
  	err=>{console.log(err)})
  }

}
