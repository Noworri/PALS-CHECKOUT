import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  TRANSFER_DATA_KEY,
  BUSINESS_DATA_KEY,
  BusinessTransactionData,
} from 'src/app/constant/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isValidInputType: boolean;
  unsubscribe$ = new Subject();
  checkoutItemsData: any;
  user_api_key: string;
  cancelUrl: string;
  businessTransactionData: BusinessTransactionData;
  businessData: any;
  businessLogo: string;
  loadedBusinessData: any;
  constructor(
    private router: Router,
    private businessService: BusinessService,
    private route: ActivatedRoute
  ) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    console.log('[sessionData]', sessionData);
    this.loadedBusinessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
  }

  ngOnInit(): void {
    console.log('[this.loadedBusinessData]', this.loadedBusinessData);
    if (!this.loadedBusinessData) {
      this.getUrlParams(window.location.href);
    } else {
      this.businessData = this.loadedBusinessData;
    }
  }

  getBusinessData() {
    this.businessService
      .getBusinessDetails(this.businessTransactionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((businessData) => {
        this.businessData = businessData;
        this.businessLogo =
          this.businessData.business_logo === null
            ? 'assets/checkout/profilPhotoAnimation.gif'
            : `https://noworri.com/api/public/uploads/company/business/${this.businessData.business_logo}`;

        sessionStorage.setItem(
          BUSINESS_DATA_KEY,
          JSON.stringify(this.businessData)
        );
      });
  }

  getUrlParams(url: string) {
    console.log('[url]', url);
    const params = new URL(url).searchParams;
    this.route.queryParams.subscribe((params) => {
      this.user_api_key = params['credentials'];
      this.cancelUrl = params['cancel_url'];
      this.businessTransactionData = {
        user_id: params['user_id'],
        apiKey: this.user_api_key,
        currency: params['currency'],
        amount: +params['amount'],
        callback_url: params['callback_url'],
        cancel_url: params['cancel_url'],
        order_id: params['order_id'],
        country: params['country'],
      };
    });
    console.log('[this.businessTransactionData]', this.businessTransactionData);
    sessionStorage.setItem(
      TRANSFER_DATA_KEY,
      JSON.stringify(this.businessTransactionData)
    );
    this.getBusinessData();
  }
}
