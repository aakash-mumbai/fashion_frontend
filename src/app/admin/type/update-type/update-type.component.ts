import { Component, OnInit, Inject } from '@angular/core';
import { TypeComponent } from '../type.component';
import { CommonService } from 'src/app/service/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styleUrls: ['./update-type.component.styl']
})
export class UpdateTypeComponent implements OnInit {
  type: FormGroup;
  imageSrc: any = '';
  fileExt = '';
  errMsg = '';
  isUpdated = false;
  constructor(public dialogRef: MatDialogRef<TypeComponent>,
              private commonService: CommonService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data,
              ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.type = new FormGroup({
      name: new FormControl({value: this.data.name, disabled: true}),
      _id: new FormControl({value: this.data._id, disabled: true})
    });
    if (this.data.file) {
      this.imageSrc = environment.baseUrl + this.data.file;
    }
  }

  async showPreview(event) {
    this.isUpdated = true;
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview

    const fileConvert = await this.convertBase64(file);
    this.imageSrc = fileConvert;
  }

  convertBase64(file: File) {
    this.fileExt = file.name.split('.')[1];
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  submit(formData) {
    if (this.isUpdated) {
      const data = {
        file: this.imageSrc,
        fileName: this.data.file,
        ext: this.fileExt,
        name: formData.name,
        _id: this.data._id
      };

      this.commonService.patchData('type', data).subscribe((res: any) => {
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
      this.dialogRef.close();
    }

  }

  cancel() {
    this.dialogRef.close();
  }
}
