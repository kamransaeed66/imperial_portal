import { Component, OnInit } from '@angular/core';
import { Link } from '../../../../@vex/interfaces/link.interface';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { User } from 'src/app/models/user.model';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {
  personName;
  photo;
  userInfo:User;
  links: Link[] = [
    {
      label: 'ABOUT',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    // {
    //   label: 'TIMELINE',
    //   route: './timeline'
    // },
    // {
    //   label: 'FRIENDS',
    //   route: '',
    //   disabled: true
    // },
    // {
    //   label: 'PHOTOS',
    //   route: '',
    //   disabled: true
    // }
  ];

  constructor() {

  }

  ngOnInit() {
    console.log('----------   social  -----------')

    this.userInfo =  JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo)
    var userType = localStorage.getItem('loggedIn');
    console.log(userType)
    if(userType == 'Client' || userType == 'Team'){
      this.photo ='assets/img/0.jpg';
      this.personName = this.userInfo['firstName'] + ' '+ this.userInfo['lastName'];
    }else if(userType == 'Worker'){
      this.personName = this.userInfo['forename'] + ' '+ this.userInfo['surename'];
      this.photo = this.userInfo['profilePhoto'];
    }else{
      this.personName = "Admin";
      this.photo ='assets/img/0.jpg';
    }
  }
}
