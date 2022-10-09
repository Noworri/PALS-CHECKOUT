import { Component, OnInit } from '@angular/core';
import {
  COLLECTION_DATA_KEY,
  TRANSFER_DATA_KEY,
  BUSINESS_DATA_KEY,
} from 'src/app/constant/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-successful-collection',
  templateUrl: './successful-collection.component.html',
  styleUrls: ['./successful-collection.component.scss'],
})
export class SuccessfulCollectionComponent implements OnInit {
  businessTransactionData: any;
  collectionData: any;
  businessData: any;

  constructor(private location: Location) {
    const collection = sessionStorage.getItem(COLLECTION_DATA_KEY);
    this.collectionData =
      collection === null ? undefined : JSON.parse(collection);

    const transfer = sessionStorage.getItem(TRANSFER_DATA_KEY);
    this.businessTransactionData = transfer === null ? undefined : JSON.parse(transfer);
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
  }

  ngOnInit() {
    if (this.businessTransactionData.callback_url) {
      setTimeout(() => {
        window.location.href = this.businessTransactionData.callback_url;
      }, 5000);
    }
  }

  onRetryPayement() {
    this.location.back();
  }
}
