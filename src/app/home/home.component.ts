import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { environment } from '../../environments/environment';
import * as EmitterKeys from '../service/constant';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeComponent } from '../subscribe/subscribe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  sliderList = [];
  typeList = [];
  baseUrl = environment.baseUrl;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 300
  };

  constructor(private commonService: CommonService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.getSlider();
    if (!(localStorage.getItem('subscribe'))) {
      this.openSubscribe();
    }
  }

  getSlider() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('slider').subscribe((res: any) => {
      if (res.length > 0) {
        this.sliderList = res;
        this.getType();
      }
    });
  }

  getType() {
    this.commonService.getData('type/0').subscribe((res: any) => {
      if (res.length > 0) {
        this.typeList = res;
        this.commonService.emitData(EmitterKeys.LOADER, false);
      }
    });
  }

  categoryType(type) {
    let id = 0;
    if (type.name === 'Mens') {
      id = 0;
    } else if (type.name === 'Womens') {
      id = 1;
    } else {
      id = 3;
    }
    this.router.navigate(['category/' + id]);
  }

  openSubscribe() {
    const dialogRef = this.dialog.open(SubscribeComponent, {
      width: '550px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
