import { Component, OnInit, Inject } from '@angular/core';
import { FeatureComponent } from '../feature.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.styl']
})
export class AddFeatureComponent implements OnInit {
  jsonDoc = 'test';
  featureProduct: FormGroup;

  imageSrc: any = '';
  imageSrc1: any = '';
  imageSrc2: any = '';

  editImageSrc: any = '';
  editImageSrc1: any = '';
  editImageSrc2: any = '';

  fileExt = '';
  fileExt1 = '';
  fileExt2 = '';

  errMsg = '';
  isUpdated = false;
  mode = 'new';

  constructor(public dialogRef: MatDialogRef<FeatureComponent>,
              private commonService: CommonService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data,
              ) {
  }

  ngOnInit() {
    this.featureProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      features: new FormControl(''),
    });
    if (this.data && this.data.file) {
      this.featureProduct.patchValue(this.data);
      this.imageSrc = environment.baseUrl + this.data.file;
      this.imageSrc1 = environment.baseUrl + this.data.file1;
      this.imageSrc2 = environment.baseUrl + this.data.file2;
      this.mode = 'edit';
    }
  }

  async showPreview(event, n: number) {
    this.isUpdated = true;
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview

    const fileConvert = await this.commonService.convertBase64(file);
    if (n === 1) {
      this.fileExt = file.name.split('.')[1];
      this.imageSrc = fileConvert;
    }
    if (n === 2) {
      this.fileExt1 = file.name.split('.')[1];
      this.imageSrc1 = fileConvert;
    }
    if (n === 3) {
      this.fileExt2 = file.name.split('.')[1];
      this.imageSrc2 = fileConvert;
    }
  }

  async editPreview(event, n) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview

    const fileConvert = await this.commonService.convertBase64(file);
    if (n === 1) {
      this.fileExt = file.name.split('.')[1];
      this.editImageSrc = fileConvert;
      this.imageSrc = fileConvert;
    }
    if (n === 2) {
      this.fileExt1 = file.name.split('.')[1];
      this.editImageSrc1 = fileConvert;
      this.imageSrc1 = fileConvert;
    }
    if (n === 3) {
      this.fileExt2 = file.name.split('.')[1];
      this.editImageSrc2 = fileConvert;
      this.imageSrc2 = fileConvert;
    }
  }


  submit(formData) {
    let data = {
      file: (this.mode === 'new') ? this.imageSrc : (this.editImageSrc !== '') ? this.editImageSrc : '',
      file1: (this.mode === 'new') ? this.imageSrc1 : (this.editImageSrc1 !== '') ? this.editImageSrc1 : '',
      file2: (this.mode === 'new') ? this.imageSrc2 : (this.editImageSrc2 !== '') ? this.editImageSrc2 : '',
      fileName: (this.data && this.data.file) ? this.data.file : '',
      fileName1: (this.data && this.data.file1) ? this.data.file1 : '',
      fileName2: (this.data && this.data.file2) ? this.data.file2 : '',
      ext: this.fileExt,
      ext1: this.fileExt1,
      ext2: this.fileExt2,
      name: formData.name,
      _id: (this.data && this.data._id) ? this.data._id : 0
    };
    data = {...data, ...formData};
    if (data._id === 0) {
      this.commonService.postData('features', data).subscribe((res: any) => {
        this.dialogRef.close();
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        } else if (err.status === 400) {
          this.errMsg = err.error.message;
        }
      });
    } else {
      this.commonService.patchData('features', data).subscribe((res: any) => {
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
  }

  cancel() {
    this.dialogRef.close();
  }
}
