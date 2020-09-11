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
	codCharge:number = 0;
	expressshipcharge:number = 0;
	express:number = 0;
	codHide = true;
	final:number = 0;
	totalsum:number = 0;
	discount:number = 0;
	shippingcharge:number = 0;
	safetycharge:number = 0;
	pricerange:any;
	buyNowData:any;
	walletamt:any;
	walletname:any;
	walletno:any;
	WalletMessage:string;
	WalletAmount:any = 0;
	payableAmount:any = 0;
	donateAmount:any = 0;
	donateTextAmount:any = 0;
	safetyAmount:any = 0;
	tipAmount:any = 0;
	tipTextAmount:any = 0;
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
	expressDeliveryHide = true;
	CustomerLoginId: "";
	marker: '';
	cartcountdata : "";
	walleticondata: "";
	message: "";
	imageForSharing: "";

  constructor(private apis:ApiService, private other:OtherService,public router:Router,private winRef:WindowRef,private iab: InAppBrowser) {
	if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
	}
  }

	ngOnInit() {
		this.other.dorefresh();
		this.userData = JSON.parse(localStorage.getItem('userdata'));  	
		//this.getcountries();
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
	      localStorage.setItem('profiledate',JSON.stringify(res.body.userdata));
	      //localStorage.setItem('image',res.body.Data[0].Img);
	      this.walletamt = 0;
	      this.walletname = 0;
	      this.walletno = 0;
	      this.donateAmount = 0;
	      this.safetyAmount = 0;
	      this.tipAmount = 0;
	      this.tipAmountList = 0;      
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
	  
  ionViewWillEnter(){
	this.apis.getDefaultAdd(this.CustomerLoginId).subscribe(res=>{
		if(res.body.status == "true")
		{
			this.address = res.body.defaultaddress;  
		}	
	});
  }

  getdefadd(){
	// this.other.getadd().subscribe(address => {
	// 	console.log(address);
	// 	this.address = address.add;
	// })
	this.apis.getDefaultAdd(this.CustomerLoginId).subscribe(res=>{
		if(res.body.status == "true")
		{
			this.address = res.body.defaultaddress;  
			this.marker = res.body.marker; 
		}	
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
	  this.cartcountdata = res.body.cartcount;
	  this.cartdata = res.body.cartdetails;
	  this.discount = 0;
	  this.subtotal = res.body.tsum;
	  this.shippingcharge = res.body.shipcharge;
	  this.safetycharge = res.body.safetycharge;
	  this.expressshipcharge = res.body.expressshipcharge;
	  this.final = res.body.totalsum;
	  this.totalsum = res.body.totalsum;
	  this.othercharges = 0;
	  this.codCharge = res.body.cashondelivery_charge;
	  this.WalletAmount = res.body.totalbalance;
	  this.WalletMessage = res.body.walletbalance_message;
	  this.walleticondata = res.body.walleticon;
	  this.payableAmount = res.body.payableamount;
    })
  }

  setaddtype(type){
  	this.addresstype = type;
  }

//   getcountries(){
//   	this.apis.getcountries().subscribe(res=>{
//   		this.countries = res.body.Data;
//   	})
//   }

//   getstates(){
//   	this.apis.getstates(this.modal.cntry).subscribe(res=>{
//   		this.states = res.body.Data;
//       for(let i=0;i<this.states.length;i++){
//         if(this.states[i].CommonDesc1 == this.data[0].State){
//           this.modal.state = this.states[i].Id;
//         }
//       }
//   	})
//   }

//   getcities(){
//   	this.apis.getcities(this.modal.state).subscribe(res=>{
//   		this.cities = res.body.Data;
//       for(let i=0;i<this.cities.length;i++){
//         if(this.cities[i].CommonDesc2 == this.data[0].District){
//           this.modal.city = this.cities[i].Id;
//         }
//       }
//   	})
//   }

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
				this.discount = parseFloat(res.body.couponamount);
				this.subtotal =res.body.totalprice;
    			this.couponCodeSucces ="Coupon applied Successfully. Discount of "+res.body.couponamount+" added to your cart.";
    		}
    		else{
    			this.couponCodeError = true;
    		}

    	});
    }  	
  }

  setPmode(type){
	if(type == 2)
	{
		this.codHide = false;
		this.final = this.totalsum + Number(this.codCharge);
	}else{
		this.codHide = true;
		this.final = this.totalsum;
	}
  	this.spmode = type;  	
  }

  addmoney()
  {
	this.router.navigate(['/menu/topup/add']); 
  }

  buy(){   	
	//this.router.navigate(['/menu/orderhistory/321595161626'],{replaceUrl:true});
	//console.log(this.subtotal, this.WalletAmount);
  	if(this.subtotal <=0 )
  	{
  		this.other.presentToast("Your Cart is Empty!",'danger');
  		return true;	
  	}else if(this.spmode == "1" && this.payableAmount != 0){
		this.other.presentToast(this.WalletMessage,'danger');
  		return true;
	}
	
  	if(this.spmode){
		var gatewayAmount = this.othercharges+this.total-this.discount-parseFloat(this.WalletAmount);
		let formdata = {
			userid: this.CustomerLoginId,
			payment_type: this.spmode,
			address_id: this.address.id,
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
			if(this.spmode == "1" || this.spmode == "2"){
				this.router.navigate(['/menu/orderhistory/'+this.buyNowData.orderid],{replaceUrl:true});
	    		this.other.presentToast("Order Placed Successfully !!",'success');
			}else if(this.spmode == "3" || this.spmode == "4"){
				const browser = this.iab.create(res.body.paymenturl, "_self", {
					location: 'no',
					clearcache: 'yes',
					hardwareback: 'no',
				});
				console.log(browser);
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

  updateExpress(e)
  {
	if(e.target.checked == true)
	{
		this.final = this.final + Number(this.expressshipcharge);
		this.expressDeliveryHide = false;
	}else{
		this.final = this.final - Number(this.expressshipcharge);
		this.expressDeliveryHide = true;
	}
  }

  addDonate(value)
  {
	this.final = this.final - Number(this.donateAmount);
	this.donateAmount = value;
	this.final = this.final + Number(value);
  }

  onDonationChange()
  {
	this.final = this.final - Number(this.donateAmount);
	this.donateAmount = this.donateTextAmount;
	this.final = this.final + Number(this.donateTextAmount);
  }

  addDeliveryTip(value)
  {
	this.final = this.final - Number(this.tipAmount);
	this.tipAmount = value;
	this.final = this.final + Number(value);
  }

  onDeliveryTipChange()
  {
	this.final = this.final - Number(this.tipAmount);
	this.tipAmount = this.tipTextAmount;
	this.final = this.final + Number(this.tipTextAmount);
  }
}
