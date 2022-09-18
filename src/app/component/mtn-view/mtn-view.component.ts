import { Component, OnInit } from '@angular/core';
import { BUSINESS_DATA_KEY, CollectionData, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';

@Component({
  selector: 'app-mtn-view',
  templateUrl: './mtn-view.component.html',
  styleUrls: ['./mtn-view.component.scss']
})
export class MtnViewComponent implements OnInit {
  businessData: any;
  businessTransactionData: any;
  collectionData: CollectionData;

  constructor() { 
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === 'NULL' ? undefined : JSON.parse(sessionData);
    const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
    this.businessTransactionData =
      transferData === 'NULL' ? undefined : JSON.parse(transferData);
      const collectionData = sessionStorage.getItem(COLLECTION_DATA_KEY);
      this.collectionData =
        collectionData === 'NULL' ? undefined : JSON.parse(collectionData);
  }

  ngOnInit(): void {
  }

}
