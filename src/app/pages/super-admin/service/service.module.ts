import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngb-modal';
import { ProductListComponent } from './product-list/product-list.component';
import { PuchaselistComponent } from './puchaselist/puchaselist.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelect2Module } from 'ng-select2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOtpInputModule } from 'ng-otp-input';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';


@NgModule({
  declarations: [
    // AddProductComponent,
    // ProductListComponent,
    // PuchaselistComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    BrowserModule,
    NgSelect2Module, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    NgOtpInputModule,
    AutocompleteLibModule, 
    CKEditorModule,
    NgxPrintModule,
    ModalModule, 
    BsDatepickerModule.forRoot(),

  ]
})
export class ServiceModule { }
