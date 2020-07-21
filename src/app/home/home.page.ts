import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	model = {email:'',password:""};
	@ViewChild('loginForm',{static:false}) form :any;
	back:any;
	page='';

  	constructor(public navCtrl:NavController,private apis:ApiService,public router: Router, public activatedRoute: ActivatedRoute,private other:OtherService,private platform:Platform,private location:Location) {
  	}

  	ngOnInit() {
    	localStorage.clear();
	   	this.apis.vendoragent().subscribe(res=>{
	    	localStorage.setItem("userdata",JSON.stringify(res.body.Data));
	    });	    
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
	  		this.apis.login(this.model.email,this.model.password).subscribe(res=>{
				console.log(res.body.status);
				if(res.body.status == "true"){
          			localStorage.setItem("userdata",JSON.stringify(res.body.udetails));
	        		this.other.dismissLoading();
	        		//this.location.back();	        		
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
