import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamAccountsComponent } from './teamaccounts.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: TeamAccountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamAccountsRoutingModule {
}
