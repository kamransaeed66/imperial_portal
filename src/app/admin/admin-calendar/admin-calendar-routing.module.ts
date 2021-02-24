import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { AdminCalendarComponent } from './admin-calendar.component';


const routes: VexRoutes = [
  {
    path: '',
    component: AdminCalendarComponent,
    data: {
      toolbarShadowEnabled: true,
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCalendarRoutingModule {
}
