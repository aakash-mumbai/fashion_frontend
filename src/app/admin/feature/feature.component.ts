import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';
import * as EmitterKeys from '../../service/constant';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { FeatureSubImageComponent } from './feature-sub-image/feature-sub-image.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.styl']
})
export class FeatureComponent implements OnInit {

  displayedColumns: string[] = ['name', 'file', 'new', 'action'];
  dataSource: MatTableDataSource<any>;
  type = [];
  baseurl = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.getFeatures();
    this.baseurl = environment.baseUrl;
  }


  loadData() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.type);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });

  }

  getFeatures() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('features/0').subscribe(
      (res: any) => {
        this.type = res;
        this.commonService.emitData(EmitterKeys.LOADER, false);
        this.loadData();
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );
  }

  add(obj = null) {
    const dialogRef = this.dialog.open(AddFeatureComponent, {
      width: '850px',
      panelClass: 'modalpopup',
      data: obj,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFeatures();
    });
  }

  delete(id) {
    if (!(confirm('Are you sure you want to delete!!!'))) {
      return false;
    }
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.deleteData('features/' + id).subscribe(
      (res: any) => {
        this.getFeatures();
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );

  }

  addSubImage(id) {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    const dialogRef = this.dialog.open(FeatureSubImageComponent, {
      width: '850px',
      panelClass: 'modalpopup',
      data: { id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
