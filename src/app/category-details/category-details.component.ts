import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService } from '../service/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterComponent } from '../toaster/toaster.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.styl']
})
export class CategoryDetailsComponent implements OnInit {
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  featureDetails: any;
  subImage: any;
  myThumbnail = '';
  myFullresImage = '';
  baseUrl = environment.baseUrl;
  starsCount = 0;
  name = '';
  pid = '';
  ratingScore = 0;
  reviewList = [];
  review: FormGroup;
  durationInSeconds = 5;
  errMsg = '';

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private commonService: CommonService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          if (params.id) {
            this.pid = params.id;
            this.getFeatureDetails(params.id);
          }
        }
      );

    this.name = this.commonService.path;
    if (!(localStorage.getItem('subscribe'))) {
      this.router.navigate(['/']);
    }
    this.review = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }


  getFeatureDetails(id) {
    this.commonService.getData('subCategory/details/' + id).subscribe((res: any) => {
      this.featureDetails = res;
      if (!(res && res.file)) {
        this.router.navigate(['/']);
      }
      this.myThumbnail = this.baseUrl + res.file;
      this.myFullresImage = this.baseUrl + res.file;
      this.getSubImages(id);
      this.getRatingScore();
      this.getReview();
      this.cdr.detectChanges();
    });
  }

  getSubImages(id) {
    this.commonService.getData('subCategory/image/' + id).subscribe((res: any) => {
      this.subImage = res;
      this.cdr.detectChanges();
    });
  }

  changeImg(obj) {
    this.myThumbnail = this.baseUrl + obj.file1;
    this.myFullresImage = this.baseUrl + obj.file2;
  }

  saverating() {
    const user = JSON.parse(localStorage.getItem('subscribe'));
    const obj = {
      email: (user && user.email) ? user.email : '',
      mobile: (user && user.mobile) ? user.mobile : '',
      rating: this.starsCount,
      pID: this.pid
    };
    this.commonService.postData('rating', obj).subscribe((res: any) => {
      this.starsCount = 0;
      this.openSnackBar();
      this.getRatingScore();
    });
  }

  getRatingScore() {
    this.ratingScore = 0;
    this.commonService.getData('rating/' + this.pid).subscribe((res: any) => {
      if (res && res.length > 0) {
        res.forEach((rat) => {
          this.ratingScore = Number(this.ratingScore + rat.rating);
        });
        this.ratingScore = (this.ratingScore / res.length);
      }
    });
  }

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  home() {
    this.router.navigate(['/']);
  }

  getReview() {
    this.commonService.getData('review/' + this.pid).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.reviewList = res;
      }
    });
  }

  saveReview(formData) {
    if (formData.mobile.toString().length !== 10) {
      this.errMsg = 'Please enter valid mobile number';
      return false;
    }
    this.errMsg = '';
    formData.pID = this.pid;
    this.commonService.postData('review', formData).subscribe((res: any) => {
      this._snackBar.openFromComponent(ToasterComponent, {
        duration: this.durationInSeconds * 1000,
        panelClass: 'success'
      });
      this.review = new FormGroup({
        name: new FormControl(''),
        mobile: new FormControl(''),
        message: new FormControl('')
      });
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'success'
    });
  }

}
