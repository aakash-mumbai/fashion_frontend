import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';
import * as EmitterKeys from '../../service/constant';
import { SubCatImagesComponent } from './sub-cat-images/sub-cat-images.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.styl']
})
export class SubCategoryComponent implements OnInit {
  baseurl = '';
  categoryList: any;
  displayedColumns: string[] = ['type', 'name', 'file', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              public router: Router,
              public cdr: ChangeDetectorRef,
              public commonService: CommonService) {
  }

  ngOnInit() {
    this.getSubCategory();
    this.baseurl = environment.baseUrl;
  }

  loadData() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSubCategory() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('subCategory').subscribe(
      (res: any) => {
        this.categoryList = res;
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

  add(data = null) {
    const dialogRef = this.dialog.open(AddSubCategoryComponent, {
      width: '1050px',
      data,
      disableClose: true,
      panelClass: 'modalpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSubCategory();
    });
  }

  delete(id) {
    if (!(confirm('Are you sure you want to delete!!!'))) {
      return false;
    }
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.deleteData('subCategory/' + id).subscribe(
      (res: any) => {
        this.getSubCategory();
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );
  }

  subImage(id) {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    const dialogRef = this.dialog.open(SubCatImagesComponent, {
      width: '1050px',
      panelClass: 'modalpopup',
      data: { id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
