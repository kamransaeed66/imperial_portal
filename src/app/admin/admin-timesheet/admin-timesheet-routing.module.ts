import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { AdminTimesheetComponent } from './admin-timesheet.component';


const routes: VexRoutes = [
  {
    path: '',
    component: AdminTimesheetComponent,
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTimesheetRoutingModule {
}
