import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProceedCashOutComponent } from './component/proceed-cash-out/proceed-cash-out.component';
import { AllowCashOutComponent } from './component/allow-cash-out/allow-cash-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnsuccesfullTransactionComponent } from './component/unsuccesfull-transaction/unsuccesfull-transaction.component';
import { AirteltigoViewComponent } from './component/airteltigo-view/airteltigo-view.component';
import { VodaphoneViewComponent } from './component/vodaphone-view/vodaphone-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MtnViewComponent } from './component/mtn-view/mtn-view.component';
import { PalLogoComponent } from './common/pal-logo/pal-logo.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentMadeButtonComponent } from './common/payment-made-button/payment-made-button.component';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { SuccessfulCollectionComponent } from './component/successful-collection/successful-collection.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProceedCashOutComponent,
    AllowCashOutComponent,
    UnsuccesfullTransactionComponent,
    AirteltigoViewComponent,
    VodaphoneViewComponent,
    MtnViewComponent,
    PalLogoComponent,
    PaymentMadeButtonComponent,
    LoadingSpinnerComponent,
    SuccessfulCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
