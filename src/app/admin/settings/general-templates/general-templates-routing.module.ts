import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralTemplatesComponent } from './general-templates.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: GeneralTemplatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralTemplatesRoutingModule {
}
