import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerifyComponent } from './email-verify.component';


const routes: Routes = [
  {
    path: '',
    component: EmailVerifyComponent
  },
  {
    path: ':verifyId',
    component: EmailVerifyComponent,
    data: {
      scrollDisabled: true,
      containerEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerifyRoutingModule {
}
