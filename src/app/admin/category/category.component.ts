import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CommonService } from 'src/app/service/common.service';
import * as EmitterKeys from '../../service/constant';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.styl']
})
export class CategoryComponent implements OnInit {
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
    this.getCategory();
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

  getCategory() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('category/0').subscribe(
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
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '550px',
      data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  delete(id) {
    if (!(confirm('Are you sure you want to delete!!!'))) {
      return false;
    }
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.deleteData('category/' + id).subscribe(
      (res: any) => {
        console.log(res);
        this.getCategory();
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );
  }

}
