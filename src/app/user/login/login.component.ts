import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { __await } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true
    this.alertMsg ='Please wait! We are logging you in.'
    this.alertColor = 'blue'
    this.inSubmission = true

   try{
    await this.auth.signInWithEmailAndPassword(
    this.credentials.email, this.credentials.password
    )
   }catch(e) {
    this.inSubmission = false
    this.alertMsg = 'An unexpected error occured. Please try again later.'
    this.alertColor = 'red'
    return
   }

   this.alertMsg = 'You are logged in.'
   this.alertColor = 'green'
  }

}
