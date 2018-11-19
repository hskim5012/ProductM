import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  originalProduct: any;
  product: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }


  ngOnInit() {
    this.product = {title: '', price: 0, qty: 0,}
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getProductFromService(params['id']);
    })
  }

  updateCurrentProduct() {
    console.log('get here');
    console.log(this.product);
    let observable = this._httpService.updateProduct(this.product);
    observable.subscribe((data) => {
      if (data['err']) {

      } else {
        console.log('product updated! ' + this.product);
        this.product = {title: '', price: 0, qty: 0, _id: ""};
        this._router.navigate(['products']);
      }
    });
  }

  destroyProduct(product) {
    let observable = this._httpService.deleteProduct(product._id);
    observable.subscribe(() => {
      console.log('product destroyed! ' + product._id);
    });
    this._router.navigate(['products']);
  }

  getProductFromService(id) {
    let observable = this._httpService.getProduct(id);
    observable.subscribe(data => {
      this.product = data['data'];
      this.originalProduct = {title: this.product.title, price: this.product.price, qty: this.product.qty}
      console.log(this.product);
    })
  }

  resetForm() {
    // console.log('product: ' + this.product.title);
    // console.log('originalProduct: ' + this.originalProduct.title);
    this.product = {title: this.originalProduct.title, price: this.originalProduct.price, qty: this.originalProduct.qty, _id: this.product._id};
    console.log(this.product);
  }
}
