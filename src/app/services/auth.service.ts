import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { find } from 'lodash';
import { map, catchError, tap, last } from 'rxjs/operators';
import { Job } from '../client/clients-dashboard/client-job-table/interfaces/job.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../models/invoice.model';
import { Payslip } from '../models/payslip.model';

const USERS_URL = environment.authURL;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public progressSource = new BehaviorSubject<number>(0);
  public loggedInType ;
  currenctUser: User;
  AllUser: User[];
  AllJob: Job[];
  currentScrumboard: any;
  currentJob: any;
  currentParent: User;
  workerJobInfo: any;
  adminInfo: any;
  clientJob: any;
  invoiceInfo: any;
  // public timeSheetData = new BehaviorSubject<any>('');


   constructor(private http: HttpClient,
               private snackBar: MatSnackBar) {

    }

    setCurrentUser(){
      this.currenctUser = JSON.parse(localStorage.getItem('userInfo'));
    }
    setCurrentUserLocal(res){
      localStorage.setItem('userInfo', JSON.stringify(res));
      this.setCurrentUser();
    }
    setAllUser(){
      this.AllUser = JSON.parse(localStorage.getItem('allUserInfo'));
    }
    setAllUsersLocal(res){
      localStorage.setItem('allUserInfo', JSON.stringify(res));
      this.setAllUser();
    }
    setAllJob(){
      this.AllJob = JSON.parse(localStorage.getItem('allJobInfo'));
    }
    setAllJobsLocal(res){
      localStorage.setItem('allJobInfo', JSON.stringify(res));
      this.setAllJob();
    }
    setCurrentScrumboard(){
      this.currentScrumboard = JSON.parse(localStorage.getItem('scrumboardInfo'));
    }
    setCurrentScrumboardLocal(res){
      localStorage.setItem('scrumboardInfo', JSON.stringify(res));
      this.setCurrentScrumboard();
    }

    setCurrentParent(){
      this.currentParent = JSON.parse(localStorage.getItem('parentInfo'));
    }
    setCurrentParentLocal(res){
      localStorage.setItem('parentInfo', JSON.stringify(res));
      this.setCurrentParent();
    }
    setCurrentWorkerJob(){
      this.workerJobInfo = JSON.parse(localStorage.getItem('WorkerJobInfo'));
    }
    setCurrentWorkerJobLocal(res){
      localStorage.setItem('WorkerJobInfo', JSON.stringify(res));
      this.setCurrentWorkerJob();
    }
  login(email: string, password: string): Observable<any>{
    return this.http.post<User>(`${USERS_URL}login`, {emailAddress: email, hash: password}).pipe(
      map((res: User) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      }),
      catchError(err => {
        return null;
      })
    );
  }

  // public uploadProfile(formData){
  //   return this.http.post<any>(USERS_URL, formData, {
  //     reportProgress:true,
  //     observe:'events'
  //   });
  // }
  addJob(user: any, str): Observable<any>{
    user.clientId = str;
    user.accountType = this.currenctUser.accountType;
    if(user.accountType ==='Client')
      user.client = this.currenctUser.firstName +' '+ this.currenctUser.lastName;
    return this.http.post<Job>(`${USERS_URL}job/register`, user).pipe(
      map((res: Job) => {
        return res;
      }),
      catchError(err => {
        return null;
      })
    );
  }
  getExportTimesheets(): Observable<any>{
    return this.http.post<any>(`${USERS_URL}getExportTimesheets`, {});
  }
  getImportPayroll(rows: any, name: String): Observable<any>{
    console.log('rows', rows);
    return this.http.post<any>(`${USERS_URL}getImportPayroll`, {rows:rows, user:name});
  }
  getAllPayroll(): Observable<any>{
    return this.http.post<any>(`${USERS_URL}getAllPayroll`, {});
  }
  getGenerateWorkerID(): Observable<any>{
    return this.http.post<any>(`${USERS_URL}getGenerateWorkerID`, {});
  }
  getUserByToken(): Observable<User>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    if (!userToken){
      return of(null);
    }
    // return this.getAllUsers().pipe(
    //   map((result:User[])=>{
    //     if(result.length <= 0){
    //       return null;
    //     }
    //     const user = find(result, (item:User) =>{
    //       return (item.accessToken === userToken.toString());
    //     });
    //     if(!user){
    //       return null;
    //     }
    //     user.hash = undefined;
    //     return user;
    //   })
    // )
  }
  register(user: any, type = 'other'): Observable<any>{
    if (type !== 'other') {
      user.accountType = type;
    }
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(`${USERS_URL}register`, user).pipe(
      map((res: User) => {
        return res;
      }),
      catchError(err => {
        return null;
      })
    );
  }
  public requestPassword(email: string): Observable<any>{
    return this.http.post(`${USERS_URL}` + 'forgot/' + email, {})
      .pipe(catchError(this.handleError('forgot-password', [])));
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.http
        .post(`${USERS_URL}getAll`, {})
        .toPromise();
      return response as User[];
    } catch (error) {
      await this.handleError(error);
    }
  }
  async getAllUserAuth(): Promise<void>{
    this.AllUser = await this.getAllUsers();
    console.log('AllUser', this.AllUser);
  }
  async getAllJobAuth(){
    this.AllJob = await this.getAllJobs();
    console.log('AllJob', this.AllJob);
  }
  async getAllJobs(): Promise<Job[]>{
    return await this.http.post<Job[]>(`${USERS_URL}job/getAllJob`, {}).toPromise();
  }
  getAllJobsSync(): Observable<Job[]>{
    return  this.http.post<Job[]>(`${USERS_URL}job/getAllJob`, {});
  }
  async getCurrentJob(id): Promise<Job[]>{
    return  this.http.post<Job[]>(`${USERS_URL}job/current`, {id: id}).toPromise();
  }
  getParent(id): Observable<User>{
    return this.http.post<User>(`${USERS_URL}getParent`, {_id: id});
  }
  getWorkerJob(id): Observable<Job[]>{
    return this.http.post<Job[]>(`${USERS_URL}getWorkerJob`, {_id: id});

  }
  private handleError<T>(operation = 'operation', result?: any){
    return (error: any): Observable<any> => {
      console.error(error);
      return of(result);
    };
  }
  getTypeJobs(): Observable<Job[]>{
    return this.http.post<Job[]>(`${USERS_URL}job/getAllType`, {});
  }
  getPaySlips(id): Observable<Payslip[]>{
    return this.http.post<Payslip[]>(`${USERS_URL}job/getPayslips`, {_id: id});
  }
  getAllTimesheets(): Observable<Job[]>{
    return this.http.post<Job[]>(`${USERS_URL}getAllTimesheets`, {});
  }

  getInvoiceInfo(): Observable<any[]>{
    return this.http.get<any[]>(`${USERS_URL}invoiceInfo`);
  }

  getClientTimesheets(): Observable<Job[]>{
    const id = JSON.parse(localStorage.getItem('userInfo'))._id;
    return this.http.post<Job[]>(`${USERS_URL}getClientTimesheets`, {id});
  }
  getClientInvoices(): Observable<Invoice[]>{
    const id = JSON.parse(localStorage.getItem('userInfo'))._id;
    console.log('getAllInvoices', id);
    return this.http.post<Invoice[]>(`${USERS_URL}getClientInvoices`, {id});
  }
  getAllInvoices(): Observable<Invoice[]>{
    return this.http.post<Invoice[]>(`${USERS_URL}getAllInvoices`, {});
  }
  getSelectedJobs(): Observable<Job[]>{
    const id = JSON.parse(localStorage.getItem('userInfo'))._id;
    return this.http.post<Job[]>(`${USERS_URL}job/getAll`, {id});
  }
  getTypeUsers(type): Observable<User[]>{
    return this.http.post<User[]>(`${USERS_URL}getAllType`, {accountType: type});
  }
  getTimesheets(type): Observable<any[]>{
    let id = this.currenctUser._id;
    let userType = this.currenctUser.accountType;
    return this.http.post<any[]>(`${USERS_URL}getFindTimesheets`, {status: type, id: id, userType: userType});
  }
  getTypeSubUsers(id): Observable<User[]>{
    return this.http.post<User[]>(`${USERS_URL}getAllSubType`, {clientId: id});
  }

  async getAuthClientJob(){
    console.log('currenctUser', this.currenctUser);
    this.clientJob = await this.getClientJob(this.currenctUser._id);
    console.log('clientJob', this.clientJob);
  }

  async getClientJob(id): Promise<Job[]>{
    return await this.http.post<Job[]>(`${USERS_URL}getClientJob`, {_id: id}).toPromise();
  }

  getClientJobSync(id): Observable<Job[]>{
    return  this.http.post<Job[]>(`${USERS_URL}getClientJob`, {_id: id});
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const req = new HttpRequest(
      'POST',
      'http://localhost:5000/upload',
      formData,
      {
        reportProgress: true
      }
    );

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === 'number') {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
  updateUser(_user: any): Observable<any> {
    console.log('... auth update user ..', _user);
    console.log('----------------');
    return this.http.post(`${USERS_URL}profile`, _user);
  }

  // async getInvoiceInfo(): Promise<void>{
  //   this.invoiceInfo = await this.getInvoiceInfoSync();
  //   console.log('invoiceInfo', this.invoiceInfo);
  // }

  // async getInvoiceInfoSync(): Promise<any[]> {
  //   try {
  //     const response = await this.http
  //       .get(`${USERS_URL}invoiceInfo`, {})
  //       .toPromise();
  //     return response as any[];
  //   } catch (error) {
  //     await this.handleError(error);
  //   }
  // }

  updateInvoicsInfo(_info: any): Observable<any> {
    console.log('... auth update invoice info ..', _info);
    console.log('----------------');
    return this.http.post(`${USERS_URL}updateInvoicsInfo`, _info);
  }
  updateClientStatus(_user: any, status): Observable<any> {
    console.log('... status ..', status);
    _user.clientStatus = status;
    console.log('... auth updateClientStatus ..', _user);
    console.log('----------------');
    return this.http.post(`${USERS_URL}updateClientStatus`, _user);
  }
  updateJob(_job: any): Observable<any> {
        console.log('... auth update job ..', _job);
        console.log('----------------');
        return this.http.post(`${USERS_URL}updatejob`, _job);
  }
  openSnackbar(str) {
    this.snackBar.open(str, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
  // setWorkerJob(id, tId, wId, img, name, flag): Observable<any> {
  //   return this.http.post<any>(`${USERS_URL}addWorkerJob`, {id, tId, wId, img, name, flag});
  // }
  setStatusJob(id, status): Observable<any>{
    return this.http.post<any>(`${USERS_URL}setStatusJob`, {id, status});
  }
  setTimesheetDraft(id, workers): Observable<any>{
    return this.http.post<any>(`${USERS_URL}setTimesheetDraft`, {id, workers});
  }
  updateTimesheet(id, workers, status): Observable<any>{
    return this.http.post<any>(`${USERS_URL}updateTimesheet`, {id, workers,status});
  }
  setJobWorkers(job_id, shiftId, workers): Observable<any>{
    console.log('workers', workers)
    const data = {
      job_id: job_id,
      shiftId: shiftId,
      workers: workers
    }
    return this.http.post<any>(`${USERS_URL}setJobWorkers`, {data});

  }
  deleteUser(obj: any, type): Observable<any>{
    console.log('removeUser', obj);
    obj.accountType = type;
    return this.http.post<any>(`${USERS_URL}removeUser`, obj);
  }
  deleteJob(obj: any): Observable<any>{
    return this.http.post<any>(`${USERS_URL}removeJob`, obj);
  }
  updateStatus(obj, str): Observable<any>{
    return this.http.post<any>(`${USERS_URL}updateStatus`, {id: obj.id, str});
  }
  sendMsg(obj): Observable<any>{
    return this.http.post<any>(`${USERS_URL}sendmsg`, obj);
  }
  addInvoice(obj): Observable<any>{
    return this.http.post<any>(`${USERS_URL}invoiceregister`, obj);
  }
  updateInvoice(obj): Observable<any>{
    return this.http.post<any>(`${USERS_URL}invoice/profile`, obj);
  }
  // removeTimesheetsJob(obj): Observable<any>{
  //   return this.http.post<any>(`${USERS_URL}removeTimesheetsJob`, {arr: obj});
  // }
  sendEmail(obj): Observable<any>{
    return this.http.post<any>(`${USERS_URL}client/verify/email`, obj);
  }
  sendShiftEmail(workers, data, old_Data): Observable<any>{
    return this.http.post<any>(`${USERS_URL}client/shiftDetail/email`, {workers:workers, data: data, old_Data: old_Data});
  }
  resetPassword(obj): Observable<any>{
    return this.http.post<any>(`${USERS_URL}resetpassword`, obj);
  }
  emailVerify(token): Observable<any>{
    return this.http.post<any>(`${USERS_URL}setVerify`, token);
  }
}
