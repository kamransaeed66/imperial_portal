import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';
import { InvoicesComponent } from './invoices.component';


const routes: VexRoutes = [
  {
    path: '',
    component: InvoicesComponent,
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {
}
