import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from '../../../environments/environment';
import { TabsetComponent } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from 'src/app/toaster/toaster.component';


@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.styl']
})
export class FeatureDetailsComponent implements OnInit {
  @ViewChild('tabset', { static: true }) tabset: TabsetComponent;
  featureDetails: any;
  subImage: any;
  myThumbnail = '';
  myFullresImage = '';
  baseUrl = environment.baseUrl;
  starsCount = 0;
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
    this.commonService.getData('features/' + id).subscribe((res: any) => {
      this.featureDetails = res;
      this.myThumbnail = this.baseUrl + res.file;
      this.myFullresImage = this.baseUrl + res.file;
      this.getSubImages(id);
      this.getRatingScore();
      this.getReview();
      this.cdr.detectChanges();
    });
  }

  getSubImages(id) {
    this.commonService.getData('features/image/' + id).subscribe((res: any) => {
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

  getReview() {
    this.commonService.getData('review/' + this.pid).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.reviewList = res;
      }
      this.review = new FormGroup({
        name: new FormControl(''),
        mobile: new FormControl(''),
        message: new FormControl('')
      });
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
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'success'
    });
  }
}
