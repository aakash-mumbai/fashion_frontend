import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.styl']
})
export class SubCategoryComponent implements OnInit {
  categoryList = [];
  baseUrl = environment.baseUrl;
  name = '';
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          if (params.id) {
            this.getCategoryDetails(params.id);
          }
        }
      );
    this.name = this.commonService.path;
  }

  getCategoryDetails(id: string) {
    this.commonService.getData('subcategory/list/' + id).subscribe((res: any) => {
      this.categoryList = res;
      if (this.categoryList.length === 0) {
        this.router.navigate(['/']);
      }
      this.cdr.detectChanges();
    });
  }

  subCategory(type) {
    this.commonService.path = this.commonService.path + ' / ' + type.name;
    this.router.navigate(['category/details/' + type._id]);
  }

  home() {
    this.router.navigate(['/']);
  }

}
