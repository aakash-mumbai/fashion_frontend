import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import * as EventKeys from './../../service/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {

  isToggle = false;
  constructor(private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.commonService.getEmitter(EventKeys.HEADER).subscribe(arg => {
      this.isToggle = arg;
      this.commonService.emitData(EventKeys.MAIN_CONTAINER, true);
    });
  }

  closeNav() {
    this.isToggle = false;
    this.commonService.emitData(EventKeys.SIDEBAR, false);
  }

  navigate(name) {
    this.commonService.emitData(EventKeys.ADMIN_LOGIN, true);
    this.router.navigate(['/admin/' + name]);
  }
}
