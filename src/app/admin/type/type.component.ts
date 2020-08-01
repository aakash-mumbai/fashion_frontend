import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UpdateTypeComponent } from './update-type/update-type.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';
import * as EmitterKeys from '../../service/constant';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.styl']
})
export class TypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'file', 'action'];
  dataSource: MatTableDataSource<any>;
  type = [];
  baseurl = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.getTypes();
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

  getTypes() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('type/0').subscribe(
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
    )
  }

  add(data) {
    const dialogRef = this.dialog.open(UpdateTypeComponent, {
      width: '550px',
      data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTypes();
    });
  }

  update(id) {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('type/' + id).subscribe(
      (res: any) => {
        this.type = res;
        this.commonService.emitData(EmitterKeys.LOADER, false);
        this.add(this.type);
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/admin']);
        }
      }
    );
  }

}
