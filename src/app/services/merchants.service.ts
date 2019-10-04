import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  httpUploadOptions = {
  headers: new HttpHeaders({ "Accept": "application/json" })
}

  constructor(
    private http: HttpClient) { 
  }

  getAllMerchants(){
    return this.http.get(environment.baseUrl + '/merchants')
  }

  getMerchant(id){
    return this.http.get(environment.baseUrl + `/merchants/${id}`)
  }

  deleteMerchant(id){
    return this.http.delete(environment.baseUrl + `/merchants/${id}`, this.httpOptions)
  }

  editMerchant(id, merchant){
    return this.http.patch(environment.baseUrl + `/merchants/${id}`, {merchant}, this.httpOptions)
  }

  addMerchants(data){
    return this.http.post(environment.baseUrl + `/merchants/upload_users`, data, this.httpUploadOptions)
  }

  addPayment(id, data){
    return this.http.post(environment.baseUrl + `/merchants/${id}/transactions`, data, this.httpOptions)
  }
}
