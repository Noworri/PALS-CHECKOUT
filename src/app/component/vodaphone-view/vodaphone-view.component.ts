import { Component, OnInit } from '@angular/core';
import { BUSINESS_DATA_KEY, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';

@Component({
  selector: 'app-vodaphone-view',
  templateUrl: './vodaphone-view.component.html',
  styleUrls: ['./vodaphone-view.component.scss']
})
export class VodaphoneViewComponent implements OnInit {
  businessData: any;
  businessTransactionData: any;
  collectionData: any;
  copyText: string = 'Copy';

  constructor() {  const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
      const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
      this.businessTransactionData =
        transferData === null ? undefined : JSON.parse(transferData);
        const collectionData = sessionStorage.getItem(COLLECTION_DATA_KEY);
        this.collectionData =
          collectionData === null ? undefined : JSON.parse(collectionData);
    }

  ngOnInit(): void {
  }
  copyInputMessage(val) {
    this.copyText = "Copied!";
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
