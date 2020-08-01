import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonService } from '../service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.styl']
})
export class CategoryComponent implements OnInit {
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
            this.name = (params.id === '0') ? 'Mens' : (params.id === '1') ? 'Womens' : 'Kids';
            this.getCategoryDetails(this.name);
          }
        }
      );
  }

  getCategoryDetails(name: string) {
    this.commonService.getData('category/list/' + name).subscribe((res: any) => {
      this.categoryList = res;
      if (this.categoryList.length === 0) {
        this.router.navigate(['/']);
      }
      this.cdr.detectChanges();
    });
  }

  subCategory(type) {
    this.commonService.path = this.name + ' / ' + type.name;
    this.router.navigate(['subcategory/' + type._id]);
  }

  home() {
    this.router.navigate(['/']);
  }
}
