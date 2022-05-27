import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://dummyjson.com/products";

  constructor(
    private http:HttpClient
  ) { }

  getProduct(){
    return this.http.get<DataProduct>(this.apiUrl).pipe(
      catchError((error) => throwError(error))
    );
  }
}
