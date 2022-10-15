import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  BUSINESS_DATA_KEY,
  COLLECTION_DATA_KEY,
  TRANSFER_DATA_KEY,
} from 'src/app/constant/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-payment-made-button',
  templateUrl: './payment-made-button.component.html',
  styleUrls: ['./payment-made-button.component.scss'],
})
export class PaymentMadeButtonComponent implements OnInit, OnDestroy {
  unsubscribeAll = new Subject();
  count = 0;
  maxCount = 20;

  collectionData: any;
  transferData: any;
  isVerifying = false;
  businessData: any;
  credentials: string;
  constructor(private service: BusinessService, private router: Router) {
    const collection = sessionStorage.getItem(COLLECTION_DATA_KEY);
    this.collectionData =
      collection === null ? undefined : JSON.parse(collection);

    const transfer = sessionStorage.getItem(TRANSFER_DATA_KEY);
    this.transferData = transfer === null ? undefined : JSON.parse(transfer);
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
  }

  ngOnInit() {
    if (this.businessData) {
      this.credentials = `${this.businessData.api_secret_key_live}:${this.businessData.api_public_key_live}`;
      // this.getModulesData(this.credentials);
    }
    this.verifyCollection();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }

  verifyCollection() {
    this.isVerifying = true;
    this.service
      .verifyCollectionStatus(this.collectionData, this.credentials)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          if (response && response['status'] === true) {
            this.router.navigate(['/successful'])
            // if (!this.businessTransactionData.callback_url) {
            //   this.router.navigate(['/successful'])
            // } else {
            //   window.location.href = this.businessTransactionData.callback_url;
            // }
          } else {
            if(this.count < this.maxCount) {
              this.count++;
              setTimeout(() => {
                this.verifyCollection();
              }, 5000)
            } else {
              this.router.navigate(['/unsuccessfull']);
            }
           
          }
        },
        (error) => {
          this.router.navigate(['/unsuccesfull']);
        }
      );
  }

}
