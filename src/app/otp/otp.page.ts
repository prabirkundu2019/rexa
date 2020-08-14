import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController, Events } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-otp',
  templateUrl: 'otp.page.html',
  styleUrls: ['otp.page.scss'],
})
export class OtpPage implements OnInit {

	model = {mobile:'',otp:""};
	@ViewChild('loginForm',{static:false}) form :any;
	back:any;
	page='';
	CustomerLoginId: string;

  constructor(public navCtrl:NavController,private apis:ApiService,public router: Router, public activatedRoute: ActivatedRoute,private other:OtherService,private platform:Platform,private location:Location, public events: Events) {
		events.subscribe('otp', (mobile, time) => {
      console.log(mobile);
			// user and time are the same arguments passed in `events.publish(user, time)`
			this.model.mobile = mobile;
		});
		//alert(this.CustomerLoginId);
  }

  ngOnInit() {
    let url = this.router.url.split('/');
    this.model.mobile = url[url.length - 1];    
	}
	  
	ionViewWillEnter(){
		//alert(this.CustomerLoginId);
		if(this.CustomerLoginId != "undefined")
		{
			//this.navCtrl.navigateRoot('/menu/tabs/tab2');
		}
	}

  ionViewDidEnter(){
    var lastTimeBackPress = 0;
    var timePeriodToExit  = 2000;
    this.back = this.platform.backButton.subscribe(() => {
        if(new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          navigator['app'].exitApp();
        }else{
          this.other.presentExitToast();
          lastTimeBackPress = new Date().getTime();
        }
    });
  }

  ionViewWillLeave(){
    this.back.unsubscribe();
	}

  login(){
    this.other.presentLoading().then(res=>{
      this.apis.verifyOtp(this.model.otp, this.model.mobile).subscribe(res=>{
        console.log(res.body);
        if(res.body.status == "true"){
          localStorage.setItem("userdata",JSON.stringify(res.body.udetails));
          this.other.dismissLoading();
          //this.location.back();	
          this.events.publish('user:created', res.body.udetails, Date.now());        		
          this.navCtrl.navigateRoot('/menu/tabs/tab2');					  
        }else{
          this.other.dismissLoading();
          this.other.presentToast(res.body.save_response,'danger');
        }
      },err =>{
        this.other.dismissLoading();
        this.other.presentToast('Something went wrong !!','danger');
      });
    });
  }

}
