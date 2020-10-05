import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CancelorderPage } from '../cancelorder/cancelorder.page';
import { OtherService } from '../service/other.service';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.page.html',
  styleUrls: ['./orderhistory.page.scss'],
})
export class OrderhistoryPage implements OnInit {

	order:any;
	discount:number = 0;
  	open:boolean = false;
	total:any;
	cod:number = 0;
	delivery:number = 0;

  	constructor(private apis:ApiService,public router:Router,private modalController:ModalController,private other:OtherService) {
  	}

  	ngOnInit() {
  		let url = this.router.url.split('/');
  		this.orderHistoryItemDetail(url[url.length-1]);
  	}

	orderHistoryItemDetail(id){		
		this.apis.orderHistoryItemDetail(id).subscribe(res=>{
			//this.other.isValidToken(res.body.Message);
			this.order = res.body.olistsingle;
			this.cod = res.body.olistsingle.cod;
			this.delivery = res.body.olistsingle.delivery;
	  		this.total = this.order.total_price;
	  		// if(this.order.BuyNowMainOrderList[0].DonationAmount)
	  		// 	this.total += parseFloat(this.order.BuyNowMainOrderList[0].DonationAmount);	
	  		// if(this.order.BuyNowMainOrderList[0].SafetyAmount)
	  		// 	this.total += parseFloat(this.order.BuyNowMainOrderList[0].SafetyAmount);
	  		// if(this.order.BuyNowMainOrderList[0].TipAmount)
	  		// 	this.total += parseFloat(this.order.BuyNowMainOrderList[0].TipAmount);

	  		// for(let i=0;i<this.order.BuyNowOrderItemDetailsList.length;i++){
	    	// 	if(this.order.BuyNowOrderItemDetailsList[i].Status != 'Cancelled'){
	      	// 		this.open = true;
	      	// 		return;
	    	// 	}
	  		// }	  		
		});
	}

  	replacespace(name){
    	return name.replace(/\s/g,'_');
  	}	

	async cancelOrder(){
	    const modal = await this.modalController.create({
	      component: CancelorderPage,
	      componentProps:{
	        'order':this.order
	      },
	      cssClass:'incdecmodal2'
	    });
	    return await modal.present();
  	}

}
