import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeatureComponent } from '../feature.component';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import * as EmitterKeys from '../../../service/constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feature-sub-image',
  templateUrl: './feature-sub-image.component.html',
  styleUrls: ['./feature-sub-image.component.styl']
})
export class FeatureSubImageComponent implements OnInit {
  images = [];

  fileExt = '';
  fileExt1 = '';
  fileExt2 = '';

  imageSrc: any = '';
  imageSrc1: any = '';
  imageSrc2: any = '';

  baseurl = '';

  constructor(public dialogRef: MatDialogRef<FeatureComponent>,
              private commonService: CommonService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.getSubImage(this.data.id);
    this.baseurl = environment.baseUrl;
  }

  getSubImage(id) {
    this.commonService.getData('features/image/' + id).subscribe(
      (res: any) => {
        this.commonService.emitData(EmitterKeys.LOADER, false);
        const images = res;
        this.images = images;
        console.log(this.images)
        this.cdr.detectChanges();
      }
    );
  }

  delete(id) {
    if (!confirm('Are you sure you want delete!!!')) {
      return false;
    }
    this.commonService.deleteData('features/image/' + id).subscribe(
      (res) => {
        this.getSubImage(this.data.id);
      }
    );
  }

  async showPreview(event, n: number) {
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

  save() {
    const data = {
      file: this.imageSrc,
      file1: this.imageSrc1,
      file2: this.imageSrc2,
      ext: this.fileExt,
      ext1: this.fileExt1,
      ext2: this.fileExt2,
      fID: this.data.id
    };
    this.commonService.postData('features/image', data).subscribe(
      (res) => {
        this.dialogRef.close();
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
