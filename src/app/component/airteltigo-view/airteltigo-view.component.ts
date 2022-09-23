import { Component, OnInit } from '@angular/core';
import { BUSINESS_DATA_KEY, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';

@Component({
  selector: 'app-airteltigo-view',
  templateUrl: './airteltigo-view.component.html',
  styleUrls: ['./airteltigo-view.component.scss']
})
export class AirteltigoViewComponent implements OnInit {
  businessData: any;
  businessTransactionData: any;
  collectionData: any;

  constructor() {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
      console.log('[sessionData]', sessionData);
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
