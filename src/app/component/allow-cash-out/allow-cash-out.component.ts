import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BUSINESS_DATA_KEY, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-allow-cash-out',
  templateUrl: './allow-cash-out.component.html',
  styleUrls: ['./allow-cash-out.component.scss'],
})
export class AllowCashOutComponent implements OnInit, OnDestroy {
  setDisplayLoader = false;
  setDisplayText = true;

  isVerifiying = false;
  businessData: any;
  businessTransactionData: any;
  collectionData: any;
  credentials: string;
  unsubscribeAll = new Subject();
  count = 0;
  maxCount = 20;

  constructor(private service: BusinessService, private router: Router) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
      const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
      this.businessTransactionData =
        transferData === null ? undefined : JSON.parse(transferData);
        const collectionData = sessionStorage.getItem(COLLECTION_DATA_KEY);
        this.collectionData =
          collectionData === null ? undefined : JSON.parse(collectionData);

          if (this.businessData) {
            this.credentials = `${this.businessData.api_secret_key_live}:${this.businessData.api_public_key_live}`;
            // this.getModulesData(this.credentials);
          }
        
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  onAllowCashout() {
    this.setDisplayLoader = true;
    this.setDisplayText = false;
    setTimeout(() => {
      this.router.navigate(['transaction-succesful']);
    }, 3000);
  }

  createCollection() {
    this.isVerifiying = true;
    this.service
      .createCollection(this.collectionData, this.credentials)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          if (response && response['status'] === true) {
            this.verifyCollection();
          }
        },
        (error) => {
          this.router.navigate(['/unsuccesfull']);
        }
      );
  }

  verifyCollection() {
    this.isVerifiying = true;
    this.service
      .verifyCollectionStatus(this.collectionData, this.credentials)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          if (response && response['status'] === true) {
            const collection = {...this.collectionData, reference: response['reference']};
            sessionStorage.setItem(COLLECTION_DATA_KEY, JSON.stringify(collection));
            this.router.navigate(['/mtn']);
            // if (!this.businessTransactionData.callback_url) {
            //   this.router.navigate(['/successful'])
            // } else {
            //   window.location.href = this.businessTransactionData.callback_url;
            // }
          } else {
            if(response['error']) {
              this.router.navigate(['/unsuccessfull']);
            } else if(this.count < this.maxCount) {
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
