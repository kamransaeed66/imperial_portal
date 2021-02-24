import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditWorkerRoutingModule } from './edit-worker-routing.module';
import { EditWorkerComponent } from './edit-worker.component';
import { SecondaryToolbarModule } from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditWorkerComponent],
  imports: [
    CommonModule,
    EditWorkerRoutingModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    MatTabsModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    MatButtonModule,
    IconModule,
    MatIconModule,
    ContainerModule,
        CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    IconModule,
    MatDividerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSliderModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ]
})
export class EditWorkerModule {
}
