import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { SubaccountsComponent } from './subaccounts.component';


const routes: VexRoutes = [
  {
    path: '',
    component: SubaccountsComponent,
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubaccountsRoutingModule {
}
