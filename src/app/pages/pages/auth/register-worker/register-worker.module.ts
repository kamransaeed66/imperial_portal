import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterWorkerRoutingModule } from './register-worker-routing.module';
import { RegisterWorkerComponent } from './register-worker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconModule } from '@visurel/iconify-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthformDirective } from './authform.directive';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [RegisterWorkerComponent, AuthformDirective],
  imports: [
    CommonModule,
    RegisterWorkerRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatCardModule,
    MatProgressBarModule,
    IconModule,
    MatNativeDateModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    // MatSnackBarModule,

  ]
})
export class RegisterWorkerModule {
}
