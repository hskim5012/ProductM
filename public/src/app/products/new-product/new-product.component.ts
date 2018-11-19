import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  newProduct: {title: string, price: number, qty: number};
  errors: string[];

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newProduct = { title: "", price: 0, qty: 0}
    this.errors = [];
  }


  postNewProduct() {
    console.log('got here');
    let observable = this._httpService.postProduct(this.newProduct);
    observable.subscribe((data) => {
      console.log('product submitted! ' + this.newProduct);
      if (data['err']) {
        this.errors = data['err'];

      } else {
        this.newProduct = {title: '', price: 0, qty: 0};
        this._router.navigate(['products']);
      }
    });
  }
}
