import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allow-cash-out',
  templateUrl: './allow-cash-out.component.html',
  styleUrls: ['./allow-cash-out.component.scss'],
})
export class AllowCashOutComponent implements OnInit {
  setDisplayLoader = false;
  setDisplayText = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAllowCashout() {
    this.setDisplayLoader = true;
    this.setDisplayText = false;
    setTimeout(() => {
      this.router.navigate(['transaction-succesful']);
    }, 3000);
  }
}
