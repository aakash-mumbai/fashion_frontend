import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import * as EventKeys from './../../service/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  isToggle = false;
  isCollapsed = true;
  constructor(private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.commonService.getEmitter(EventKeys.SIDEBAR).subscribe(arg => {
      this.isToggle = arg;
      this.commonService.emitData(EventKeys.MAIN_CONTAINER, false);
    });
  }

  openNav() {
    this.isToggle = true;
    this.commonService.emitData(EventKeys.HEADER, true);
  }

  logout() {
    this.isToggle = false;
    this.commonService.emitData(EventKeys.ADMIN_LOGIN, false);
    localStorage.clear();
    this.router.navigate(['/admin']);
  }
}
