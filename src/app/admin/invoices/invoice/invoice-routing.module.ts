import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: ':invoice_Id',
    component: InvoiceComponent,
    data: {
      toolbarShadowEnabled: true,
      containerEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
