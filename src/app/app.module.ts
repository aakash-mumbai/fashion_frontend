import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { AuthService } from './service/auth.service';
import { AuthGuardGuard } from './service/auth-guard.guard';
import { SharedModule } from './service/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FeatureProductComponent } from './feature-product/feature-product.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FeatureDetailsComponent } from './feature-product/feature-details/feature-details.component';
import { HeaderComponent } from './common/header/header.component';
import { ContactUsComponent } from './common/contact-us/contact-us.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {RatingModule} from 'ngx-rating';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeatureProductComponent,
    FeatureDetailsComponent,
    HeaderComponent,
    ContactUsComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    SubCategoryComponent,
    SubscribeComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    SlickCarouselModule,
    NgxImageZoomModule.forRoot(),
    RatingModule
  ],
  providers: [
    AuthService,
    AuthGuardGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    SubscribeComponent,
    ToasterComponent
  ]
})
export class AppModule { }
