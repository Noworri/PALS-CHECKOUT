import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BUSINESS_DATA_KEY, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unsuccesfull-transaction',
  templateUrl: './unsuccesfull-transaction.component.html',
  styleUrls: ['./unsuccesfull-transaction.component.scss'],
})
export class UnsuccesfullTransactionComponent implements OnInit {
  businessData: any;
  businessTransactionData: any;
  collectionData: any;
  constructor(private router: Router, private location: Location) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
    const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
    this.businessTransactionData =
      transferData === null ? undefined : JSON.parse(transferData);
      const collectionData = sessionStorage.getItem(COLLECTION_DATA_KEY);
      this.collectionData =
        collectionData === null ? undefined : JSON.parse(collectionData);
  }

  ngOnInit(): void {}

  onRetryPayement() {
    this.location.back();
  }
}
