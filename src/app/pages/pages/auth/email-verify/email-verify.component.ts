import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vex-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
  animations: [fadeInUp400ms]
})
export class EmailVerifyComponent implements OnInit {
  private sub: any;
  icMail = icMail;
  token;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activeRoute:ActivatedRoute,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.token = params['verifyId']; // (+) converts string 'id' to a number
   });
  }

  send() {

    this.auth.emailVerify(this.token).subscribe((res)=>{
      console.log('resetPassword')
      console.log(res)
      this.auth.openSnackbar('Sucessfully Verfied Account');
    })
   
  }
}
