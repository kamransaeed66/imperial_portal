import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl  } from '@angular/forms';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icCamera from '@iconify/icons-ic/twotone-camera';
import icPhone from '@iconify/icons-ic/twotone-phone';
import { map, startWith, finalize } from 'rxjs/operators';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export interface CountryState {
  name: string;
  population: string;
  flag: string;
}

@Component({
  selector: 'vex-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class CompanydetailsComponent implements OnInit {
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;
  formCompany: FormGroup;
  imageUrl: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";


  selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;

  icPhone = icPhone;
  icCamera = icCamera;
  icMenu = icMenu;
  icArrowDropDown = icArrowDropDown;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  currentParent;
  stateCtrl = new FormControl();
  states: CountryState[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  filteredStates$ = this.stateCtrl.valueChanges.pipe(
    startWith(''),
    map(state => state ? this.filterStates(state) : this.states.slice())
  );
    currentUser:any;
  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService:AuthService,
    private storage:AngularFireStorage,) { }

  ngOnInit() {
    if(!this.authService.currenctUser)
      this.authService.setCurrentUser();
    if(!this.authService.currentParent)
      this.authService.setCurrentParent();
    this.currentUser = this.authService.currenctUser;
    this.currentParent = this.authService.currentParent;
    if(this.currentUser.companyLogo != '')
      this.imageUrl = this.currentUser.companyLogo;
    if(this.currentParent && this.currentParent['companyLogo'] != ''){
      this.imageUrl = this.currentParent['companyLogo'];
      // alert(this.imageUrl)
      console.log('0000')
      console.log(this.imageUrl)
      console.log(this.currentParent)
    }
    console.log('currentUser')
    console.log(this.currentUser)
    console.log(this.currentParent)
    if(this.currentUser['parentId'] == ''){
        this.formCompany = this.fb.group({
      companyLogo:[this.currentUser['companyLogo'] || ''],
      tradingName:[this.currentUser['tradingName'] || ''],
      companyUrl:[this.currentUser['companyUrl'] ||  ''],
      companyName:[this.currentUser['companyName'] || '', Validators.compose([Validators.required])],
      companyAddress:[this.currentUser['companyAddress'] || '', Validators.required],
      companyPhoneNumber:[this.currentUser['companyPhoneNumber'] || '', Validators.required],
      emailAddressAccountsTeam:[this.currentUser['emailAddressAccountsTeam'] || '', Validators.required],
      VATNumber:[this.currentUser['VATNumber'] || ''],
      companyRegNumber:[this.currentUser['companyRegNumber'] || '', Validators.required],
      _id:[this.currentUser['_id']]
    });
    }else{
      this.formCompany = this.fb.group({
        companyLogo:[this.currentParent['companyLogo'] || ''],
        tradingName:[this.currentParent['tradingName'] || ''],
        companyUrl:[this.currentParent['companyUrl'] ||  ''],
        companyName:[this.currentParent['companyName'] || '', Validators.compose([Validators.required])],
        companyAddress:[this.currentParent['companyAddress'] || '', Validators.required],
        companyPhoneNumber:[this.currentParent['companyPhoneNumber'] || '', Validators.required],
        emailAddressAccountsTeam:[this.currentParent['emailAddressAccountsTeam'] || '', Validators.required],
        VATNumber:[this.currentParent['VATNumber'] || ''],
        companyRegNumber:[this.currentParent['companyRegNumber'] || '', Validators.required],
        _id:[this.currentParent['_id']]
      });
      this.formCompany.disable();
    }

  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  filterStates(name: string) {
    return this.states.filter(state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  isControlHasError(controlName: string, validationType: string): boolean
  {
      const control = this.formCompany.controls[controlName];
      if (!control) {
        return false;
      }
      const result = control.hasError(validationType) && (control.dirty || control.touched);
      return result;
  }
  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }
  onUpload() {
    var fileName = this.file.name.split('.').slice(0,-1).join('.') + '_' + new Date().getTime();
    var filePath = `Profile/${fileName}`;
    const fileRef = this.storage.ref(filePath);
   console.log('upload-a');
    this.storage.upload(filePath, this.file).snapshotChanges().pipe(finalize(()=>{
      console.log('upload-b');
      fileRef.getDownloadURL().subscribe((url)=>{
        console.log('upload-c');
          this.formCompany.controls.companyLogo.setValue(url);
          console.log(url);
            alert('Upload Image Successfully');
        })
    })).subscribe();
  }
  update(){
    const controls = this.formCompany.controls;
    if(controls.companyName.value == '' || controls.companyAddress.value == '' || controls.companyPhoneNumber.value == '' || controls.emailAddressAccountsTeam.value == '' || controls.companyRegNumber.value == ''){
      alert('Please complete all the required fields');
      return;
    }
    this.authService.updateUser(this.formCompany.value).subscribe((res)=>{
      console.log('XXXXXXXXXXXXXXXXXXXXXXXX');
      console.log(res);
      this.authService.setCurrentUserLocal(res);
      this.authService.openSnackbar('updated successfully')
      // this.router.navigate(['/']);
    })
  }
}
