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
  csvFile;
  error: string;

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
    this.merchantService.editMerchant(this.singleMerchant.id, this.merchantForm.value)
    .subscribe((res: any)=>{
      let index = this.merchants.findIndex(mer=> mer.id === this.singleMerchant.id)
      this.merchants[index].name = this.merchantForm.value.name;
      this.merchants[index].description = this.merchantForm.value.description;
      this.merchants[index].status = this.merchantForm.value.status;
      this.merchantForm.reset();
    },
    err=>{console.log(err)})
  }

  setMerchantForm(merchant){
    this.singleMerchant = merchant
    this.merchantForm.setValue({
      name: merchant.name,
      status: merchant.status,
      description: merchant.description
    })
  }

  onFileSelect(input: HTMLInputElement) {
    this.error = null;
    let files = input.files;
    if (files && files.length) {
      this.csvFile = files[0];
      this.addMerchants()
    }
  }

  addMerchants(){
    var formData = new FormData();
    formData.append('merchant[csv]', this.csvFile);
    this.merchantService.addMerchants(formData)
    .subscribe(
      response => {
        let msg = "CSV successfully uploaded! We're processing the upload and will take few minutes";
      },
      error => { this.error = "An error occurred while uploading the file. Please try again after some time.";
      }
    );
  }
}
