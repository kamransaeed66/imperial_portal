import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;
  loading = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private authService: AuthService,
              private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loading = false;
    this.form = this.fb.group({
      emailAddress: ['', Validators.required],
      hash: ['', Validators.required]
    });
  }

   async send() {
    this.loading = true;
    console.log('---- send -----');
    const controls = this.form.controls;

    if (this.form.invalid){
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched());
      return;
    }
    console.log('1');
    this.authService.login(controls.emailAddress.value, controls.hash.value).subscribe(user => {
        if (user){
          const txt = user.accountType;
          localStorage.setItem('loggedIn', txt);
          this.authService.loggedInType = txt;
          this.authService.currenctUser = user;
          localStorage.setItem('userInfo', JSON.stringify(user));
          if (user.accountType === 'Client'){
            this.snackbar.open('Logged in Successfully', 'Cancel', {
              duration: 2000
            });
            this.router.navigate(['/client']);
          }
          else if (user.accountType === 'Worker'){
            console.log('accountType', user.accountType)
              this.authService.getWorkerJob(user._id).subscribe((res2) => {
                this.authService.setCurrentWorkerJobLocal(res2);
                console.log('workerJobInfo',this.authService.workerJobInfo);
                this.snackbar.open('Logged in Successfully', 'Cancel', {
                  duration: 2000
                });
                this.router.navigate(['/worker']);
              });
          }
          else if (user.accountType === 'Admin'){
            this.snackbar.open('Logged in Successfully', 'Cancel', {
              duration: 2000
            });
            this.router.navigate(['/admin']);
          }
          else {
            this.snackbar.open('Logged in Successfully', 'Cancel', {
              duration: 2000
            });
            this.router.navigate(['/team']);
          }
        }else{
          this.loading = false;
          this.snackbar.open('You have to Input Email & Password correctly ', 'Cancel', {
            duration: 3000
          });
          this.form.reset();
        }
      }, (err) => {
        this.loading = false;
        this.snackbar.open('You have to Input Email & Password correctly ', 'Cancel', {
          duration: 3000
        });
        this.form.reset();
      });
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
}
