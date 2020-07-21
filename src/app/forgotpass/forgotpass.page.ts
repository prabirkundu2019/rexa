import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {

	model = {mobile:'',otp:"",password:''};
	otpres:boolean = false;
  otpverified:boolean = false;
  back:any;

  constructor(private apis:ApiService,private other:OtherService,public router:Router,private platform:Platform) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.platform.backButton.subscribe(() => {
      this.back = this.router.navigate(["/login"],{replaceUrl:true});
    })
  }

  ionViewWillLeave(){
    this.back.unsubscribe();
  }

  getOtp(){
    this.other.presentLoading().then(res=>{
      this.apis.getFrogotOtp(this.model.mobile).subscribe(res=>{
        if(res.body.Code === 1000){
          this.other.dismissLoading();
          this.other.presentToast('OTP Sent !!','success');
          this.otpres = true;
        }else{
          this.other.dismissLoading();
          this.other.presentToast(res.body.Message,'danger');
        }
      },err=>{
        this.other.dismissLoading();
        this.other.presentToast('Something went wrong !!','danger');
      })
    })
  }

  verifyOtp(){
    this.other.presentLoading().then(res=>{
    	this.apis.verifyOtp(this.model.otp,this.model.mobile,2).subscribe(res=>{
        if(res.body.Code === 1000){
          this.other.dismissLoading();
          this.otpverified = true;
        }else{
          this.other.dismissLoading();
          this.other.presentToast(res.body.Message,'danger');
        }
    	},err=>{
        this.other.dismissLoading();
        this.other.presentToast('Something went wrong !!','danger');
      })
    })
  }

  resetpassword(){
    this.other.presentLoading().then(res=>{
      this.apis.resetForgotPassword(this.model).subscribe(res=>{
        if(res.body.Code === 1000){
          this.other.dismissLoading();
          this.other.presentToast('Password changed !!','success');
          this.router.navigate(['/login'],{replaceUrl:true});
        }else{
          this.other.dismissLoading();
          this.other.presentToast(res.body.Message,'danger');
        }
      },err=>{
        this.other.dismissLoading();
        this.other.presentToast('Something went wrong !!','danger');
      })
    })
  }

}
