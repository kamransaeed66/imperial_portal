import { Component, OnInit } from '@angular/core';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';


@UntilDestroy()
@Component({
  selector: 'vex-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrls: ['./invoice-settings.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class InvoiceSettingsComponent implements OnInit {
  fileName: string = "No file selected";
  imageUrl: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  ref:AngularFireStorageReference;
  file: File;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  form: FormGroup;
  isUploading: boolean = false;
  defaults:any;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private storage:AngularFireStorage) {

  }

  getData() {
    this.defaults = this.authService.getInvoiceInfo().pipe(
      tap(info => info ? this.form.patchValue(info) : '')
    );
    console.log('this.defaults', this.defaults)
    if(this.fileName === 'No file selected'){
      this.isUploading = true;
    }
  }

  ngOnInit(){
    this.getData();
    this.form = this.fb.group({
      dueDate:'',
      vat: '',
      payrateU25:'',
      payrateO25: '',
      hk_chargerateU25:'',
      hk_chargerateO25: '',
      fab_chargerateU25:'',
      fab_chargerateO25: '',
      boh_chargerateU25:'',
      boh_chargerateO25: '',
      footer: '',
      logo: '',
    });
  }

  onSubmit(){
    const controls = this.form.value;
    console.log('submit', controls);
    this.authService.updateInvoicsInfo(controls).subscribe((res)=>{
      this.authService.openSnackbar('Updated Successfully!');
      console.log('===  invoice setting == ', res)
      console.log('================================')
    })
  }

  onChange(file: File){
    if (file) {
      this.fileName = file.name;
      this.file = file;
      this.isUploading = false;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  onUpload() {
    this.isUploading = true;
    var fileName = this.file.name.split('.').slice(0,-1).join('.') + '_' + new Date().getTime();
    var filePath = `Profile/${fileName}`;
    const fileRef = this.storage.ref(filePath);
   console.log('upload-a');
    this.storage.upload(filePath, this.file).snapshotChanges().pipe(finalize(()=>{
      console.log('upload-b');
      fileRef.getDownloadURL().subscribe((url)=>{
        console.log('upload-c');
          this.form.controls.logo.setValue(url);
            this.authService.openSnackbar('Image Uploaded Successfully!');
            this.isUploading = false;
        })
    })).subscribe();
  }


}
