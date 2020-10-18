import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {
  CustomerLoginId = "";
  status = 0;
  referenceCode: "";
  message: "";
	imageForSharing: "";

  constructor(public router:Router, private apis:ApiService,private socialSharing: SocialSharing, private other:OtherService) { 
    if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
    }
    this.makemoney();
  }

  ngOnInit() {    
    this.makemoney();
  }

  ionViewWillEnter(){
    this.makemoney();
  }

  makemoney(){
    this.apis.makeMoney(this.CustomerLoginId)
    .subscribe(res=>{
      this.status = res.body.status;
      this.referenceCode = res.body.udetails.reference_code;
    })
  }

  goToCards(){
    this.router.navigate(['/menu/card-category'],{replaceUrl:true})
  }

  goToWallet(){
    this.router.navigate(['/menu/wallet'],{replaceUrl:true})
  }

  shareviaWhatsapp(){
    this.other.presentLoading();
    var message = "Register with below referral code "+this.referenceCode+" and get cashback upto 100. Install, Register and use the referral code. Click this link http://rexaplanet.com/";
    var options = {
      message: message,
      //files: [this.imageForSharing], // an array of filenames either locally or remotely
      //url: "http://www.rexaplanet.com/",
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      //appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    };
    this.socialSharing.shareWithOptions(options).then(() => {
      this.other.dismissLoading();
    })
    
		//this.socialSharing.shareViaWhatsApp(this.data.product_name,this.activeimage.url,this.data.productlink)
	}
	shareviaFacebook(){
    var message = "Register with below referral code "+this.referenceCode+" and get cashback upto 100. Install, Register and use the referral code. Click this link http://rexaplanet.com/";
		this.socialSharing.shareViaFacebook(message,this.imageForSharing,null)
	}
	shareviaTwitter(){
    var message = "Register with below referral code "+this.referenceCode+" and get cashback upto 100. Install, Register and use the referral code. Click this link http://rexaplanet.com/";
		this.socialSharing.shareViaTwitter(message,this.imageForSharing,null)
	}

}
