import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-milktopup',
  templateUrl: './milktopup.page.html',
  styleUrls: ['./milktopup.page.scss'],
})
export class MilktopupPage implements OnInit {

	model = {brand:'',item:'',qty:0,from:'',to:'',spmode:'',isWallet:false};
	customPopoverOptions: any = {
		header: 'Select'
	};
	brands:any;
	items:any;
	pmode:any;
	Mrp:any;
	walletamt:any;
	walletname:any;
	walletno:any;
	spmode:string;
	WalletAmount:any;
	userData:any;
	paymentData:any;

  	constructor(private apis:ApiService,private other:OtherService,private iab: InAppBrowser,public router:Router) { }

  	ngOnInit() {
  		this.userData = JSON.parse(localStorage.getItem('profiledate'));
	  	this.getBrand();
	  	this.getPaymentMethods();
	  	this.walletamt = JSON.parse(localStorage.getItem('profiledate')).WalletBalance;
	    this.walletname = JSON.parse(localStorage.getItem('profiledate')).WalletCardName;
	    this.walletno = JSON.parse(localStorage.getItem('profiledate')).WalletCardNo;
  	}

  	getBrand(){
  		this.apis.getBrand().subscribe(res=>{
			this.brands = res.body.Data;
  		});
  	}	

  	amtrestriction(e){
  		if(e.target.value+e.key > this.walletamt || e.target.value+e.key > (this.Mrp)){
  			e.preventDefault();
  		}
  	}

  	getPaymentMethods(){
  		this.apis.getPaymentMethods().subscribe(res=>{
  			this.pmode = res.body.Data;
  		});
  	}

  	getItems(id){
  		this.apis.getBrandItems(id).subscribe(res=>{
  			this.items = res.body.Data;
  		});
  	}

  	setPmode(type){
  		this.spmode = type;
  	}

  	getItemRate(id){
  		this.items.ItemRateList.map(res=>{
  			if(res.ItemId == id){
  				this.Mrp = res.MrpRate;
  			}
  		});
  	}  	

  	save(){ 
  		if(!this.model.brand || !this.model.item || !this.model.from || !this.model.to || !this.model.qty || !this.model.spmode){
  			this.other.presentToast('Please Complete the form','danger');
  			return true;
  		}

  		var arr = this.model.from.split('T');
  		this.model.from = arr[0];
  		var arr = this.model.to.split('T');
  		this.model.to = arr[0];
	  	
	  	let formdata = {
	  				"LoginId":this.userData.LoginId,
	  				"Id": 0,
					"Remark": "Test Remark",
					"WalletAmount": 0,
					"WalletId": this.userData.WalletCardId,
					"GatewayAmount": this.Mrp * this.model.qty,
					"GatewayId": this.model.spmode,
					"IsAdmin": 0,
					"IsFromMobile": 1,
					"TopupProductDetails": [
					{
					  "ProductId": this.model.item,
					  "Qty": this.model.qty,
					  "Discount": 0,
					  "CouponId": 0,
					  "FromDate": this.model.from,
					  "ToDate": this.model.to
					}
					]
  				};

  		console.log(formdata);		  			  				  		

	  	this.apis.milkTopup(formdata).subscribe(res=>{
	  		if(res.body.Status === 1000){	               
		        this.paymentData = res.body.Data; 	        
			    var queryString ='amount='+this.paymentData.TXN_AMOUNT+'&order_id='+this.paymentData.ORDER_ID+'&firstname='+this.userData.CustomerName+'&email='+this.userData.LoginId+'@gmail.com&phone='+this.userData.LoginId;  				    			    
				const browser = this.iab.create(environment.payumoneyPage+'?'+queryString, "_self", {
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
	      	}else{       	 	
	        	this.other.presentToast(res.body.Message,'danger');
		    }
	  	});	
  	}

  	paymentSuccess(){
  	
		let formdata = {  		
	  		"PAYMENTMODE":"PayUMoney",  		
			"RESPCODE":"01",
			"STATUS": "success",		
			"ORDERID":this.paymentData.ORDER_ID,						
			"TXNAMOUNT":this.paymentData.TXN_AMOUNT,		
		}
			
	    this.apis.milkTopupPayment(formdata).subscribe(res=>{
	    	if(res.body.Code === 1000){ 
	    		this.other.presentToast("Milk Topup Done Successfully.",'success');
	    		this.router.navigate(['/menu/tabs/tab2'],{replaceUrl:true});
	    	}else{
	    		this.other.presentToast(res.body.Message,'danger');
	    	}    	
	    });
 	}

  	paymentFailure(){

	  	let formdata = {  		
	  		"PAYMENTMODE":"PayUMoney",  		
			"RESPCODE":"05",
			"STATUS": "fail",		
			"ORDERID":this.paymentData.ORDER_ID,				
			"TXNAMOUNT":this.paymentData.TXN_AMOUNT,		
		}	
	    this.apis.milkTopupPayment(formdata).subscribe(res=>{
	    	this.other.presentToast("Error In payment !!",'danger');    	
	    });
  	}

}
