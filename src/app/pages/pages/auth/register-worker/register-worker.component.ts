import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthService } from 'src/app/services/auth.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
// import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'vex-register-worker',
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.scss'],
  animations: [
    fadeInUp400ms
  ],
})
export class RegisterWorkerComponent implements OnInit {
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;
  form: FormGroup;
  imageUrl: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
fileName: string = "No file selected";
  // qualifications:{
  //   qualificationName: string;
  //   qualificationYear: number;
  // }[] = [];

  // qualificationNames : Array<FormControl> = [];
  // qualificationYears : Array<FormControl> = [];
  inputType = 'password';
  visible = false;
  selectedType = 'Worker';
  selDepartment = '';
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  step = 0;
  birthDateVal:Date = new Date(Date.now());
  currentDrivingVal = false;
  restrictionEmploymentVal = false;
  studentloan1 = false;
  studentloan2 = false;
  studentloan3 = false;
  Postgraduate2 = false;
  Postgraduate1 = false;
  acceptCheckVal = false;
  acceptCheckValTwo = false;
  qualification;
  // @ViewChild("fileUpload", {static:false}) fileUpload:ElementRef; files = [];
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private authService:AuthService,
              private storage:AngularFireStorage,
              // private snackbar: MatSnackBar

  ) {
      // this.qualificationNames = [];
      // this.qualificationYears = [];
      // this.qualificationNames.push(new FormControl(''));
      // this.qualificationYears.push(new FormControl(1900));
   }

  ngOnInit() {
    this.step = 0;
    this.selectedType = 'Worker';
    this.form = this.fb.group({
      department:['',Validators.required],
      forename: ['', Validators.required],
      title: ['', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      hash: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      accountType:['Worker'],
      surename: ['', Validators.required],
      gender:['Male', Validators.required],
      addressLine1:['', Validators.required],
      addressLine2:['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      // country:{ type: String,default:''},
      mobileNumber:['', Validators.required],
      homeNumber:['', Validators.required],
      checkCurrentDriving:[false],
      nationalInsuranceNumber:[''],
      restrictionEmployment:[false],
      restrictionEmploymentDetail:[''],
      dateBirth:[formatDate(this.birthDateVal, 'yyyy-MM-dd', 'en').toString(), [Validators.required]],
      currentDrivingLicense:[''],
      currentDrivingLicenseExpiryDate:[''],
      detailsEndorsements:['', Validators.required],
      bankBranch:['', Validators.required],
      bankName:['', Validators.required],
      accountNameHolder:['', Validators.required],
      bankAccountNumber:['', Validators.required],
      bankBranchSortCode:['', Validators.required],
      buildingSocietyReference:[''],
      nextKinPhoneNumberMobile:[''],
      nextKinPhoneNumberHome:[''],
      nextKinAddress:[''],
      relationship:[''],
      emergencyRelationship:[''],
      employeeStatement:[''],
      studentLoan:[''],
      postgraduateLoan:['false'],
      // qualificationNames:JSON.stringify(this.qualificationNames),
      // qualificationYears:JSON.stringify(this.qualificationYears),
      qualificationName:[''],
      qualificationYear:[''],
      agreementDate:[formatDate(new Date(),'yyyy-MM-dd','en').toString()],
      eSignature:[''],

      employmentHistroyFrom:[''] ,
      employmentHistroyTo:[''],
      employmentHistroyName:[''],
      employmentHistroyAddressEmployer: [''],
      employmentHistroyJobTitle:[''],
      employmentHistroyDuties:[''],
      employmentHistroyRatePay:[''],
      employmentHistroyReasonLeaving:[''],
      employmentHistroyNoticeRequiredCurrentPosition: [''],

      otherEmploymentJobTitle:[''],
      otherEmploymentAddressEmployer:[''],
      otherEmploymentName:[''],

      referenceCompanyName:[''],
      referenceAddress:[''],
      referenceEmail:[''],
      referenceContactPerson:[''],

      criminalRecords:[''],

      doPhysicalMentalImpairment:[false],
      specialArrangementImpairment: [''],
      specialArrangementAttendInterview: [''],
      listAnyDiseases:[''],
      medicineDrugsTreatment: [''],
      allAbsencesWordPast12Month: [''],

      companyName:['', Validators.compose([Validators.required])],
      companyAddress:['', Validators.required],
      companyPhoneNumber:['', Validators.required],
      emailAddressAccountsTeam:['', Validators.required],
      VATNumber:[''],
      companyRegNumber:['', Validators.required],
      phoneNumber:['', Validators.required],
      position:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profilePhoto:['']
    });
  }

  send() {
    const controls = this.form.controls;
    if(this.selectedType == 'Client'){
      if(controls.firstName.value == '' ||controls.lastName.value == '' ||controls.emailAddress.value == '' ||controls.phoneNumber.value == '' ||controls.position.value == '' ||controls.hash.value == '' ||controls.passwordConfirm.value == '')
        {
        alert('Please complete all the required fields');
        return;
      }
      var hash = controls.hash.value
      if(hash.length < 8){
        alert('Please choose a stronger password. Minimum 8 characters.');
        return ;
      }
      if(this.checkPassword(controls.passwordConfirm.value , controls.hash.value) == false)
        {
        alert('Please Input Password & Password Confirm Correctly !');
        
        return ;
        }
        if(this.acceptCheckVal == false){
          alert('Please check accept terms & conditions');
            return;
        }
        if(this.acceptCheckValTwo == false){
          alert('Please check accept Employee Handbook');
                      return;
        }
    }else{
      if(controls.agreementDate.value == '' || controls.eSignature.value == ''){
        alert('Please complete all the required fields');
        return;
      }
      if(this.acceptCheckVal == false){
        alert('Please check accept terms & conditions');
        return;
      }
      if(this.acceptCheckValTwo == false){
        alert('Please check accept Employee Handbook');
                    return;
      }
    }
    console.log('=====================')
    console.log(this.form.value)
    console.log('=====================')
    this.authService.register(this.form.value).subscribe((res)=>{
      console.log('XXXXXXXXXXXXXXXXXXXXXXXX');
      var obj = {
        subject : `New Worker registration is pending`,
        name : '',
        email: 'fujingforward@gmail.com',
        content1: `Worker has recently registered for an account with Imperial Recruitment.`,
        content2: `Please check your admin console to approve the new accounts.`,
        btn:'LOGIN TO PORTAL',
        btn_link:'http://imperial-recruitment.herokuapp.com/#/login',
        link:''
      };
      this.authService.sendEmail(obj).subscribe((sendemail_res)=>{
          console.log('crate job email')
      })
      var obj1 = {
        subject : "Email Verification",
        name : controls.forename.value + ' ' + controls.surename.value,
        email: controls.emailAddress.value,
        content1: `Thanks for registering for an account with Imperial Recruitment.`,
        content2: `Please click the button below to verify your email address.`,
        content3:`If you did not sign up to Imperial Recruitment, please ignore this email and contact us at contact@imperialrecruitment.co.uk to inform us of the mistake.`,
        btn:'VERIFY EMAIL ADDRESS',
        btn_link:'',
        link:''
      };
        this.authService.sendEmail(obj1).subscribe((res)=>{
          console.log('Email Verification')
          console.log(res)
        })
      console.log(res);
      this.form.reset();
      this.router.navigate(['/']);
    })
    this.router.navigate(['/']);
  }

  toggleVisibility() {
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
  changeAccountType(ev){
    this.selectedType = ev.value;
  }
  ChangeStep(i){
    const controls = this.form.controls;
    if(i == 1){
      if(this.selectedType == 'Client'){
        if(this.step == 0){
          if(controls.companyAddress.value == '' || controls.companyName.value == '' || controls.companyPhoneNumber.value == '' || controls.emailAddressAccountsTeam.value == '' || controls.companyRegNumber.value == '')
            {
              alert('Please complete all the required fields');
              return;
            }
        }
      }else{
        if(this.step == 0){
          if(controls.department.value == '' || controls.title.value == '' || controls.forename.value == '' || controls.surename.value == '' || controls.addressLine1.value == '' || controls.addressLine2.value == '' || controls.city.value == '' || controls.postcode.value == '' || controls.mobileNumber.value == '' || controls.homeNumber.value == '')
          {
            alert('Please complete all the required fields');
            // alert(controls.dateBirth.value)
            // alert(formatDate(this.birthDateVal, 'yyyy-MM-dd', 'en').toString())
            return;
          }
        }else if(this.step == 1){
          if((controls.currentDrivingLicenseExpiryDate.value == '') || (this.restrictionEmploymentVal == true && controls.restrictionEmploymentDetail.value == '') ||  controls.bankName.value == '' || controls.bankBranch.value == ''|| controls.detailsEndorsements.value == '')
          {
            alert('Please complete all the required fields');
            return;
          }
        }else if(this.step == 2){
          if(controls.emergencyRelationship.value == '' || controls.relationship.value == '' || controls.nextKinAddress.value == '' || controls.nextKinPhoneNumberMobile.value == '')
            {
              alert('Please complete all the required fields');
              return;
            }
        }else if(this.step == 6){
          
        }else if(this.step == 7){
        }else if(this.step == 8){
       
        }else if (this.step == 9){
          if(controls.criminalRecords.value == ''){
            alert('Please complete all the required fields');
            return;
          }
        }else if(this.step == 10){
          // alert('123')
        }
        else if(this.step == 11){
          // if(controls.specialArrangementAttendInterview.value == '' || controls.specialArrangementImpairment .value == '' || controls.listAnyDiseases.value == '' || controls.medicineDrugsTreatment.value == '' || controls.allAbsencesWordPast12Month.value == '')
          // {
          //   alert('Please complete all the required fields');
          //   return;
          // }
        }else if(this.step ==12){
          if(controls.emailAddress.value == ''){
            alert('Please complete all the required fields');
            return;
          }
          if(this.checkPassword(controls.passwordConfirm.value , controls.hash.value) == false)
          {
          alert('Please Input Password & Password Confirm Correctly !');
          return ;
          }
        }else if(this.step == 13){

        }

      }
    }else{}
    if(this.selectedType == 'Client' && i == 1)
      this.step = 14;
    else if(this.selectedType == 'Client' && i== -1)
      this.step = 0;
    else{
      if(this.step == 12 && i ==1)
        this.step = 14;
      else if(this.step == 14 && i == -1)
        this.step = 12;
      else
        this.step += i;

    }
    
  }
  checkCurrentDriving(ev){
   this.currentDrivingVal = !this.currentDrivingVal;
  //  alert(this.currentDrivingVal)
  }
  checkrestrictionEmployment(ev){
    this.restrictionEmploymentVal = !this.restrictionEmploymentVal;
  }
  checkStudentLoan(ev, i){
    if(i == 1){
      this.studentloan1 = !this.studentloan1;
    }
    if(i == 2){
      this.studentloan2 = !this.studentloan2;
    }
    if(i == 3){
      this.studentloan3 = !this.studentloan3;
    }
  }
  checkPostgraduate(ev, i){
    if(i == 1){
      this.Postgraduate1 = !this.Postgraduate1;
    }
    if(i == 2){
      this.Postgraduate2 = !this.Postgraduate2;
    } 
  }
  addQualifacation(){
    // this.qualificationNames.push(new FormControl(''));
    // this.qualificationYears.push(new FormControl(1900))
  //   this.qualifications.push({qualificationName:'', qualificationYear:2020});
  //   // this.push(this._formBuilder.control(false));
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

  checkPassword(pass, confirmPass){
    if(pass == confirmPass)
      return true;
    return false;
  }
  onUpload() {
    // this.infoMessage = null;
    // this.progress = 0;
    // this.isUploading = true;

    // this.authService.upload(this.file).subscribe(message => {
    //   this.isUploading = false;
    //   this.infoMessage = message;
    // });
    // console.log(this.imageUrl)
    // console.log(this.file)
    var fileName = this.file.name.split('.').slice(0,-1).join('.') + '_' + new Date().getTime();
    var filePath = `Profile/${fileName}`;
    const fileRef = this.storage.ref(filePath);
   console.log('upload-a');
    this.storage.upload(filePath, this.file).snapshotChanges().pipe(finalize(()=>{
      console.log('upload-b');
      fileRef.getDownloadURL().subscribe((url)=>{
        console.log('upload-c');
          this.form.controls.profilePhoto.setValue(url);
            alert('Upload Image Successfully');
            // this.snackbar.open('Upload Image Successfully', 'LOL THANKS', {
            //   duration: 10000
            // });
        })
    })).subscribe();
  }
  checkAccept(ev){
    if(this.acceptCheckVal == false)
      this.acceptCheckVal = true;
    else  
      this.acceptCheckVal = false;
  }
  checkAcceptTwo(ev){
    if(this.acceptCheckValTwo == false)
      this.acceptCheckValTwo = true;
    else  
      this.acceptCheckValTwo = false;
  }
   isControlHasError(controlName: string, validationType: string): boolean
    {	
        const control = this.form.controls[controlName];
        if (!control) {
          return false;
        }
        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }
}
