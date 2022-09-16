import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BUSINESS_DATA_KEY, TRANSFER_DATA_KEY } from 'src/app/constant/constants';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-proceed-cash-out',
  templateUrl: './proceed-cash-out.component.html',
  styleUrls: ['./proceed-cash-out.component.scss'],
})

export class ProceedCashOutComponent implements OnInit {
  unsubscribe$ = new Subject();
  form: FormGroup;
  checkoutItemsData: any;
  user_api_key: string;
  cancelUrl: string;
  businessTransactionData: {
    user_id: string;
    amount: number;
    currency: string;
    callback_url: string;
    cancel_url: string;
    order_id: string;
    apiKey: string;
  };
  isValidInputType: boolean;
  businessData: any;
  businessLogo: string;
  constructor(
    private router: Router,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem(TRANSFER_DATA_KEY);
    this.getUrlParams(window.location.href);
  }

  isValidePhoneInput(phoneNumber: string) {
    if (phoneNumber === undefined) {
      return (this.isValidInputType = false);
    } else {
      const regEx = /^\d*\d*$/;
      if (phoneNumber?.match(regEx)) {
        return (this.isValidInputType = true);
      } else {
        return (this.isValidInputType = false);
      }
    }
  }

  // onProceed(form: NgForm) {
  //   const telInputPlaceholderInputValue = document
  //     .getElementsByTagName('input')[0]
  //     .getAttribute('placeholder');
  //   const intelInputId = document
  //     .getElementsByTagName('input')[0]
  //     .getAttribute('data-intl-tel-input-id');
  //   if (telInputPlaceholderInputValue === '023 123 4567') {
  //     this.prefixCountryCode = '+233';
  //   } else if (telInputPlaceholderInputValue === '0802 123 4567') {
  //     this.prefixCountryCode = '+234';
  //   } else if (intelInputId === '2') {
  //     this.prefixCountryCode = '+225';
  //   }
  //   this.isValidePhoneInput(form.value['userPhone']?.trim());
  //   if (this.isValidInputType === true) {
  //     this.user_phone = `${this.prefixCountryCode}${form.value['userPhone']}`;
  //     const userData = {
  //       mobile_phone: this.user_phone,
  //     };
  //     this.loader.start();
  //     this.paymentService
  //       .sendVerificationCode(userData, `${this.user_api_key}`)
  //       .pipe(takeUntil(this.unsubscribe$))
  //       .subscribe((response: any) => {
  //         this.loader.stop();
  //         if (response?.status === 'success') {
  //           this.userData = response['data'];
  //           const transactionData = { ...this.businessTransactionData };
  //           transactionData.initiator_id = response['data'].user_uid;
  //           const transactionDetails = JSON.stringify(transactionData);
  //           sessionStorage.setItem(TRANSACTION_DATA_KEY, transactionDetails);
  //           const data = JSON.stringify(response['data']);
  //           sessionStorage.setItem(USER_DATA_KEY, data);
  //           this.router.navigate(['/phone-verfication']);
  //         } else {
  //           this.loader.stop();
  //           this.hasError = true;
  //           this.errorMessage = response['message'];
  //           sessionStorage.setItem(USER_DATA_KEY, `${this.user_phone}`);
  //           setTimeout(() => {
  //             this.router.navigate(['/download-app']);
  //           }, 3000);
  //         }
  //       });
  //   } else {
  //     this.hasError = true;
  //     this.errorMessage = 'Invalid Phone number';
  //   }
  // }

  getBusinessData() {
    this.businessService
      .getBusinessDetails(
        this.businessTransactionData?.user_id)
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
    const params = new URL(url).searchParams;
    const items = params.get('items');
    this.checkoutItemsData = JSON.parse(`${items}`);
    this.user_api_key = params.get('credentials') as string;
    this.cancelUrl = params.get('cancel_url') as string;
    this.businessTransactionData = {
      user_id: params.get('user_id') as string,
      apiKey: params.get('user_id') as string,
      currency: params.get('currency') as string,
      amount: +params.get('amount'),
      callback_url: params.get('callback_url') as string,
      cancel_url: params.get('cancel_url') as string,
      order_id: params.get('order_id') as string,
    };
    sessionStorage.setItem(TRANSFER_DATA_KEY, JSON.stringify(this.businessTransactionData));
    this.getBusinessData();
  }

  onProceedCashOut() {
    this.router.navigate(['allow']);
  }
}
