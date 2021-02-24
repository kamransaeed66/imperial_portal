import { formatDate } from '@angular/common';

export class Worker {
    _id: string;
    id: number;
    title: string;
    clientStatus: string;
    workerId: string;
    forename: string;
    surename: string;
    department: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    // country:string;default:''},
    mobileNumber: string; // UKONLY
    homeNumber: string;
    emailAddress: string;
    dateBirth: Date;
    nationalInsuranceNumber: string; // Optional
    currentDrivingLicense: string; // YES/NO
    currentDrivingLicenseExpiryDate: string;
    detailsEndorsements: string;
    restrictionEmployment: boolean; // Yes / No
    restrictionEmploymentDetail: string; // above - Yes
    bankName: string;
    bankBranch: string;
    accountNameHolder: string;
    bankAccountNumber: number;
    bankBranchSortCode: number;
    buildingSocietyReference: number; // optional
    // emergencyContactNextKin: {
        relationship: string; // optional
        emergencyRelationship: string;
        nextKinAddress: string;
        nextKinPhoneNumberMobile: string;
        nextKinPhoneNumberHomee: string; // optional
    // };
    employeeStatement: string;
    studentLoan: string;
    postgraduateLoan: boolean;
    // educationHistory: [{
        qualificationName: string;
        qualificationYear: number;
    // }];
    // employmentHistroy: [{
        employmentHistroyFrom: number;
        employmentHistroyTo: number;
        employmentHistroyName: string;
        employmentHistroyAddressEmployer: string;
        employmentHistroyJobTitle: string;
        employmentHistroyDuties: string;
        employmentHistroyRatePay: number;
        employmentHistroyReasonLeaving: string;
        employmentHistroyNoticeRequiredCurrentPosition: string;
    // }];
    // otherEmployment: [{
        otherEmploymentName: string;
        otherEmploymentAddressEmployer: string;
        otherEmploymentJobTitle: string;
    // }];
    // references: [{
        referenceCompanyName: string;
        referenceAddress: string;
        referenceEmail: string;
        referenceContactPerson: string;
    // }];
    criminalRecords: string;
    // healthDetails: {
        doPhysicalMentalImpairment: boolean;
        specialArrangementImpairment: string;
        specialArrangementAttendInterview: string;
        listAnyDiseases: string;
        medicineDrugsTreatment: string;
        allAbsencesWordPast12Month: string;
    // };
    // agreement: {
        agreementDate: string; // non-editable, pre-fille
        eSignature: string;
    // };
    createdDate: Date;
    createdDateStr: string;
    profilePhoto: string;
    Password: string;
    hash: string;
    salt: string;
    accessToken: string;
    refreshToken: string;
    clear(): void{
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
    }
    constructor(worker){
        this.department = worker.department;
        this.clientStatus = worker.clientStatus;
        this._id = worker._id;
        this.id = worker.id;
        this.title = worker.title;
        this.workerId = worker.workerId;
        this.forename = worker.forename;
        this.surename = worker.surename;
        this.gender = worker.gender;
        this.addressLine1 = worker.addressLine1;
        this.addressLine2 = worker.addressLine2;
        this.city = worker.city;
        this.postcode = worker.postcode;
        this.mobileNumber = worker.mobileNumber;
        this.emailAddress = worker.emailAddress;
        this.dateBirth = worker.dateBirth;
        this.createdDate = worker.createdDate;
        // this.createdDateStr = formatDate(new Date(this.createdDate), 'yyyy-MM-dd', 'en').toString();
        this.profilePhoto = worker.profilePhoto;
        this.homeNumber = worker.homeNumber;
        this.nationalInsuranceNumber = worker.nationalInsuranceNumber;
        this.currentDrivingLicense = worker.currentDrivingLicense;
        this.currentDrivingLicenseExpiryDate = worker.currentDrivingLicenseExpiryDate;
        this.detailsEndorsements = worker.detailsEndorsements;
        this.restrictionEmployment = worker.restrictionEmployment;
        this.restrictionEmploymentDetail = worker.restrictionEmploymentDetail;
        this.bankName = worker.bankName;
        this.bankBranch = worker.bankBranch;
        this.accountNameHolder = worker.accountNameHolder;
        this.bankAccountNumber = worker.bankAccountNumber;
        this.bankBranchSortCode = worker.bankBranchSortCode;
        this.buildingSocietyReference = worker.buildingSocietyReference;
        this.doPhysicalMentalImpairment = worker.doPhysicalMentalImpairment;
        this.specialArrangementImpairment = worker.specialArrangementImpairment;
        this.specialArrangementAttendInterview = worker.specialArrangementAttendInterview;
        this.listAnyDiseases = worker.listAnyDiseases;
        this.medicineDrugsTreatment = worker.medicineDrugsTreatment;
        this.allAbsencesWordPast12Month = worker.allAbsencesWordPast12Month;
        this.agreementDate = worker.agreementDate;
        this.eSignature = worker.eSignature;
        this.otherEmploymentName = worker.otherEmploymentName;
        this.otherEmploymentAddressEmployer = worker.otherEmploymentAddressEmployer;
        this.otherEmploymentJobTitle = worker.otherEmploymentJobTitle;
        this.referenceCompanyName = worker.referenceCompanyName;
        this.referenceAddress = worker.referenceAddress;
        this.referenceEmail = worker.referenceEmail;
        this.referenceContactPerson = worker.referenceContactPerson;
        this.relationship = worker.relationship;
        this.emergencyRelationship = worker.emergencyRelationship;
        this.nextKinAddress = worker.nextKinAddress;
        this.nextKinPhoneNumberMobile = worker.nextKinPhoneNumberMobile;
        this.nextKinPhoneNumberHomee = worker.nextKinPhoneNumberHomee;
        this.employeeStatement = worker.employeeStatement;
        this.studentLoan = worker.studentLoan;
        this.postgraduateLoan = worker.postgraduateLoan;
        this.qualificationName = worker.qualificationName;
        this.qualificationYear = worker.qualificationYear;
        this.employmentHistroyFrom = worker.employmentHistroyFrom;
        this.employmentHistroyTo = worker.employmentHistroyTo;
        this.employmentHistroyName = worker.employmentHistroyName;
        this.employmentHistroyAddressEmployer = worker.employmentHistroyAddressEmployer;
        this.employmentHistroyJobTitle = worker.employmentHistroyJobTitle;
        this.employmentHistroyDuties = worker.employmentHistroyDuties;
        this.employmentHistroyRatePay = worker.employmentHistroyRatePay;
        this.employmentHistroyReasonLeaving = worker.employmentHistroyReasonLeaving;
        this.employmentHistroyNoticeRequiredCurrentPosition = worker.employmentHistroyNoticeRequiredCurrentPosition;
    }
    get name() {
        let name = '';

        if (this.surename && this.forename) {
          name = this.forename + ' ' + this.surename;
        } else if (this.forename) {
          name = this.forename;
        } else if (this.surename) {
          name = this.surename;
        }

        return name;
      }
    set name(value) {
    }
}
