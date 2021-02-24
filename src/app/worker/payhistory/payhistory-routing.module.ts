import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayhistoryComponent } from './payhistory.component';


const routes: Routes = [
  {
    path: '',
    component: PayhistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayhistoryRoutingModule {
}
