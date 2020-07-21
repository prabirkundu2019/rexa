import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {

	userData:any;
	customerlist: any[];
	searchText: any;

	constructor(private alertCtrl: AlertController,private apis:ApiService, private other:OtherService,public router:Router) {
  	}

  	ngOnInit() {
  		this.userData = JSON.parse(localStorage.getItem('profiledate'));
  		if(!this.userData){
  			this.router.navigate(['/login'],{replaceUrl:true});
  		}  		
  		this.getAllSharedCustomer();
  	}

  	getAllSharedCustomer() {
    	const formdata = {
      		IsAdmin: 0,
      		SearchText: this.searchText ? this.searchText : ''      		
    	};
    	this.apis.getAllSharedCustomer(formdata).subscribe(res=>{    	    		
      		if (res.body.Code === 1000) {
        		this.customerlist = res.body.Data;        		
      		} else {
        		this.customerlist = [];
      		}
      		
    	});
 	}
 	presentPrompt(){
 		let alert = this.alertCtrl.create({
		    header: 'Share',
		    inputs: [
				{
					name: 'mobile',
					placeholder: 'Mobile'
				},
				{
					name: 'email',
					placeholder: 'Email',				
				}
    		],
		    buttons: [
		      /*{
		        text: 'Cancel',
		        role: 'cancel',
		        handler: data => {
		          console.log('Cancel clicked');
		        }
		      },*/
		      {
		        text: 'Share',
		        cssClass: 'alertSuccess',
		        handler: data => {		        	
		          	const formdata = {
				    	ToMobileNo: data.mobile,
				    	ToEmail: data.email
				    };
				    this.apis.shareCustomer(formdata).subscribe(res => {				    	
						if (res.body.Code === 1000) {
							this.other.presentToast("Shared Successfully !!",'success');
						} else {
							this.other.presentToast(res.body.Message,'danger');
						}
				    });
		        }
		      }
		    ]
  		}).then(alert=> alert.present());

 	}

}
