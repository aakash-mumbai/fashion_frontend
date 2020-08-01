import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../service/shared.module';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { FeatureComponent } from './feature/feature.component';
import { SliderComponent } from './slider/slider.component';
import { AddsliderComponent } from './slider/addslider/addslider.component';
import { TypeComponent } from './type/type.component';
import { UpdateTypeComponent } from './type/update-type/update-type.component';
import { AddFeatureComponent } from './feature/add-feature/add-feature.component';
import { FeatureSubImageComponent } from './feature/feature-sub-image/feature-sub-image.component';
import { SubCatImagesComponent } from './sub-category/sub-cat-images/sub-cat-images.component';



@NgModule({
  declarations: [
    LoginComponent,
    CategoryComponent,
    DashboardComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    AddSubCategoryComponent,
    FeatureComponent,
    SliderComponent,
    AddsliderComponent,
    TypeComponent,
    UpdateTypeComponent,
    AddFeatureComponent,
    FeatureSubImageComponent,
    SubCatImagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [RouterModule],
  entryComponents: [
    AddCategoryComponent,
    AddSubCategoryComponent,
    AddsliderComponent,
    UpdateTypeComponent,
    AddFeatureComponent,
    FeatureSubImageComponent,
    SubCatImagesComponent
  ]
})
export class AdminModule { }
