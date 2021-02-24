import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminJobComponent } from './admin-job.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    redirectTo: '1'
  },
  {
    path: ':scrumboardId',
    component: AdminJobComponent,
    data: {
      scrollDisabled: true,
      containerEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminJobRoutingModule {
}
