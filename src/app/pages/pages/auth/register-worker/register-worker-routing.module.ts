import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterWorkerComponent } from './register-worker.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterWorkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterWorkerRoutingModule {
}
