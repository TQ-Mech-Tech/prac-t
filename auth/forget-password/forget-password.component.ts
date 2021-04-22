import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { interval,Subscription} from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private firstObsSubscription : Subscription
  opttimersec = 45;
  constructor(private _snackBar: MatSnackBar) { }

  checkValideRequest:boolean = true;

  onOTPCheck(form:NgForm){
    {
      this._snackBar.open('OTP Send Successfully ', 'End Now', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
     if(this.checkValideRequest){

      this.firstObsSubscription = interval(1000).subscribe(()=>{
        this.opttimersec--;
        if(this.opttimersec == 0){
          this.destroySub();

        }
        this.checkValideRequest = false;
        if(this.opttimersec == 0){
            this.opttimersec = 45;
            this.checkValideRequest = true;
        }

      })

     } else{
      {
        this._snackBar.open("Can't Send, Please Wait for define time will be completed . . .", 'Ok', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
     }


  }

  destroySub(){
    console.log("destroy subscription called")
    this.firstObsSubscription.unsubscribe();
  }

  forgetpassword:FormGroup;
  ngOnInit(): void {
    this.forgetpassword = new FormGroup({
      email:new FormControl(null, {validators:[Validators.required, Validators.email]}),
      mobile:new FormControl(null, {validators:[Validators.required]})

    });
  }


}
