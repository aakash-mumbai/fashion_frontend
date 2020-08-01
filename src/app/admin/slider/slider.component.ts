import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddsliderComponent } from './addslider/addslider.component';
import * as EmitterKeys from '../../service/constant';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.styl']
})
export class SliderComponent implements OnInit {
  displayedColumns: string[] = ['file', 'action'];
  dataSource: MatTableDataSource<any>;
  slider = [];
  baseurl = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.getSlider();
    this.baseurl = environment.baseUrl;
  }


  loadData() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.slider);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
  });

  }

  getSlider() {
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.getData('slider').subscribe(
      (res: any) => {
        this.slider = res;
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

  delete(id) {
    if (!(confirm('Are you sure you want to delete!!!'))) {
      return false;
    }
    this.commonService.emitData(EmitterKeys.LOADER, true);
    this.commonService.deleteData('slider/' + id).subscribe((res: any) => {
      this.getSlider();
    }, (err) => {
      if (err.status) {
        this.router.navigate(['/admin']);
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddsliderComponent, {
      width: '550px',
      data: {name: 'Harish', animal: 'Dog'},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSlider();
    });
  }

}
