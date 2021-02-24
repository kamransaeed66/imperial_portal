import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { ClientTimesheetComponent } from './client-timesheet.component';


const routes: VexRoutes = [
  {
    path: '',
    component: ClientTimesheetComponent,
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTimesheetRoutingModule {
}
