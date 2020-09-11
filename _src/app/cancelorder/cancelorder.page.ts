import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OtherService } from '../service/other.service';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.page.html',
  styleUrls: ['./cancelorder.page.scss'],
})
export class CancelorderPage implements OnInit {

	@Input() order:any;
	@ViewChild('text',{static:false}) text:any;
	Qty:number = 0;
	reason:any;

  constructor(private other:OtherService,private apis:ApiService,private model:ModalController) { }

  ngOnInit() {
  	for(let i=0;i<this.order.BuyNowOrderItemDetailsList.length;i++){
  		this.order.BuyNowOrderItemDetailsList[i].checked = false;
  	}
  }

  incordec(val){
  	if(val){
  		this.Qty+=1;
  		return;
  	}
  	this.Qty-=1;
  }

  cancel(){
  	if(!this.Qty){
  		this.other.presentToast('Select atleast one Item to delete !!','dark');
  		return;
  	}else if(!this.reason){
  		this.other.presentToast('Enter the reason for cancelation','dark');
  		this.text.setFocus();
  		return;
  	}
  	let iid;
  	for(let i=0;i<this.order.BuyNowOrderItemDetailsList.length;i++){
  		iid = iid?iid+','+this.order.BuyNowOrderItemDetailsList[i].ID:this.order.BuyNowOrderItemDetailsList[i].ID;
  	}
  	this.apis.cancelOrder(this.order.BuyNowMainOrderList[0].OrderID,iid,this.reason).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		if(res.body.Code === 1000){
	  		this.other.ordercancel();
	  		this.other.presentToast('Order canceled !!','success');
	  		this.model.dismiss();
	  	}
  	})
  }

}
