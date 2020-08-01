import { Component, OnInit, Inject } from '@angular/core';
import { SubCategoryComponent } from '../sub-category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import * as EmitterKeys from '../../../service/constant';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.styl']
})
export class AddSubCategoryComponent implements OnInit {
  imageSrc: any = '';
  imageSrc1: any = '';
  imageSrc2: any = '';

  editImageSrc: any = '';
  editImageSrc1: any = '';
  editImageSrc2: any = '';

  fileExt = '';
  fileExt1 = '';
  fileExt2 = '';

  categoryList: any;
  uploadForm: FormGroup;
  mode = 'new';
  isUpdated = false;
  errMsg = '';

  constructor(public dialogRef: MatDialogRef<SubCategoryComponent>,
              public commonService: CommonService,
              public router: Router,
              @Inject(MAT_DIALOG_DATA) public data,
              public fb: FormBuilder) {
              this.uploadForm = this.fb.group({
                name: ['', Validators.required],
                cID: ['', Validators.required],
                description: ['', Validators.required],
                features: ['', Validators.required],
              });
  }

  ngOnInit() {
    if (this.data && this.data._id) {
      this.uploadForm.patchValue(this.data);
      this.mode = 'edit';
      this.imageSrc = environment.baseUrl + this.data.file;
      this.imageSrc1 = environment.baseUrl + this.data.file1;
      this.imageSrc2 = environment.baseUrl + this.data.file2;
      console.log(this.data);
    }

    this.getCategory();
  }

  getCategory() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('category/0').subscribe(
      (res: any) => {
        this.categoryList = res;
        this.commonService.emitData(EmitterKeys.LOADER, false);
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );
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
    if (this.mode === 'new') {
      if (this.imageSrc === '' && this.imageSrc1 === '' && this.imageSrc2 === '') {
        this.errMsg = 'Please select images';
        return false;
      }
      const catName = this.categoryList.find((el) => {
        return el._id === formData.cID;
      });
      formData.typeName = catName.name;
      formData.ext = this.fileExt;
      formData.ext1 = this.fileExt1;
      formData.ext2 = this.fileExt2;
      formData.file = this.imageSrc;
      formData.file1 = this.imageSrc1;
      formData.file2 = this.imageSrc2;
      formData.fileName = '';
      formData.fileName1 = '';
      formData.fileName2 = '';
      console.log(formData);
      this.commonService.postData('subCategory', formData).subscribe((res: any) => {
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
      formData.typeName = this.data.typeName;
      formData.ext = this.fileExt;
      formData.ext1 = this.fileExt1;
      formData.ext2 = this.fileExt2;
      formData.file = this.editImageSrc;
      formData.file1 = this.editImageSrc1;
      formData.file2 = this.editImageSrc2;
      formData.fileName = this.data.file;
      formData.fileName1 = this.data.file1;
      formData.fileName2 = this.data.file2;
      formData._id = this.data._id;
      this.commonService.patchData('subCategory', formData).subscribe((res: any) => {
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

    // this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
