import { Component, OnInit } from '@angular/core';
import * as EmitterKeys from './service/constant';
import { CommonService } from './service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'fashion';
  isAdminLogin = false;
  isToggle = false;



  constructor(public commonService: CommonService,
              private spinner: NgxSpinnerService) {}


  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.

    const url = window.location.hash.split('/');
    const isAdmin = url.find((name) => name === 'admin');
    if (isAdmin && url.length > 2) {
      this.isAdminLogin = true;
      this.commonService.isAdminLoggedIn = true;
    }

    this.commonService.getEmitter(EmitterKeys.ADMIN_LOGIN).subscribe(arg => {
      this.isAdminLogin = arg;
      this.commonService.isAdminLoggedIn = arg;
    });

    this.commonService.getEmitter(EmitterKeys.MAIN_CONTAINER).subscribe(arg => {
      this.isToggle = arg;
      this.commonService.isSidebarOpen = arg;
    });

    this.commonService.getEmitter(EmitterKeys.LOADER).subscribe((arg: boolean) => {
        if (arg) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
    });
  }
}
