import { Component, OnInit } from '@angular/core';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { formatDate } from '@angular/common';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { finalize } from 'rxjs/operators';
import { Worker } from 'src/app/models/worker.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'vex-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent implements OnInit {
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;
  workerForm: FormGroup;
  imageUrl: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
fileName: string = "No file selected";
  static id = 100;

  mode: 'update';

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;
  editCustomer:Worker;
  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
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
  qualification;
  selectedDepartment;
  selectedStatus;
  defaults;
  constructor(
    private cd: ChangeDetectorRef,
    private storage:AngularFireStorage,
    private router:Router,
    public auth:AuthService,
      private fb: FormBuilder) {}
  ngOnInit() {
    this.step = 0;

    this.editCustomer = JSON.parse(localStorage.getItem('editCustomer'));
    this.selectedDepartment = this.editCustomer.department;
    this.selectedStatus = this.editCustomer.clientStatus;
    this.selectedType = 'Worker';
    this.defaults = this.editCustomer as Worker;
    this.workerForm = this.fb.group({
      id: [0],
      _id:[this.defaults._id],
      createdDate:[this.defaults.createdDate ||  new Date()],
      department:[this.defaults.department || ''],
      clientStatus:[this.defaults.clientStatus || ''],
      forename: [this.defaults.forename || ''],
      title: [this.defaults.title || ''],
      emailAddress: [this.defaults.emailAddress || ''],
      hash: [this.defaults.hash || ''],
      passwordConfirm: [this.defaults.passwordConfirm || ''],
      accountType:['Worker'],
      surename: [this.defaults.surename || ''],
      gender:[this.defaults.gender || 'Male'],
      addressLine1:[this.defaults.addressLine1 || ''],
      addressLine2:[this.defaults.addressLine2 || ''],
      city: [this.defaults.city || ''],
      postcode: [this.defaults.postcode || ''],
      // country:{ type: String,default:''},
      mobileNumber:[this.defaults.mobileNumber ||  ''],
      homeNumber:[this.defaults.homeNumber ||  ''],
      checkCurrentDriving:[this.defaults.checkCurrentDriving || false],
      nationalInsuranceNumber:[this.defaults.nationalInsuranceNumber || ''],
      restrictionEmployment:[this.defaults.restrictionEmployment || false],
      restrictionEmploymentDetail:[this.defaults.restrictionEmploymentDetail || ''],
      dateBirth:[this.defaults.dateBirth|| ''],
      currentDrivingLicense:[this.defaults.currentDrivingLicense || ''],
      currentDrivingLicenseExpiryDate:[this.defaults.currentDrivingLicenseExpiryDate || ''],
      detailsEndorsements:[this.defaults.detailsEndorsements ||  ''],
      bankBranch:[this.defaults.bankBranch ||  ''],
      bankName:[this.defaults.bankName || ''],
      accountNameHolder:[this.defaults.accountNameHolder ||  ''],
      bankAccountNumber:[this.defaults.bankAccountNumber || ''],
      bankBranchSortCode:[this.defaults.bankBranchSortCode || ''],
      buildingSocietyReference:[this.defaults.buildingSocietyReference || ''],
      nextKinPhoneNumberMobile:[this.defaults.nextKinPhoneNumberMobile || ''],
      nextKinPhoneNumberHome:[this.defaults.nextKinPhoneNumberHome || ''],
      nextKinAddress:[this.defaults.nextKinAddress || ''],
      relationship:[this.defaults.relationship || ''],
      emergencyRelationship:[this.defaults.emergencyRelationship || ''],
      employeeStatement:[this.defaults.employeeStatement || ''],
      studentLoan:[this.defaults.studentLoan || ''],
      studentLoan1:[this.defaults.studentLoan1 || false],
      studentLoan2:[this.defaults.studentLoan2 || false],
      studentLoan3:[this.defaults.studentLoan3 || false],
      postgraduateLoan:[this.defaults.postgraduateLoan || false],
      // qualificationNames:JSON.stringify(this.qualificationNames),
      // qualificationYears:JSON.stringify(this.qualificationYears),
      qualificationName:[this.defaults.qualificationName || ''],
      qualificationYear:[this.defaults.qualificationYear || ''],
      agreementDate:[this.defaults.agreementDate || ''],
      eSignature:[this.defaults.eSignature || ''],

      employmentHistroyFrom:[this.defaults.employmentHistroyFrom || ''] ,
      employmentHistroyTo:[this.defaults.employmentHistroyTo || ''],
      employmentHistroyName:[this.defaults.employmentHistroyName || ''],
      employmentHistroyAddressEmployer: [this.defaults.employmentHistroyAddressEmployer || ''],
      employmentHistroyJobTitle:[this.defaults.employmentHistroyJobTitle || ''],
      employmentHistroyDuties:[this.defaults.employmentHistroyDuties || ''],
      employmentHistroyRatePay:[this.defaults.employmentHistroyRatePay || ''],
      employmentHistroyReasonLeaving:[this.defaults.employmentHistroyReasonLeaving || ''],
      employmentHistroyNoticeRequiredCurrentPosition: [this.defaults.employmentHistroyNoticeRequiredCurrentPosition || ''],

      otherEmploymentJobTitle:[this.defaults.otherEmploymentJobTitle || ''],
      otherEmploymentAddressEmployer:[this.defaults.otherEmploymentAddressEmployer || ''],
      otherEmploymentName:[this.defaults.otherEmploymentName || ''],

      referenceCompanyName:[this.defaults.referenceCompanyName || ''],
      referenceAddress:[this.defaults.referenceAddress || ''],
      referenceEmail:[this.defaults.referenceEmail || ''],
      referenceContactPerson:[this.defaults.referenceContactPerson || ''],

      criminalRecords:[this.defaults.criminalRecords || ''],

      doPhysicalMentalImpairment:[this.defaults.doPhysicalMentalImpairment || false],
      specialArrangementImpairment: [this.defaults.specialArrangementImpairment || ''],
      specialArrangementAttendInterview: [this.defaults.specialArrangementAttendInterview || ''],
      listAnyDiseases:[this.defaults.listAnyDiseases || ''],
      medicineDrugsTreatment: [this.defaults.medicineDrugsTreatment || ''],
      allAbsencesWordPast12Month: [this.defaults.allAbsencesWordPast12Month || ''],
      profilePhoto:[this.defaults.profilePhoto || 'assets/img/0.jpg']
    });
  }
  save() {
    console.log('save', this.workerForm.value)
    const customer = this.workerForm.value;
    customer.id = this.defaults.id;
    this.auth.updateUser(this.workerForm.value).subscribe((res =>{
      if(res){
        this.auth.openSnackbar('Updated Successfully!')
        if(localStorage.getItem('loggedIn') === 'Admin')
          this.router.navigate(['/admin/workers']);
        else
          this.router.navigate(['/team/workers']);
      }
      else{
        console.log('res', res)
      }
    }));
  }

  changeDepartment(ev){
    this.selectedDepartment = ev.value;
  }
  changeStatus(ev){
    this.selectedStatus = ev.value;
  }
  send() {
    const controls = this.workerForm.controls;
    if(controls.agreementDate.value == '' || controls.eSignature.value == ''){
      alert('Please complete all the required fields');
      return;
    }
    if(this.acceptCheckVal == false){
      alert('Please check accept terms & conditions');
      return;
    }
    console.log('=====================')
    console.log(this.workerForm.value)
    console.log('=====================')
            this.auth.updateUser(this.workerForm.value).subscribe((res =>{
            this.auth.openSnackbar('Updated Successfully!')
            if(localStorage.getItem('loggedIn') === 'Admin')
              this.router.navigate(['/admin/workers']);
            else
              this.router.navigate(['/team/workers']);
  }))
    // this.authService.register(this.form.value).subscribe((res)=>{
    //   console.log('XXXXXXXXXXXXXXXXXXXXXXXX');
    //   console.log(res);
    //   this.form.reset();
    //   this.router.navigate(['/']);
    // })
    // this.router.navigate(['/']);
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
    const controls = this.workerForm.controls;
    if(i == 1){
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
          if(controls.specialArrangementAttendInterview.value == '' || controls.specialArrangementImpairment .value == '' || controls.listAnyDiseases.value == '' || controls.medicineDrugsTreatment.value == '' || controls.allAbsencesWordPast12Month.value == '')
          {
            alert('Please complete all the required fields');
            return;
          }
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
    }else{}
      // if(this.step == 11)
      //   this.step = 14;
      // else if(this.step == 14 && i == -1)
      //   this.step = 12;
      // else
        this.step += i;
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
          this.workerForm.controls.profilePhoto.setValue(url);
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
  isControlHasError(controlName: string, validationType: string): boolean
  {
      const control = this.workerForm.controls[controlName];
      if (!control) {
        return false;
      }
      const result = control.hasError(validationType) && (control.dirty || control.touched);
      return result;
  }
  cancelBtn(){
    if(localStorage.getItem('loggedIn') === 'Admin')
          this.router.navigate(['/admin/workers']);
        else
          this.router.navigate(['/team/workers']);
  }
}
