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
  	console.log(this.order)
  }

  incordec(val){
  	if(val){
  		this.Qty+=1;
  		return;
  	}
  	this.Qty-=1;
  }

  cancel(){
  	// if(!this.Qty){
  	// 	this.other.presentToast('Select atleast one Item to delete !!','dark');
  	// 	return;
  	// }else if(!this.reason){
  	// 	this.other.presentToast('Enter the reason for cancelation','dark');
  	// 	this.text.setFocus();
  	// 	return;
  	// }
  	let iid;
  	this.apis.cancelOrder(this.order.id).subscribe(res=>{
		if(res.status === "true"){
			this.other.presentToast('Order canceled !!','success');
			this.model.dismiss();
	  	}
  		
  	})
  }

}
