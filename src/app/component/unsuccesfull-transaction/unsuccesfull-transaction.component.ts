import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsuccesfull-transaction',
  templateUrl: './unsuccesfull-transaction.component.html',
  styleUrls: ['./unsuccesfull-transaction.component.scss'],
})
export class UnsuccesfullTransactionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRetryPayement() {
    this.router.navigate(['allow']);
  }
}
