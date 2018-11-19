import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Object>;
  product: Object;
  updateProduct: {title: string, price: number, qty: number, _id: string};

  constructor(private _httpService: HttpService) {}
  ngOnInit(){
    this.updateProduct = { title: "", price: 0, qty: 0, _id: ''}
    this.products = [];
    this.getProductsFromService();
    //this.hideproducts();
    //this.getproductFromService();
  }
  getProductsFromService(){
    let observable = this._httpService.getProducts();
    observable.subscribe(data => {
      console.log("Got our products!", data);
      this.products = data['data'];
    });
  }
  destroyProduct(product) {
    let observable = this._httpService.deleteProduct(product._id);
    observable.subscribe(() => {
      console.log('product destroyed! ' + product._id);
      this.getProductsFromService();
    })
  }

}
