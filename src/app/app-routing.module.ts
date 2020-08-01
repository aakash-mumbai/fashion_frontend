import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './service/shared.module';
import { HomeComponent } from './home/home.component';
import { FeatureDetailsComponent } from './feature-product/feature-details/feature-details.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'feature/:id',
    component: FeatureDetailsComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'subcategory/:id',
    component: SubCategoryComponent
  },
  {
    path: 'category/details/:id',
    component: CategoryDetailsComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'contact',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled'
    }),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
