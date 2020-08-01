import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryComponent } from '../category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import * as EmitterKeys from '../../../service/constant';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.styl']
})
export class AddCategoryComponent implements OnInit {
  imageSrc: any = '';
  typeList: any;
  uploadForm: FormGroup;
  fileExt = '';
  errMsg = '';
  mode = '';
  imgChange = false;

  constructor(public dialogRef: MatDialogRef<CategoryComponent>,
              public commonService: CommonService,
              public cdr: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data,
              public fb: FormBuilder) {
              this.uploadForm = this.fb.group({
                name: ['', Validators.required],
                type: ['', Validators.required]
              });
              this.getType();
  }

  ngOnInit() {
    if (this.data && this.data._id) {
      this.mode = 'edit';
      this.imageSrc = environment.baseUrl + this.data.file;
      this.uploadForm.patchValue(this.data);
    }

  }

  getType() {
    this.commonService.getData('type/0').subscribe((res: any) => {
      this.typeList = res;
      this.cdr.detectChanges();
    });
  }

  async showPreview(event) {
    if (this.data && this.data._id) {
      this.imgChange = true;
    }
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    this.fileExt = file.name.split('.')[1];
    const fileConvert = await this.commonService.convertBase64(file);
    this.imageSrc = fileConvert;
  }

  submit(formData: any) {
    if (this.mode === '') {
      if (this.fileExt === '') {
        this.errMsg = 'Please select file';
        return false;
      }
      const typeName = this.typeList.find((el) => {
        return el._id === formData.type;
      });
      formData.typeName = typeName.name;
      formData.ext = this.fileExt;
      formData.file = this.imageSrc;
      formData.fileName = '';
      this.commonService.emitData(EmitterKeys.LOADER, true);
      this.commonService.postData('category', formData).subscribe(
        (res) => {
          this.dialogRef.close();
        }
      );
    } else {
      formData.ext = (this.imgChange) ? this.fileExt : '';
      formData.file = (this.imgChange) ? this.imageSrc : '';
      formData.fileName = this.data.file;
      const typeName = this.typeList.find((el) => {
        return el._id === formData.type;
      });
      formData.typeName = typeName.name;
      formData._id = this.data._id;
      this.commonService.emitData(EmitterKeys.LOADER, true);
      this.commonService.patchData('category', formData).subscribe(
        (res) => {
          this.dialogRef.close();
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
