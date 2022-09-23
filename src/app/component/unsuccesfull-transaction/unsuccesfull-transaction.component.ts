import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BUSINESS_DATA_KEY } from 'src/app/constant/constants';

@Component({
  selector: 'app-unsuccesfull-transaction',
  templateUrl: './unsuccesfull-transaction.component.html',
  styleUrls: ['./unsuccesfull-transaction.component.scss'],
})
export class UnsuccesfullTransactionComponent implements OnInit {
  businessData: any;
  constructor(private router: Router) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
      console.log('[sessionData]', sessionData);
  }

  ngOnInit(): void {}

  onRetryPayement() {
    this.router.navigate(['allow']);
  }
}
