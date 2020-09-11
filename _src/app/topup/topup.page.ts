import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
	selector: 'app-topup',
	templateUrl: './topup.page.html',
	styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

	model = { wallet: '', topupid: '', eamt: '', amt: '', spmode: '' };
	prices: any;
	pmode: any;
	customPopoverOptions: any = {
		header: 'Select Topup Amount'
	};
	userData: any;
	paymentData: any;
	CustomerLoginId:"";

	constructor(private apis: ApiService, private other: OtherService, public modal: ModalController, private iab: InAppBrowser, public router: Router) 
	{
		if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined")
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
	}

	ngOnInit() {
		//this.WalletTopupMaster();
	}

	// WalletTopupMaster() {
	// 	this.apis.WalletTopupMaster(this.userData.WalletCardId).subscribe(res => {
	// 		if (res.body.Code === 1000) {
	// 			this.prices = res.body.Data;
	// 		}
	// 	})
	// }

	// setPmode(id) {

	// }

	update() {
		let formdata = { 
			"userid": this.CustomerLoginId, 
			"amount": this.model.amt, 
		// this.model.spmode
		 };
		this.apis.walletTopup(formdata).subscribe(res => {
			if (res.body.status === "true") {
				const browser = this.iab.create(res.body.paymenturl, "_self", {
					location: 'no',
					clearcache: 'yes',
					hardwareback: 'no',
				});
				browser.on('loadstart').subscribe((event) => {		
					if (event.url == res.body.success_paymenturl) {		  		
						this.paymentSuccess();
						browser.close();
					} else if (event.url == res.body.failed_paymenturl) {		  		
						this.paymentFailure();
						browser.close();
					}
				});
			} else {
				this.other.presentToast(res.body.Message, 'danger');
			}
		});

	}

	paymentSuccess() {
		this.router.navigate(['/menu/wallet'],{replaceUrl:true});
		this.other.presentToast("Money is added !!",'success');
	}

	paymentFailure() {
		this.other.presentToast("Error In Payment Processing Please try again !!",'danger');
	}


}
