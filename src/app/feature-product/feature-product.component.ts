import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import * as EmitterKeys from '../service/constant';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.styl']
})
export class FeatureProductComponent implements OnInit {
  baseUrl = environment.baseUrl;

  featureProduct = [];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
    speed: 300
  };
  constructor(private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.getFeature();
  }

  getFeature() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('features/0').subscribe((res: any) => {
      if (res.length > 0) {
        this.featureProduct = res;
        this.commonService.emitData(EmitterKeys.LOADER, false);
      }
    });
  }

  feature(id) {
    this.router.navigate(['/feature/' + id]);
  }
}
