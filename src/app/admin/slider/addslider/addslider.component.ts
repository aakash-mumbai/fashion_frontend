import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SliderComponent } from '../slider.component';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addslider',
  templateUrl: './addslider.component.html',
  styleUrls: ['./addslider.component.styl']
})
export class AddsliderComponent implements OnInit {

  imageSrc: any = '';
  fileExt = '';
  errMsg = '';
  constructor(public dialogRef: MatDialogRef<SliderComponent>,
              private commonService: CommonService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data,
              ) {
  }

  ngOnInit() {
    console.log(this.data);
  }

  async showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview

    const fileConvert = await this.convertBase64(file);
    this.imageSrc = fileConvert;
  }

  convertBase64(file: File) {
    console.log(file.name);
    this.fileExt = file.name.split('.')[1];
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  submit() {
    const data = {
      file: this.imageSrc,
      ext: this.fileExt
    };

    this.commonService.postData('slider', data).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close();
    },
    (err) => {
      if (err.status === 401) {
        this.router.navigate(['/admin']);
      } else if (err.status === 400) {
        this.errMsg = err.error.message;
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
