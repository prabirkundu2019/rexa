import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

	cartItems:any;
	totalsaleprice = 0;
	totalmrpprice = 0;
	sameday:any;
	samedayPrice:any = 0;
	CustomerLoginId = "";
	pictureUrl: "";
	pincode: "";

  constructor(private apis:ApiService, private other:OtherService,private alertController:AlertController,public router:Router) {
	if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
    }
  	this.other.getrefresh().subscribe(res=>{
  		if(res.do){
  			this.getCartItems();
  		}
  	})
  }

  ngOnInit() {
  }

  sameDay(){
  	console.log(this.sameday)
  	if(this.sameday){
  		this.samedayPrice = 50;
  		localStorage.setItem('shipping','50');
  	}else{
  		localStorage.setItem('shipping','0');
  		this.samedayPrice = 0;
  	}
  }

  ionViewWillEnter(){
    this.getCartItems();
  }

  getCartItems(){
  	this.apis.getCartItems(this.CustomerLoginId).subscribe(res=>{
		console.log(res.body);
		if(res.body.status != "false")
		{
			this.cartItems = res.body.cartdetails;
			this.totalsaleprice = res.body.totalsum;
			// this.other.isValidToken(res.body.Message);
			this.totalsaleprice = 0;
			this.totalmrpprice = 0;
			for(let i=0;i<this.cartItems.length;i++){
				this.cartItems[i].totalsaleprice = this.cartItems[i].quantity*this.cartItems[i].productdetails.display_price;
				this.cartItems[i].totalmrpprice = this.cartItems[i].quantity*this.cartItems[i].productdetails.mrp_price;
				this.totalsaleprice += this.cartItems[i].totalsaleprice
				this.totalmrpprice += this.cartItems[i].totalmrpprice
			}
		}else{
			this.cartItems = [];
			//this.router.navigate(['/menu/tabs/tab2'],{replaceUrl:true});
		}
  	})
  }

  inc(i){
	this.cartItems[i].quantity ++;
	this.updateCartItem(this.CustomerLoginId,this.cartItems[i].productdetails.id,this.cartItems[i].quantity);
  }

  dec(i){
	this.cartItems[i].quantity --;
	this.updateCartItem(this.CustomerLoginId,this.cartItems[i].productdetails.id,this.cartItems[i].quantity);
  }

  updateCartItem(i,id,qty){
  	this.apis.updateCartItem(this.CustomerLoginId,id,qty).subscribe(res=>{
	  console.group(res.body);
      this.other.isValidToken(res.body.Message);
		if(res.body.status === "true"){
			//this.cartItems[i].loading = false;
			this.getCartItems();
		}
  	})
  }

  async presentEmptyCartAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure you want to empty the cart ??',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.emptyCart();
          }
        }
      ]
    });

    await alert.present();
  }

  emptyCart(){
  	this.apis.emptyCart(this.CustomerLoginId).subscribe(res=>{
		console.log(res.body);	  
		this.other.isValidToken(res.body.Message);
		if(res.body.status === "true"){
			this.other.presentToast('All items deleted !!','success');
			this.cartItems = [];
			this.totalsaleprice = 0;
			this.totalmrpprice = 0;
			this.other.dorefresh();
		}
  	})
  }

  deletesingleItem(cid){
  	this.apis.removeCart(this.CustomerLoginId,cid, 0).subscribe(res=>{
		this.other.isValidToken(res.body.Message);
		if(res.body.userid === this.CustomerLoginId){
			this.other.presentToast('Item deleted !!','success');
			this.other.dorefresh();
		}
  	})
  }

  pincodeCheck(){
    this.apis.pincodeCheck(this.pincode).subscribe(res=>{
      this.other.presentToast(res.body.message,'success');
    })
  }

}
