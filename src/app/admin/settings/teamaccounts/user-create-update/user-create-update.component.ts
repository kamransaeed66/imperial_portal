import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  updateType: string;

  icClose = icClose;


  icPerson = icPerson;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  password; password2;
  valid = true;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.defaults) {
      console.log('this.defaults', this.defaults);
      this.mode = 'update';
    } else {
      this.defaults = {} as Client;
    }

    this.form = this.fb.group({
      id: [UserCreateUpdateComponent.id++],
      _id: [this.defaults._id],
      emailAddress: [this.defaults.emailAddress || ''],
      firstName: [this.defaults.firstName || ''],
      lastName: [this.defaults.lastName || ''],
      phoneNumber: this.defaults.phoneNumber || '',
      Password: '',
      password2: ''
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  createUser() {
    const client = this.form.value;

    // if (!client.profilePhoto) {
    //   client.profilePhoto = 'assets/img/avatars/1.jpg';
    // }

    this.dialogRef.close(client);
  }

  updateUser() {
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
