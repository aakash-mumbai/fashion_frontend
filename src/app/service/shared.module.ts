import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from '../admin/header/header.component';
import { SidebarComponent } from '../admin/sidebar/sidebar.component';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxSpinnerModule,
    AngularEditorModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CollapseModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxSpinnerModule,
    AngularEditorModule,
    CarouselModule,
    TabsModule,
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
