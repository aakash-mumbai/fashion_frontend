import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from '../service/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { FeatureComponent } from './feature/feature.component';
import { SliderComponent } from './slider/slider.component';
import { TypeComponent } from './type/type.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'subcategory',
    component: SubCategoryComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'feature',
    component: FeatureComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'slider',
    component: SliderComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'type',
    component: TypeComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
