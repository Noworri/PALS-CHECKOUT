import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import {
  BusinessTransactionData,
  BUSINESS_DATA_KEY,
  CollectionData,
  COLLECTION_DATA_KEY,
  COUNTRY_DATA,
  TRANSFER_DATA_KEY,
} from 'src/app/constant/constants';
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
  businessTransactionData: BusinessTransactionData;
  isValidInputType: boolean;
  businessData: any;
  businessLogo: string;
  phoneNumberValidationPattern = /^\d*\d*$/;
  networkProviders: any[];
  maxLength: number;
  placeHolder: string;
  module_id: number;
  countryData = COUNTRY_DATA;
  moduleData: any;
  credentials: string;
  collectionData: CollectionData;
  loadedBusinessData: BusinessTransactionData;

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    const sessionData = sessionStorage.getItem(BUSINESS_DATA_KEY);
    this.businessData =
      sessionData === null ? undefined : JSON.parse(sessionData);
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.getUrlParams(window.location.href);

    // if (!this.loadedBusinessData) {
    //   this.getUrlParams(window.location.href);
    // } else {
    //   this.businessData = this.loadedBusinessData;
    // }
    const transferData = sessionStorage.getItem(TRANSFER_DATA_KEY);
    this.businessTransactionData =
      transferData === null ? undefined : JSON.parse(transferData);
    this.networkProviders = this.countryData['GH'].operators;

    if (this.businessData) {
      this.credentials = `${this.businessData.api_secret_key_live}:${this.businessData.api_public_key_live}`;
      // this.getModulesData(this.credentials);
    }

    this.form = this.formBuilder.group({
      operator: [''],
      phone_no: [
        '',
        [
          Validators.pattern(this.phoneNumberValidationPattern),
          Validators.required,
        ],
      ],
    });

    if (this.businessTransactionData?.country) {
      this.setForm(this.businessTransactionData?.country);
    }
  }

  getSplitedAmount(num) {
    if (Number.isInteger(num)) {
      return [num, Number('00')];
    }

    const decimalStr = num.toString().split('.')[1];
    const intStr = num.toString().split('.')[0];
    return [Number(intStr), parseFloat(Number(decimalStr).toFixed(2))];
  }

  getModulesData(credentials) {
    this.businessService
      .getModulesData(credentials)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.moduleData = data;
          this.networkProviders = this.moduleData.map(
            (data: any) => data.operator
          );
        },
        error: (error) => {},
      });
  }

  getNetworkProviders(value) {
    return this.countryData[value]?.operators;
  }

  setForm(country) {
    this.maxLength = this.getMaxLength(country);
    this.placeHolder = country.value === 'BJ' ? '96040522' : '0544990518';
    // this.transferForm.get("phone_no")?.setValue(this.dailingCode);

    if (country === 'BJ') {
      this.networkProviders = this.networkProviders.filter(
        (provider) => provider !== 'vodafone' && provider !== 'airtel-tigo'
      );
    }
    if (country === 'GH') {
      this.form.get('operator').setValue('mtn');
    }
  }

  getMaxLength(country) {
    if (country === 'BJ') {
      return 8;
    } else {
      return 10;
    }
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
      .getBusinessDetails(this.businessTransactionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((businessData) => {
        this.businessData = businessData;
        this.businessLogo =
          this.businessData?.business_logo === null
            ? 'assets/checkout/profilPhotoAnimation.gif'
            : `https://noworri.com/api/public/uploads/company/business/${this.businessData?.business_logo}`;

        sessionStorage.setItem(
          BUSINESS_DATA_KEY,
          JSON.stringify(this.businessData)
        );
      });
  }

  getUrlParams(url: string) {
    const params = new URL(url).searchParams;
    this.route.queryParams.subscribe((params) => {
      this.user_api_key = params['credentials'];
      this.cancelUrl = params['cancel_url'];
      this.businessTransactionData = {
        user_id: params['user_id'],
        apiKey: this.user_api_key,
        currency: params['currency'],
        amount: +params['amount'],
        splitedAmount: this.getSplitedAmount(+params['amount']),
        callback_url: params['callback_url'],
        cancel_url: params['cancel_url'],
        order_id: params['order_id'],
        country: params['country'],
      };
    });
    sessionStorage.setItem(
      TRANSFER_DATA_KEY,
      JSON.stringify(this.businessTransactionData)
    );
    this.getBusinessData();
  }
  onProceedCashOut() {
    this.collectionData = {
      phone_no: this.form.value['phone_no'],
      operator: this.form.value['operator'],
      currency: this.businessTransactionData.currency,
      country: this.businessTransactionData.country,
      amount: this.businessTransactionData.amount,
      user_id: this.businessTransactionData.user_id,
    };

    sessionStorage.setItem(
      COLLECTION_DATA_KEY,
      JSON.stringify(this.collectionData)
    );

    const provider = this.form.value['operator'];
    if (this.businessTransactionData.country === 'GH') {
      switch (provider) {
        case 'mtn':
          this.router.navigate(['allow']);
          break;
        case 'vodafone':
          this.createCollection(provider);
          break;
        case 'airtel-tigo':
          this.createCollection(provider);
          break;
      }
    }
  }

  onCancelPayment() {
    if (this.businessTransactionData.cancel_url) {
      window.location.href = this.businessTransactionData.cancel_url;
    }
  }

  createCollection(provider) {
    this.businessService
      .createCollection(this.collectionData, this.credentials)
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (response && response['status'] === true) {
            const collection = {...this.collectionData, reference: response['data']['reference']};
            sessionStorage.setItem(COLLECTION_DATA_KEY, JSON.stringify(collection));
            switch (provider) {
              case 'vodafone':
                this.router.navigate(['vodafone']);
                break;
              case 'airtel-tigo':
                this.router.navigate(['airtel']);
                break;
            }
          }
        },
        (error) => {
          // TO DO
        }
      );
  }
}
