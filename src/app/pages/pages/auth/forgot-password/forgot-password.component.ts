import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth:AuthService
  ) { }

  ngOnInit() {
  }

  send() {
    const controls = this.form.controls;
    var obj = {
      subject : "Reset your account password",
      name : controls.email.value,
      email: controls.email.value,
      content1: `You have requested to reset your password with us.`,
      content2: `Please follow the instructions below to proceed with resetting your account password.`,
      content3:`If you have received this email in error, please ignore this email and contact the customer service team.`,
      btn:'RESET MY PASSWORD',
      btn_link:'',
      link:''
    };
    if(controls.email.value != ''){
      this.auth.sendEmail(obj).subscribe((res)=>{
        console.log('return send email')
        console.log(res)
        this.auth.openSnackbar('Sucessfully Send Email');
      })
    }
    else
      this.auth.openSnackbar('You have to Input Email');

    this.router.navigate(['/']);
  }
}
