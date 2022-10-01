import { Component, OnInit } from '@angular/core';
import {
  COLLECTION_DATA_KEY,
  TRANSFER_DATA_KEY,
  BUSINESS_DATA_KEY,
} from 'src/app/constant/constants';

@Component({
  selector: 'app-successful-collection',
  templateUrl: './successful-collection.component.html',
  styleUrls: ['./successful-collection.component.scss'],
})
export class SuccessfulCollectionComponent implements OnInit {
  transferData: any;
  collectionData: any;
  businessData: any;

  constructor() {
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
    if (this.transferData.callback_url) {
      setTimeout(() => {
        window.location.href = this.transferData.callback_url;
      }, 5000);
    }
  }
}
