import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product: any;
  errors: object[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.product = {title: '', price: 0, qty: 0}
    this.errors = [];
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getProductFromService(params['id']);
    })
  }
  updateCurrentProduct() {
    let observable = this._httpService.updateProduct(this.product);
    observable.subscribe((data) => {
      console.log('product updated! ' + this.product);
      if (data['err']) {
        this._router.navigate(["/edit", this.product._id]);

      } else {
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
    })
  }
}
