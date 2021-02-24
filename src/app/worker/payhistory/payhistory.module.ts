import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayhistoryRoutingModule } from './payhistory-routing.module';
import { PayhistoryComponent } from './payhistory.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from '../../../@vex/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { WidgetTableModule } from '../../../@vex/components/widgets/widget-table/widget-table.module';
import { SecondaryToolbarModule } from '../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../@vex/directives/container/container.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {NgxPrintModule} from'ngx-print';

@NgModule({
  declarations: [PayhistoryComponent],
  imports: [
    CommonModule,
    NgxPrintModule,
    PayhistoryRoutingModule,
    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    IconModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ]
})
export class PayhistoryModule {
}
