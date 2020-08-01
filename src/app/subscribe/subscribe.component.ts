import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.styl']
})
export class SubscribeComponent implements OnInit {
  form: FormGroup;
  errMsg = '';

  constructor(private commonService: CommonService,
              public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email
      ])),
      mobile: new FormControl('')
    });
  }

  subscribe(formData) {
    if (formData.email === '' && formData.mobile === '') {
      this.errMsg = 'Please enter atleast one field';
      return false;
    }
    if (formData.mobile.toString().length !== 10) {
      this.errMsg = 'Please enter valid mobile number';
      return false;
    }
    this.errMsg = '';
    this.commonService.postData('subscribe', formData).subscribe((res: any) => {
      localStorage.setItem('subscribe', JSON.stringify(formData));
      this.dialogRef.close();
    });
  }

}
