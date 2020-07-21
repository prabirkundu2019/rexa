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

	constructor(private apis: ApiService, private other: OtherService, public modal: ModalController, private iab: InAppBrowser, public router: Router) { }

	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('profiledate'));
		this.model.wallet = JSON.parse(localStorage.getItem('profiledate')).WalletCardName;
		this.WalletTopupMaster();
		this.getPaymentMethods();
	}

	WalletTopupMaster() {
		this.apis.WalletTopupMaster(this.userData.WalletCardId).subscribe(res => {
			if (res.body.Code === 1000) {
				this.prices = res.body.Data;
			}
		})
	}

	getPaymentMethods() {
		this.apis.getPaymentMethods().subscribe(res => {
			if (res.body.Code === 1000) {
				this.pmode = res.body.Data;
			}
		})
	}

	setPmode(id) {

	}

	geteamt(id) {
		this.prices.map(data => {
			if (data.Id == id) {
				this.model.eamt = data.AdditionalValue;
				this.model.amt = data.TopupAmount;
			}
		})
	}

	update() {
		let formdata = { "LoginId": this.userData.LoginId, "Amount": this.model.amt, "TopupId": this.model.topupid? this.model.topupid : 0, "TransType": "CR", "GatewayId": 
		746 
		// this.model.spmode
		 };
		this.apis.walletTopup(formdata).subscribe(res => {
			if (res.body.Status === 1000) {
				this.paymentData = res.body.Data;
				var queryString = 'amount=' + this.paymentData.TXN_AMOUNT + '&order_id=' + this.paymentData.ORDER_ID + '&firstname=' + this.userData.CustomerName + '&email=' + this.userData.LoginId + '@gmail.com&phone=' + this.userData.LoginId;
				const browser = this.iab.create(environment.payumoneyPage + '?' + queryString, "_self", {
					location: 'no',
					clearcache: 'yes',
					hardwareback: 'no',
				});
				browser.on('loadstart').subscribe((event) => {
					if (event.url == environment.payumoneySuccessPage) {
						this.paymentSuccess();
						browser.close();
					} else if (event.url == environment.payumoneyFailedPage) {
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

		let formdata = {
			"PAYMENTMODE": "PayUMoney",
			"RESPCODE": "01",
			"STATUS": "success",
			"ORDERID": this.paymentData.ORDER_ID,
			"TXNAMOUNT": this.paymentData.TXN_AMOUNT,
		}

		this.apis.walletTopupPayment(formdata).subscribe(res => {
			if (res.body.Code === 1000) {
				this.other.presentToast("Amount Addded to Wallet Successfully.", 'success');
				this.router.navigate(['/menu/wallet'], { replaceUrl: true });
			} else {
				this.other.presentToast(res.body.Message, 'danger');
			}
		});
	}

	paymentFailure() {

		let formdata = {
			"PAYMENTMODE": "PayUMoney",
			"RESPCODE": "05",
			"STATUS": "fail",
			"ORDERID": this.paymentData.ORDER_ID,
			"TXNAMOUNT": this.paymentData.TXN_AMOUNT,
		}
		this.apis.walletTopupPayment(formdata).subscribe(res => {
			this.other.presentToast("Error In payment !!", 'danger');
		});
	}


}
