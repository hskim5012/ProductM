import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient){
    this.getProducts();
    //this.getProducts('5be4be90cc9ac666a2119fb4');
  }
  getProducts() {
    return this._http.get('/API/products');
  }
  getProduct(id: string) {
    return this._http.get(`/API/products/${id}`);
  }
  postProduct(Product: {title: string, price: number, qty: number}) {
    return this._http.post(`/API/products`, Product);
  }
  updateProduct(Product: {title: string, price: number, qty: number, _id: string}) {
    return this._http.put(`/API/products/${Product['_id']}`, Product)
  }
  deleteProduct(id: string) {
    return this._http.delete(`/API/products/${id}`);
  }
}
