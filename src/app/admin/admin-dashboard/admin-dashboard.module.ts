import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from '../../../@vex/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { WidgetQuickLineChartModule } from '../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import { WidgetQuickValueCenterModule } from '../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetQuickValueStartModule } from '../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import { WidgetLargeGoalChartModule } from '../../../@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import { IconModule } from '@visurel/iconify-angular';
import { WidgetAssistantModule } from '../../../@vex/components/widgets/widget-assistant/widget-assistant.module';
import { WidgetLargeChartModule } from '../../../@vex/components/widgets/widget-large-chart/widget-large-chart.module';
import { WidgetTableModule } from '../../../@vex/components/widgets/widget-table/widget-table.module';
import { SecondaryToolbarModule } from '../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { ContainerModule } from '../../../@vex/directives/container/container.module';
import { AdminJobTableComponent } from './admin-job-table/admin-job-table.component';
import { ClientCreateUpdateModule } from 'src/app/admin/clients/client-create-update/client-create-update.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [AdminDashboardComponent, AdminJobTableComponent ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    IconModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    ClientCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ]
})
export class AdminDashboardModule {
}
