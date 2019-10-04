import { Component, OnInit } from '@angular/core';
import { MerchantsService } from '../services/merchants.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.scss']
})
export class ViewMerchantComponent implements OnInit {

  merchant: any = {};
  id: string;
  paymentForm: FormGroup;
	
	constructor(
	  private activatedRoute: ActivatedRoute,
		private merchantService: MerchantsService,
    private fb: FormBuilder
	) { }

  ngOnInit() {
  	this.id = this.activatedRoute.snapshot.params.id
  	this.getMerchant();
  	this.paymentForm = this.fb.group({
      'amount': [null, Validators.required],
      'status': ['processed']
    });
  }

  getMerchant(){
  	this.merchantService.getMerchant(this.id)
  	.subscribe((res: any)=>{
  		this.merchant = res.data.merchant
  	},
  	err=>{console.log(err)})
  }

  addPayment(){
  	this.merchantService.addPayment(this.id, this.paymentForm.value)
  	.subscribe((res: any)=>{
  		this.merchant.transactions = [res.data.transaction, ...this.merchant.transactions]
  	},
  	err=>{console.log(err)})
  }
}
