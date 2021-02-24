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
  selector: 'vex-general-templates',
  templateUrl: './general-templates.component.html',
  styleUrls: ['./general-templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class GeneralTemplatesComponent implements OnInit {

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
  form: FormGroup;
  userInfo:any;
  constructor(private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService:AuthService,
    ) { }

  ngOnInit() {
    this.authService.setCurrentUser();
    this.userInfo = this.authService.currenctUser;
    this.form = this.fb.group({
      workerEmailVerification:[this.userInfo.generalTemplates.workerEmailVerification,Validators.required],
      workerWelcomeEmail: [this.userInfo.generalTemplates.workerWelcomeEmail, Validators.required],
      workerChangeEmailVerificaion: [this.userInfo.generalTemplates.workerChangeEmailVerificaion, Validators.required],
      workerPayslipEmail: [this.userInfo.generalTemplates.workerPayslipEmail, Validators.required],
      workerResetPassword: [this.userInfo.generalTemplates.workerResetPassword, Validators.required],
      workerShiftDetails: [this.userInfo.generalTemplates.workerShiftDetails, Validators.required],
      workerShiftAmended: [this.userInfo.generalTemplates.workerShiftAmended, Validators.required],
      workerShiftCancelled: [this.userInfo.generalTemplates.workerShiftCancelled, Validators.required],
      clientWelcomeEmail: [this.userInfo.generalTemplates.clientWelcomeEmail, Validators.required],
      clientSubAccountInvitationEmail: [this.userInfo.generalTemplates.clientSubAccountInvitationEmail, Validators.required],
      clientNewInvoice: [this.userInfo.generalTemplates.clientNewInvoice, Validators.required],
      clientNewTimesheet: [this.userInfo.generalTemplates.clientNewTimesheet, Validators.required],
      adminPayslipsSent: [this.userInfo.generalTemplates.adminPayslipsSent, Validators.required],
      adminNewJobApplicant: [this.userInfo.generalTemplates.adminNewJobApplicant, Validators.required],
      adminNewClientRegistered: [this.userInfo.generalTemplates.adminNewClientRegistered, Validators.required],
      adminPossibleAWRNotification: [this.userInfo.generalTemplates.adminPossibleAWRNotification, Validators.required],
    });
  }
  onSubmit(){
    const controls = this.form.controls;
    this.userInfo.generalTemplates.workerEmailVerification = controls.workerEmailVerification.value;
    this.userInfo.generalTemplates.workerWelcomeEmail = controls.workerWelcomeEmail.value;
    this.userInfo.generalTemplates.workerChangeEmailVerificaion = controls.workerChangeEmailVerificaion.value;
    this.userInfo.generalTemplates.workerPayslipEmail = controls.workerPayslipEmail.value;
    this.userInfo.generalTemplates.workerResetPassword = controls.workerResetPassword.value;
    this.userInfo.generalTemplates.workerShiftDetails = controls.workerShiftDetails.value;
    this.userInfo.generalTemplates.workerShiftAmended = controls.workerShiftAmended.value;
    this.userInfo.generalTemplates.workerShiftCancelled = controls.workerShiftCancelled.value;
    this.userInfo.generalTemplates.clientWelcomeEmail = controls.clientWelcomeEmail.value;
    this.userInfo.generalTemplates.clientSubAccountInvitationEmail = controls.clientSubAccountInvitationEmail.value;
    this.userInfo.generalTemplates.clientNewInvoice = controls.clientNewInvoice.value;
    this.userInfo.generalTemplates.clientNewTimesheet = controls.clientNewTimesheet.value;
    this.userInfo.generalTemplates.adminPayslipsSent = controls.adminPayslipsSent.value;
    this.userInfo.generalTemplates.adminNewJobApplicant = controls.adminNewJobApplicant.value;
    this.userInfo.generalTemplates.adminNewClientRegistered = controls.adminNewClientRegistered.value;
    this.userInfo.generalTemplates.adminPossibleAWRNotification = controls.adminPossibleAWRNotification.value;
    this.authService.setCurrentUserLocal(this.userInfo);
    this.userInfo.hash = null;
    this.authService.updateUser(this.userInfo).subscribe((res)=>{
      this.authService.openSnackbar('Updated Successfully!');
      console.log('===  generalTemplates detail setting == ')
      console.log(res)
      console.log('================================')
    })
  }
}
