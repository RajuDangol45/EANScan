import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService, private router: Router) {}

  scanBarcode() {
    this.scannerService.scanBarcode().then(res => {
      this.router.navigateByUrl('prices?ean=' + res);
    });
  }

}
