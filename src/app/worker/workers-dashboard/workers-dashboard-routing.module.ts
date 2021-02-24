import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersDashboardComponent } from './workers-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: WorkersDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersDashboardRoutingModule {
}
