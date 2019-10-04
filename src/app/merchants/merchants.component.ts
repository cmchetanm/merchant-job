import { Component, OnInit } from '@angular/core';
import { MerchantsService } from '../services/merchants.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantsService
  ) { }

  merchantForm: FormGroup;
  merchants: any[] = []
  singleMerchant: any = {}


  ngOnInit() {
    this.getAllMerchants();
    this.merchantForm = this.fb.group({
      'name': [null],
      'description': [null],
      'status': [null]
    });
  }

  getAllMerchants(){
    this.merchantService.getAllMerchants()
    .subscribe(
      (res: any)=>{
        this.merchants = res.data.merchant
      },
      err=>{console.log(err)}
    )
  }

  deleteMerchant(){
    this.merchantService.deleteMerchant(this.singleMerchant.id)
    .subscribe((res: any)=>{
      this.merchants =this.merchants.filter(mer=>mer.id !== this.singleMerchant.id)
    },
    err=>{console.log(err)})
  }

  editMerchant(){
    this.merchantService.getAllMerchants()
    .subscribe((res: any)=>{
      console.log(res)
    },
    err=>{console.log(err)})
  }

}
