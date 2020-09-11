import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as $ from 'jquery';

import { environment } from '../../environments/environment';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

	model = { name: "", otp: '', mobile: '', reference_code: '' };
	otpres: boolean = false;
	otpverified: boolean = false;
	back: any;
	WalletCard: any;
	countries: any;
	states: any;
	cities: any;
	Items: any;
	paymentData: any;
	customPopoverOptions: any = {
		header: 'Select'
	};
	defaultWalletCardId = 0;

	constructor(private apis: ApiService, private other: OtherService, public router: Router, public activatedRoute: ActivatedRoute, private platform: Platform, private iab: InAppBrowser) {
	}

	ngOnInit() {
		//this.WalletCardType();
		this.Item();
		this.getcountries();
	}

	// WalletCardType() {
	// 	this.apis.WalletCardType().subscribe(res => {
	// 		if (res.body.Code === 1000) {
	// 			this.WalletCard = res.body.Data;
	// 			var key = this.activatedRoute.snapshot.queryParamMap.get('walletCardId');
	// 			this.model.WalletCardId = parseInt(key);
	// 			this.model.price =  this.WalletCard[0].Amount;
	// 			this.model.extra =  this.WalletCard[0].TopupValue;
	// 		}
	// 	})
	// }

	Item() {
		this.apis.Item().subscribe(res => {
			this.Items = res.body.Data;
		})
	}

	// WalletCardChange(id) {
	// 	this.WalletCard.map(data => {
	// 		if (data.Id == id) {
	// 			this.model.price = data.Amount;
	// 			this.model.extra = data.TopupValue;
	// 			this.model.exp = data.ExpiryDays;
	// 		}
	// 	})
	// }

	// ItemChange(id) {
	// 	this.Items.map(data => {
	// 		if (data.Id == id) {
	// 			this.model.GatewayId = data.GatewayId;
	// 		}
	// 	})
	// }

	getcountries() {
		this.apis.getcountries().subscribe(res => {
			this.countries = res.body.Data;
		})
	}

	getstates(cntry) {
		this.apis.getstates(cntry).subscribe(res => {
			this.states = res.body.Data;
		})
	}

	getcities(state) {
		this.apis.getcities(state).subscribe(res => {
			this.cities = res.body.Data;
		})
	}

	getOtp() {
		this.other.presentLoading().then(res => {
			this.apis.registerOtp(this.model.name, this.model.mobile, this.model.reference_code).subscribe(res => {
				if (res.body.status === "true") {
					this.other.dismissLoading();
					this.other.presentToast('OTP Sent !!', 'success');
					this.otpres = true;
				} else {
					this.other.dismissLoading();
					this.other.presentToast(res.body.Message, 'danger');
				}
			}, err => {
				this.other.dismissLoading();
				this.other.presentToast('Something went wrong !!', 'danger');
			})
		})
	}

	verifyOtp() {
		this.other.presentLoading().then(res => {
			this.apis.registerVerifyOtp(this.model.otp, this.model.mobile).subscribe(res => {
				if (res.body.status === "true") {
					this.other.dismissLoading();
					this.otpverified = true;
					this.router.navigate(['/login'],{replaceUrl:true})
				} else {
					this.other.dismissLoading();
					this.other.presentToast(res.body.Message, 'danger');
				}
			}, err => {
				this.other.dismissLoading();
				this.other.presentToast('Something went wrong !!', 'danger');
			})
		})
	}

	// createuser() {
	// 	// let formdata = {"LoginId":this.model.mobile,"CustomerName":this.model.name,"Password":this.model.password,"OTP":this.model.otp};
	// 	this.other.presentLoading().then(res=>{
	// 		let formdata = { "email": this.model.email, "password": this.model.password, "name": this.model.name };
	// 		this.apis.signup(formdata).subscribe(res => {
	// 			if (res.body.status === "true") {
	// 				this.other.dismissLoading();
	// 				// this.paymentData = res.body.Data;       
	// 				// var queryString = 'amount=' + this.paymentData.TXN_AMOUNT + '&order_id=' + this.paymentData.ORDER_ID + '&firstname=' + this.model.name + '&email=' + this.model.email + '&phone=' + this.model.mobile;
	// 				// const browser = this.iab.create(environment.payumoneyPage + '?' + queryString, "_self", {
	// 				// 	location: 'no',
	// 				// 	clearcache: 'yes',
	// 				// 	hardwareback: 'no',
	// 				// });
	// 				// browser.on('loadstart').subscribe((event) => {
	// 				// 	if (event.url == environment.payumoneySuccessPage) {
	// 				// 		this.paymentSuccess();
	// 				// 		browser.close();
	// 				// 	} else if (event.url == environment.payumoneyFailedPage) {
	// 				// 		this.paymentFailure();
	// 				// 		browser.close();
	// 				// 	}
	// 				// });
	// 				this.router.navigate(['/login'],{replaceUrl:true})
	// 			} else {
	// 				this.other.dismissLoading();
	// 				this.other.presentToast(res.body.message, 'danger');
	// 			}
	// 		}, err => {
	// 			this.other.dismissLoading();
	// 			this.other.presentToast('Something went wrong !!', 'danger');
	// 		});
	// 	});
	// }

	paymentSuccess() {
		let formdata = {
			"PAYMENTMODE": "PayUMoney",
			"RESPCODE": "01",
			"STATUS": "success",
			"ORDERID": this.paymentData.ORDER_ID,
			"CUSTID": this.paymentData.CUST_ID,
			"TXNAMOUNT": this.paymentData.TXN_AMOUNT,
		}

		this.apis.signupPayment(formdata).subscribe(res => {
			this.other.presentToast("Registration Done Successfully. You can Login now.", 'success');
			this.router.navigate(['/login'], { replaceUrl: true });
		});
	}

	paymentFailure() {

		let formdata = {
			"PAYMENTMODE": "PayUMoney",
			"RESPCODE": "05",
			"STATUS": "fail",
			"ORDERID": this.paymentData.ORDER_ID,
			"CUSTID": this.paymentData.CUST_ID,
			"TXNAMOUNT": this.paymentData.TXN_AMOUNT,
		}
		this.apis.signupPayment(formdata).subscribe(res => {
			this.other.presentToast("Error In payment !!", 'danger');
			this.router.navigate(['/login'], { replaceUrl: true });
		});
	}

}
