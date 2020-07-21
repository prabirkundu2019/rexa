import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

	wishListItems:any;
	totalsaleprice = 0;
	totalmrpprice = 0;
	cart:boolean = false;
  cartCount = '';
  CustomerLoginId = '';

  constructor(private apis:ApiService,private other:OtherService,private alertController:AlertController) {
    if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
    }
  	this.other.getrefresh().subscribe(res=>{
  		if(res.do){
  			this.ngOnInit();
  		}
  	});
  	this.other.getcart().subscribe(res=>{
  		if(res.do){
    		this.cart = localStorage.getItem('cart')=='true'?true:false;
    		this.cartCount = localStorage.getItem('cartcount');
  		}
  	})
  }

  ngOnInit() {
    this.cart = localStorage.getItem('cart')=='true'?true:false;
    this.cartCount = localStorage.getItem('cartcount');
  	this.getWishlistItems();
  }

  getWishlistItems(){
  	this.apis.getWalletCards().subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		this.wishListItems = res.body.Data;
  		this.totalsaleprice = 0;
			this.totalmrpprice = 0;
  		for(let i=0;i<this.wishListItems.length;i++){
  			this.wishListItems[i].totalsaleprice = this.wishListItems[i].Qty*this.wishListItems[i].SaleRate;
  			this.wishListItems[i].totalmrpprice = this.wishListItems[i].Qty*this.wishListItems[i].MrpRate;
  			this.totalsaleprice += this.wishListItems[i].totalsaleprice
  			this.totalmrpprice += this.wishListItems[i].totalmrpprice
  		}
  	})
  }

  async presentEmptyCartAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure you want to empty the wishlist ??',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.emptyWishlist();
          }
        }
      ]
    });

    await alert.present();
  }

  emptyWishlist(){
  	this.apis.emptyCart(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		if(res.body.Code === 1000){
  			this.other.presentToast('All items deleted !!','success');
  			this.wishListItems = [];
  			this.totalsaleprice = 0;
				this.totalmrpprice = 0;
				this.other.dorefresh();
  		}
  	})
  }

  deletesingleItem(id,cid){
  	this.apis.emptyCart(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		if(res.body.Code === 1000){
  			this.other.presentToast('Item deleted !!','success');
				this.other.dorefresh();
  		}
  	})
  }

  moveToCart(id,cid){
    this.apis.emptyCart(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.Code === 1000){
        this.other.presentToast('Item added to cart','success');
        this.other.dorefresh();
      }
    })
  }

  moveAllToCart(){
    this.apis.emptyCart(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.Code === 1000){
        this.other.presentToast('Item added to cart','success');
        this.other.dorefresh();
      }
    })
  }

  inc(i){
  	if(!this.wishListItems[i].loading && this.wishListItems[i].Qty < (this.wishListItems[i].ItemRangeTo == 1?100:this.wishListItems[i].ItemRangeTo)){
  		this.wishListItems[i].loading = true;
  		this.wishListItems[i].Qty ++;
  		this.updateCartItem(i,this.wishListItems[i].Id,this.wishListItems[i].Qty);
  	}
  }

  dec(i){
  	if(!this.wishListItems[i].loading && this.wishListItems[i].Qty > this.wishListItems[i].ItemRangeFrom){
  		this.wishListItems[i].loading = true;
  		this.wishListItems[i].Qty--;  		
  		this.updateCartItem(i,this.wishListItems[i].Id,this.wishListItems[i].Qty);
  	}
  }

  updateCartItem(i,id,qty){
  	this.apis.updateCartItem(id,qty).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		if(res.body.Code === 1000){
  			this.wishListItems[i].loading = false;
  			this.getWishlistItems();
  		}
  	})
  }

}
