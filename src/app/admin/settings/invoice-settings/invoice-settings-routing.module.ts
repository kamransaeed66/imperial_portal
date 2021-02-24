import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceSettingsComponent } from './invoice-settings.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: InvoiceSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceSettingsRoutingModule {
}
