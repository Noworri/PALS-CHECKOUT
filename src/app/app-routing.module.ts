import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirteltigoViewComponent } from './component/airteltigo-view/airteltigo-view.component';
import { AllowCashOutComponent } from './component/allow-cash-out/allow-cash-out.component';
import { MtnViewComponent } from './component/mtn-view/mtn-view.component';
import { ProceedCashOutComponent } from './component/proceed-cash-out/proceed-cash-out.component';
import { UnsuccesfullTransactionComponent } from './component/unsuccesfull-transaction/unsuccesfull-transaction.component';
import { VodaphoneViewComponent } from './component/vodaphone-view/vodaphone-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'phone_number',
    pathMatch: 'full'
  },
  {
    path: 'phone_number',
    component: ProceedCashOutComponent,
  },
  {
    path: 'allow',
    component: AllowCashOutComponent,
  },
  {
    path: 'airtel',
    component: AirteltigoViewComponent,
  },
  {
    path: 'vodafone',
    component: VodaphoneViewComponent,
  },
  {
    path: 'mtn',
    component: MtnViewComponent,
  },
  {
    path: 'unsuccesfull',
    component: UnsuccesfullTransactionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
