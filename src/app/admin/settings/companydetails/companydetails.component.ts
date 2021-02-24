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
  form: FormGroup;
  selectCtrl: FormControl = new FormControl();
  inputType = 'password';
  visible = false;
  userInfo:any;
  icPhone = icPhone;
  icCamera = icCamera;
  icMenu = icMenu;
  icArrowDropDown = icArrowDropDown;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  constructor(private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService:AuthService,
    ) { }

  ngOnInit() {
    this.authService.setCurrentUser();
    this.userInfo = this.authService.currenctUser;
    this.form = this.fb.group({
      companyName:[this.userInfo.companyName,Validators.required],
      companyAddress: [this.userInfo.companyAddress, Validators.required],
      VATNumber: [this.userInfo.VATNumber, Validators.required],
      companyPhoneNumber: [this.userInfo.companyPhoneNumber, Validators.required],
    });
  }
  onSubmit(){
    const controls = this.form.controls;
    this.userInfo.companyName = controls.companyName.value;
    this.userInfo.companyAddress = controls.companyAddress.value;
    this.userInfo.VATNumber = controls.VATNumber.value;
    this.userInfo.companyPhoneNumber = controls.companyPhoneNumber.value;
    this.authService.setCurrentUserLocal(this.userInfo);
    this.userInfo.hash = null;
    this.authService.updateUser(this.userInfo).subscribe((res)=>{
      this.authService.openSnackbar('Updated Successfully!');
      console.log('===  company detail setting == ')
      console.log(res)
      console.log('================================')
    })
  }
}
