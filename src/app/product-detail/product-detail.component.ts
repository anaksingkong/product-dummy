import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataProductDetail } from './product-detail.model';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<void>();

  dataProductDetail!: DataProductDetail;
  fetchData: boolean = false;

  constructor(
    private productDetailService: ProductDetailService
  ) { }

  ngOnInit(): void {
    this.productDetailService.getProductDetail().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (result: DataProductDetail) => {
        // console.log(result);
        this.dataProductDetail = result;
        this.fetchData = true;
      }, (error) => {
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
