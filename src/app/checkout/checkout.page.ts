import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router } from '@angular/router';
import { WindowRef } from './winref';
import * as $ from "jquery";
declare var paytm : any;
// import { payumoney } from 'com.payumoney.sdkui.cordova';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

	addresstype:string = "saved";
	spmode:string;
	countries:any;
	states:any;
	cities:any;
	modal = {cntry:"",state:"",city:''};
	pmode:any;
	data:any;
	cartdata:any;
	address:any;
	subtotal:number = 0;
	total:number = 0;
	othercharges:number = 0;
	final:any = [];
	discount:number = 0;
	pricerange:any;
	buyNowData:any;
	walletamt:any;
	walletname:any;
	walletno:any;
	WalletMessage:string;
	WalletAmount:any = 0;
	donateAmount:any = 0;
	safetyAmount:any = 0;
	tipAmount:any = 0;
	isDonation = true;
    isSafetyAmount = true;
    isTipAmount = true;
    tipAmountList: any;
	userData:any;
	couponList:any=[];
	couponData:any;
	couponCode='';
	couponCodeError = false;
	couponCodeSucces = '';
	allowCashOnDelivery = false;
	CustomerLoginId: "";

  constructor(private apis:ApiService, private other:OtherService,public router:Router,private winRef:WindowRef,private iab: InAppBrowser) {
	if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
	}
	//this.address = this.other.getadd();
  }

  ngOnInit() {

  	this.userData = JSON.parse(localStorage.getItem('userdata'));  	
  	this.getcountries();
    this.getdefadd();
    this.getcartdetails();
  	this.getPaymentMethods();
    this.getPriceRange();
    this.getProfileData();
    //this.getCouponList();
  }

 	getProfileData(){
	    this.apis.getProfileData(JSON.parse(localStorage.getItem('userdata')).id).subscribe(res=>{
	      //this.other.isValidToken(res.body.Message);
	      localStorage.setItem('profiledate',JSON.stringify(res.body.Data[0]));
	      localStorage.setItem('image',res.body.Data[0].Img);
	      this.walletamt = JSON.parse(localStorage.getItem('profiledate')).WalletBalance;
	      this.walletname = JSON.parse(localStorage.getItem('profiledate')).WalletCardName;
	      this.walletno = JSON.parse(localStorage.getItem('profiledate')).WalletCardNo;
	      this.donateAmount = JSON.parse(localStorage.getItem('profiledate')).DonationAmount;
	      this.safetyAmount = JSON.parse(localStorage.getItem('profiledate')).SafetyAmount;
	      this.tipAmount = JSON.parse(localStorage.getItem('profiledate')).TipAmount;
	      this.tipAmountList = JSON.parse(localStorage.getItem('profiledate')).TipAmounts.split(',');	      
	      this.calculateCharges();    
	    });
  	}

   	calculateCharges(){
   		this.total = this.subtotal; 
   		if (this.isDonation && this.donateAmount > 0) {      		
      		this.total = this.total + parseFloat(this.donateAmount);  
    	}
    	
    	if (this.isSafetyAmount && this.safetyAmount > 0) {
      		this.total = this.total + parseFloat(this.safetyAmount);      	
    	}

    	if (this.isTipAmount && this.tipAmount > 0) {
      		this.total = this.total + parseFloat(this.tipAmount);
    	}     	
  	}

  	getCouponList(){
  		setTimeout(()=>{			
	  		let formdata = {
			  "CouponId": 0,		  
			  "CartDetails": this.final,		  
			}
		    this.apis.getCouponList(formdata).subscribe(res=>{		      
		      this.couponList = res.body.Data.MainCouponList;
		    });
		},2000);
  		
  	}

  getdefadd(){
	this.apis.getSavedAdd(this.CustomerLoginId).subscribe(res=>{
  		this.address = res.body.shipaddlist[0];  		
  		// if(this.address.AllowCashOnDelivery == '1'){  			
  		// 	this.allowCashOnDelivery = true;
  		// }	
	});	
  }

  amtrestriction(e){
  	if(e.target.value+e.key > this.walletamt || e.target.value+e.key > (this.othercharges+this.total)-this.discount){
  		e.preventDefault();
  	}
  }

  getcartdetails(){
    this.apis.getCartItems(this.CustomerLoginId).subscribe(res=>{
	  console.log(res.body);
      //this.other.isValidToken(res.body.Message);
	  this.cartdata = res.body.cartdetails;
	  this.discount = 0;
	  this.subtotal = res.body.totalsum;
	  this.othercharges = 0;
	  this.WalletAmount = res.body.totalbalance;
	  this.WalletMessage = res.body.walletbalance_message;
    })
  }

  setaddtype(type){
  	this.addresstype = type;
  }

  getcountries(){
  	this.apis.getcountries().subscribe(res=>{
  		this.countries = res.body.Data;
  	})
  }

  getstates(){
  	this.apis.getstates(this.modal.cntry).subscribe(res=>{
  		this.states = res.body.Data;
      for(let i=0;i<this.states.length;i++){
        if(this.states[i].CommonDesc1 == this.data[0].State){
          this.modal.state = this.states[i].Id;
        }
      }
  	})
  }

  getcities(){
  	this.apis.getcities(this.modal.state).subscribe(res=>{
  		this.cities = res.body.Data;
      for(let i=0;i<this.cities.length;i++){
        if(this.cities[i].CommonDesc2 == this.data[0].District){
          this.modal.city = this.cities[i].Id;
        }
      }
  	})
  }

  getPaymentMethods(){
  	this.apis.getPaymentMethods().subscribe(res=>{
  		this.pmode = res.body.pmlist;
  	})
  }

  getadd(pin){
    this.apis.getAddUsingPin(pin.value).subscribe(res=>{
      this.data = res.body[0].PostOffice;
      if(this.data){
        for(let i=0;i<this.countries.length;i++){
          if(this.countries[i].CommonDesc == this.data[0].Country){
            this.modal.cntry = this.countries[i].Id;
          }
        }
      }
    })
  }

  selectCoupon(couponId)
  {
  	let formdata = {
	  "CouponId": couponId,		  
	  "userid": this.CustomerLoginId	  
	}
    this.apis.checkCoupon(formdata).subscribe(res=>{		      
    	console.log(res);
    	this.other.presentToast("Coupon applied Successfully. Discount of "+res.body.Data.MainCouponList[0].CouponAmount+" added to your cart.",'success');
    });
  }

  onCouponCodeChange(){  	
  	this.couponCodeError = false;
  	this.couponCodeSucces = '';
  }

  applyCoupon(){  	
  	this.couponCodeError = false;
  	this.couponCodeSucces = '';
  	if(!this.couponCode){
  		this.other.presentToast("Please Enter Coupon Code !!",'danger');
  	}
  	else{  		
  		let formdata = {
			"couponcode": this.couponCode,		  
			"userid": this.CustomerLoginId	  
		};
  		this.apis.checkCoupon(formdata).subscribe(res=>{	
			console.log(res);
  			if(res.body.status === "true"){    
    			this.couponData = res.body.couponamount;
				this.discount = this.discount + parseFloat(res.body.couponamount);
				this.subtotal =res.body.totalpriceafterdeduction;
    			this.couponCodeSucces ="Coupon applied Successfully. Discount of "+res.body.couponamount+" added to your cart.";
    		}
    		else{
    			this.couponCodeError = true;
    		}

    	});
    }  	
  }

  setPmode(type){
  	this.spmode = type;  	
  }

  buy(){   	
	//this.router.navigate(['/menu/orderhistory/321595161626'],{replaceUrl:true});
	//console.log(this.subtotal, this.WalletAmount);
  	if(this.subtotal <=0 )
  	{
  		this.other.presentToast("Your Cart is Empty!",'danger');
  		return true;	
  	}else if(this.spmode == "4" && this.subtotal > this.WalletAmount){
		this.other.presentToast(this.WalletMessage,'danger');
  		return true;
	}
	
  	if(this.spmode){
		var gatewayAmount = this.othercharges+this.total-this.discount-parseFloat(this.WalletAmount);
		let formdata = {
			userid: this.CustomerLoginId,
			payment_type: this.spmode,
			address_id: 1,
			couponcode: this.couponCode
		} 
		console.log(formdata);
	  	// let formdata1 = {
		//   "IsFromMobile": 1,
		//   "PaymentTypeId": this.spmode,
		//   "BillingAddressId": this.address.Id,
		//   "WalletAmount":parseFloat(this.WalletAmount),
		//   "GatewayAmount":gatewayAmount.toFixed(2),
		//   "SameDayDelivery": this.othercharges?1:0,
		//   "BuyNowDetails": this.final,
		//   "DonationAmount":0,
		//   "SafetyAmount":0,
		//   "TipAmount":0,		 
		//   "Callfrom":'App',
		//   "CashOnDelivery":0
		// }	

		// if (this.isDonation && this.donateAmount > 0) {      		
      	// 	formdata.DonationAmount = parseFloat(this.donateAmount);  
    	// }
    	
    	// if (this.isSafetyAmount && this.safetyAmount > 0) {
      	// 	formdata.SafetyAmount = parseFloat(this.safetyAmount);      	
    	// }

    	// if (this.isTipAmount && this.tipAmount > 0) {
      	// 	formdata.TipAmount = parseFloat(this.tipAmount);
    	// } 
    	// if(this.spmode == 'COD'){
    	// 	formdata.CashOnDelivery = 1;
    	// 	formdata.GatewayAmount = '0';
    	// 	formdata.PaymentTypeId = '0';
		// }		
			
	    this.apis.buy(formdata).subscribe(res=>{    
			console.log(this.spmode);	
			this.buyNowData = res.body;	
			if(this.spmode == "1" || this.spmode == "4"){
				this.router.navigate(['/menu/orderhistory/'+this.buyNowData.orderid],{replaceUrl:true});
	    		this.other.presentToast("Order Placed Successfully !!",'success');
			}else if(this.spmode == "3")
			{
				const browser = this.iab.create(res.body.paymenturl, "_self", {
					location: 'no',
					clearcache: 'yes',
					hardwareback: 'no',
				});
				browser.on('loadstart').subscribe((event) => {		
					if (event.url == res.body.success_paymenturl) {		  		
						this.paymentSuccess(res.body.orderid);
						browser.close();
					} else if (event.url == res.body.failed_paymenturl) {		  		
						this.paymentFailure();
						browser.close();
					}
				});
			}
	    	
			// if(this.buyNowData.ORDER_ID){ 

		    // 	if(this.spmode == '737') // online Payment payumoney
			// 	{		  				  		  		
			// 		var amt =Math.ceil((this.othercharges+this.subtotal)-this.discount);  	
			// 		var queryString ='amount='+amt+'&order_id='+this.buyNowData.ORDER_ID+'&firstname='+this.userData.CustomerName+'&email='+this.userData.ContactNo+'@gmail.com&phone='+this.userData.ContactNo;  	
			// 		const browser = this.iab.create(environment.payumoneyPage+'?'+queryString, "_self", {
			// 			location: 'no',
			// 			clearcache: 'yes',
			// 			hardwareback: 'no',
			// 		});
			// 		browser.on('loadstart').subscribe((event) => {		
			// 		  	if (event.url == environment.payumoneySuccessPage) {		  		
			// 		    	this.paymentSuccess();
			// 		    	browser.close();
			// 		  	} else if (event.url == environment.payumoneyFailedPage) {		  		
			// 		    	this.paymentFailure();
			// 		    	browser.close();
			// 		  	}
			// 		}); 
			//   	}
			//   	else if(this.spmode == 'COD') // Paytm
			//   	{
			//   		this.router.navigate(['/menu/orderhistory/'+this.buyNowData.ORDER_ID],{replaceUrl:true});
	    	// 		this.other.presentToast("Order Placed Successfully !!",'success');
			//   	}	
			//   	else if(this.spmode == '746') // Paytm
			//   	{
			// 	   	setTimeout(()=>{
			// 	    	$('#paytmForm').submit();    		
			// 	    },1000);
			// 	    //localStorage.removeItem('shipping');	    
			//   	}
			// }else{				
			// 	this.other.presentToast(this.buyNowData.Message,'danger');
			// }

	    });
	}
	else
	{
		this.other.presentToast("Please select Your Payment Method !!",'danger');
	}  	
    
  }

  paymentSuccess(ORDER_ID){
	this.router.navigate(['/menu/orderhistory/'+ORDER_ID],{replaceUrl:true});
	this.other.presentToast("Order Placed Successfully !!",'success');

	// let formdata = {  		
  	// 	"PAYMENTMODE":"PayUMoney",
  	// 	"RESPCODE":"01",
	// 	"STATUS": "success",		
	// 	"ORDERID":this.buyNowData.ORDER_ID,		
	// }
		
    // this.apis.buySuccess(formdata).subscribe(res=>{ 
    // 	this.router.navigate(['/menu/orderhistory/'+this.buyNowData.ORDER_ID],{replaceUrl:true});
    // 	this.other.presentToast("Order Placed Successfully !!",'success');
    // });
  }

  paymentFailure(){
	this.other.presentToast("Error In Order Processing Please try again !!",'danger');

  	// let formdata = {  		
  	// 	"PAYMENTMODE":"PayUMoney",
  	// 	"RESPCODE":"05",
	// 	"STATUS": "fail",		
	// 	"ORDERID":this.buyNowData.ORDER_ID,		
	// }		
    // this.apis.buySuccess(formdata).subscribe(res=>{ 
    // 	this.other.presentToast("Error In Order Processing Please try again !!",'danger');
    // });
  }

  getPriceRange(){
    this.apis.getPriceRange().subscribe(res=>{
      //this.other.isValidToken(res.body.Message);
      this.pricerange = res.body.Data;
      for(let i=0;i<this.pricerange.length;i++){
        if(this.subtotal>this.pricerange[i].AmountFrom && this.subtotal<this.pricerange[i].AmountTo){
          this.othercharges = parseInt(localStorage.getItem('shipping'))?parseInt(localStorage.getItem('shipping')):0;
          return;
        }else{
          this.othercharges = 0;
        }
      }
    })
  }

}
