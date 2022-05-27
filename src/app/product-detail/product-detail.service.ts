import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataProductDetail } from './product-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  apiUrl = "https://dummyjson.com/products";

  constructor(
    private http: HttpClient
  ) { }

  getProductDetail() {
    return this.http.get<DataProductDetail>(this.apiUrl).pipe(
      catchError((error) => throwError(error))
    );
  }
}
