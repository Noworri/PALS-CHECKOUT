import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BUSINESS_DATA_KEY, COLLECTION_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';

@Component({
  selector: 'app-allow-cash-out',
  templateUrl: './allow-cash-out.component.html',
  styleUrls: ['./allow-cash-out.component.scss'],
})
export class AllowCashOutComponent implements OnInit {
  setDisplayLoader = false;
  setDisplayText = true;
  businessData: any;
  businessTransactionData: any;
  collectionData: any;

  constructor(private router: Router) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
      console.log('[sessionData]', sessionData);
      const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
      this.businessTransactionData =
        transferData === null ? undefined : JSON.parse(transferData);
        const collectionData = sessionStorage.getItem(COLLECTION_DATA_KEY);
        this.collectionData =
          collectionData === null ? undefined : JSON.parse(collectionData);
  }

  ngOnInit(): void {}

  onAllowCashout() {
    this.setDisplayLoader = true;
    this.setDisplayText = false;
    setTimeout(() => {
      this.router.navigate(['transaction-succesful']);
    }, 3000);
  }
}
