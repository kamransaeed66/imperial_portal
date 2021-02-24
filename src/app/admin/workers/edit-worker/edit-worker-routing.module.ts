import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditWorkerComponent } from './edit-worker.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: EditWorkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWorkerRoutingModule {
}

