export class User {
    _id: string;
    id:number;
    workerId:string;
    accountType: string;
    title: string;
    forename: string;
    surename: string;
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
    createdDate:Date;
    nationalInsuranceNumber: string; //Optional
    currentDrivingLicense: string; // YES/NO
    currentDrivingLicenseExpiryDate: string;
    detailsEndorsements: string;
    restrictionEmployment: boolean; //Yes / No
    restrictionEmploymentDetail: string; // above - Yes
    bankName: string;
    bankBranch: string;
    accountNameHolder: string;
    bankAccountNumber: number;
    bankBranchSortCode: number;
    buildingSocietyReference: number; //optional
    // emergencyContactNextKin: {
        relationship: string; //optional
        emergencyRelationship:string;
          nextKinAddress: string;
        nextKinPhoneNumberMobile: string;
        nextKinPhoneNumberHomee: string; //optional
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
        agreementDate: string; //non-editable, pre-fille
        eSignature: string; 
    // };
   
    profilePhoto: string;
    Password: string;
    phoneNumber:string;
    companyName: string;
    companyAddress: string;
    companyPhoneNumber: string;
    emailAddressAccountsTeam: string;
    VATNumber: string; //optional
    companyRegNumber: string;
    position: string;
    firstName: string;
    lastName: string;
    // subaccount
    // subaccount: [{
    //     subId: Sub;
    // }];
    hash: string;
    salt: string;
    accessToken:string;
    refreshToken:string;

    companyLogo:string;
    clientType:string;
    parentId:string;
    clientStatus:string;
    companyUrl:string;// optional
    tradingName:string;//optional
 
    clear():void{
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
    }
}