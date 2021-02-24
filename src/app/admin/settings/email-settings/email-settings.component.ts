import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icCamera from '@iconify/icons-ic/twotone-camera';
import icPhone from '@iconify/icons-ic/twotone-phone';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class EmailSettingsComponent implements OnInit {

  selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;
  form: FormGroup;
  selectedType;
  icPhone = icPhone;
  icCamera = icCamera;
  icMenu = icMenu;
  icArrowDropDown = icArrowDropDown;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  userInfo:any;
  stateCtrl = new FormControl();
  constructor(private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService:AuthService,
    ) { }

  ngOnInit() {
    this.authService.setCurrentUser();
    this.userInfo = this.authService.currenctUser;
    this.selectedType = this.userInfo.Encryption;
    this.form = this.fb.group({
      fromEmailAddress:[this.userInfo.fromEmailAddress,Validators.required],
      SMTPUser: [this.userInfo.SMTPUser, Validators.required],
      SMTPHost: [this.userInfo.SMTPHost, Validators.required],
      SMTPPassword: [this.userInfo.SMTPPassword, Validators.required],
      SMTPPort: [this.userInfo.SMTPPort, Validators.required],
      Encryption: [this.userInfo.Encryption],
    });
  }
  onSubmit(){
    const controls = this.form.controls;
    this.userInfo.fromEmailAddress = controls.fromEmailAddress.value;
    this.userInfo.SMTPUser = controls.SMTPUser.value;
    this.userInfo.SMTPHost = controls.SMTPHost.value;
    this.userInfo.SMTPPassword = controls.SMTPPassword.value;
    this.userInfo.SMTPPort = controls.SMTPPort.value;
    this.userInfo.Encryption = this.selectedType;
    this.authService.setCurrentUserLocal(this.userInfo);
    this.userInfo.hash = null;
    this.authService.updateUser(this.userInfo).subscribe((res)=>{
      this.authService.openSnackbar('Updated Successfully!');
      console.log('===  Email detail setting == ',res);
      console.log('================================')
    })
  }
  changeAccountType(ev){
    this.selectedType = ev.value;
  }
}
