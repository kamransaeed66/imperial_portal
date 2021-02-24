import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailSettingsComponent } from './email-settings.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: EmailSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSettingsRoutingModule {
}
