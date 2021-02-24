import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import {NgxPrintModule} from'ngx-print';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    NgxPrintModule,
    InvoiceRoutingModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    FlexLayoutModule,MatButtonModule,
    IconModule
  ]
})
export class InvoiceModule {
}
