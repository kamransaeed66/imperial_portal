import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'vex-client-create-update',
  templateUrl: './client-create-update.component.html',
  styleUrls: ['./client-create-update.component.scss']
})
export class ClientCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  updateType: string;

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  password; password2;
  valid = true;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<ClientCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.defaults) {
      console.log('this.defaults', this.defaults);
      this.mode = 'update';
      this.updateType = this.defaults.updateType;
    } else {
      this.defaults = {} as Client;
    }

    this.form = this.fb.group({
      id: [ClientCreateUpdateComponent.id++],
      // profilePhoto: this.defaults.profilePhoto,
      _id: [this.defaults._id],
      emailAddress: [this.defaults.emailAddress || ''],
      firstName: [this.defaults.firstName || ''],
      lastName: [this.defaults.lastName || ''],
      companyName: this.defaults.companyName || '',
      companyAddress: this.defaults.companyAddress || '',
      companyPhoneNumber: this.defaults.companyPhoneNumber || '',
      emailAddressAccountsTeam: this.defaults.emailAddressAccountsTeam || '',
      VATNumber: this.defaults.VATNumber || '',
      companyRegNumber: this.defaults.companyRegNumber || '',
      position: this.defaults.position || '',
      Password: '',
      password2: '',

      hk_chargerateU25: this.defaults.hk_chargerateU25 || '',
      hk_chargerateO25: this.defaults.hk_chargerateO25 || '',
      fab_chargerateU25: this.defaults.fab_chargerateU25 || '',
      fab_chargerateO25: this.defaults.fab_chargerateO25 || '',
      boh_chargerateU25: this.defaults.boh_chargerateU25 || '',
      boh_chargerateO25: this.defaults.boh_chargerateO25 || '',
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createClient();
    } else if (this.mode === 'update') {
      this.updateClient();
    }
  }

  createClient() {
    const client = this.form.value;

    // if (!client.profilePhoto) {
    //   client.profilePhoto = 'assets/img/avatars/1.jpg';
    // }

    this.dialogRef.close(client);
  }

  updateClient() {
    const client = this.form.value;
    client.id = this.defaults.id;

    this.dialogRef.close(client);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
