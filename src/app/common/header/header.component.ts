import { Component, Input, OnInit } from '@angular/core';
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
  unsubscribe$ = new Subject();
  @Input() businessData: any;
  @Input() businessLogo: string;
  constructor(
    private router: Router,
    private businessService: BusinessService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
