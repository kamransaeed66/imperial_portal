import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanydetailsComponent } from './companydetails.component';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: CompanydetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanydetailsRoutingModule {
}
