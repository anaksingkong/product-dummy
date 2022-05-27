import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataProduct } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<void>();

  dataProduct!: DataProduct;
  fetchData: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (result: DataProduct) => {
        console.log(result);
        this.dataProduct = result;
        this.fetchData = true;
      },
      (error) => {
        console.log(error);
        this.fetchData = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
