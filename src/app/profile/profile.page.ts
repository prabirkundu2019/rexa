import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	name:string;
	no:any;
	orderHis:any = [];
  	cart:boolean = false;
  	cartCount = '';
  	image:any;
    add:any;
    CustomerLoginId: "";

  constructor(private apis:ApiService,private other:OtherService,public router:Router) {
    if(localStorage.getItem('userdata') != "undefined")
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
  	this.other.getcart().subscribe(res=>{
      if(res.do){
        this.cart = localStorage.getItem('cart')=='true'?true:false;
        this.cartCount = localStorage.getItem('cartcount');
      }
    });
    this.other.getUpdateProfile().subscribe(res=>{
      if(res.do){
        this.getProfileData();
      }
    });
  }

  ngOnInit() {
    this.cart = localStorage.getItem('cart')=='true'?true:false;
    this.cartCount = localStorage.getItem('cartcount');
  	this.name = JSON.parse(localStorage.getItem('userdata')).CustomerName;
  	this.no = JSON.parse(localStorage.getItem('userdata')).ContactNo;
  	//this.getOrderHistory();
    this.defaultAdd();
  }

  ionViewWillEnter(){
    this.getProfileData();
  }

  getProfileData(){
    this.apis.getProfileData(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      //this.image = res.body.Data[0].Img;
      localStorage.setItem('userdata',JSON.stringify(res.body.udetails))
      this.name = res.body.udetails.name;
      this.no = res.body.udetails.mobile;
    })
  }

  getOrderHistory(){
  	this.apis.orderHistory(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		for(let i=0;i<res.body.Data.BuyNowMainOrderList.length;i++){
  			let data = {orderno:'',name:'',totalprice:'',date:''};
  			data.orderno = res.body.Data.BuyNowMainOrderList[i].OrderID;
  			data.totalprice = res.body.Data.BuyNowMainOrderList[i].BillAmount;
  			data.date = res.body.Data.BuyNowMainOrderList[i].OnDate;
  			for(let j=0;j<res.body.Data.BuyNowOrderItemDetailsList.length;j++){
  				if(res.body.Data.BuyNowMainOrderList[i].OrderID == res.body.Data.BuyNowOrderItemDetailsList[j].OrderID){
  					data.name = data.name?data.name+', '+res.body.Data.BuyNowOrderItemDetailsList[j].itemname+' X '+res.body.Data.BuyNowOrderItemDetailsList[j].Quantity:res.body.Data.BuyNowOrderItemDetailsList[j].itemname+' X '+res.body.Data.BuyNowOrderItemDetailsList[j].Quantity;
  				}
  				if(res.body.Data.BuyNowOrderItemDetailsList.length - 1 == j){
  					this.orderHis.push(data);
  				}
  			}
  		}
  	})
  }

  defaultAdd(){
    this.apis.getSavedAdd(true).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      this.add = res.body.Data[0];
    })
  }

  logOut(){
    localStorage.removeItem('userdata');
    this.other.presentToast("Logout successfully !!",'success');
    this.router.navigateByUrl('/menu/tabs/tab2');    
  }

}
