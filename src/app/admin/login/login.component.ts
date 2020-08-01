import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import * as EmitterKeys from './../../service/constant';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMsg = '';
  constructor(private commonService: CommonService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });

    if (localStorage.getItem('token')) {
      this.commonService.emitData(EmitterKeys.ADMIN_LOGIN, true);
      this.router.navigate(['admin/dashboard']);
    }
  }

  async login(formData) {
    const url = 'login';
    this.commonService.postData(url, formData).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.commonService.emitData(EmitterKeys.ADMIN_LOGIN, true);
        this.router.navigate(['admin/dashboard']);
      }
    },
    (err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.router.navigate(['admin']);
      } else if (err.status === 400) {
        this.errMsg = err.error.message;
      }
    });
    // data
    // console.log(data);
    // console.log(data.error);
    // localStorage.setItem('token', '123');
    // this.commonService.emitData(EmitterKeys.ADMIN_LOGIN, true);
    // this.router.navigate(['admin/dashboard']);
  }
}
