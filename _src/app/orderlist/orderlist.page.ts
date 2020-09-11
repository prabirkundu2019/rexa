import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {

	orderHis:any = [];
	CustomerLoginId = "";
  	
  	constructor(private apis:ApiService,private other:OtherService) {
		if(localStorage.getItem('userdata') != "undefined")
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
	}

  	ngOnInit() {
  		this.getOrderHistory();
  	}


  	getOrderHistory(){
	  	this.apis.orderHistory(this.CustomerLoginId).subscribe(res=>{
			this.orderHis = res.body.orderlist;
	    	this.other.isValidToken(res.body.Message);
			// for(let i=0;i<res.body.Data.BuyNowMainOrderList.length;i++){
			// 	let data = {orderno:'',name:'',totalprice:'',date:''};
			// 	data.orderno = res.body.Data.BuyNowMainOrderList[i].OrderID;
			// 	data.totalprice = res.body.Data.BuyNowMainOrderList[i].BillAmount;
			// 	data.date = res.body.Data.BuyNowMainOrderList[i].OnDate;
			// 	for(let j=0;j<res.body.Data.BuyNowOrderItemDetailsList.length;j++){
			// 		if(res.body.Data.BuyNowMainOrderList[i].OrderID == res.body.Data.BuyNowOrderItemDetailsList[j].OrderID){
			// 			data.name = data.name?data.name+', '+res.body.Data.BuyNowOrderItemDetailsList[j].itemname+' X '+res.body.Data.BuyNowOrderItemDetailsList[j].Quantity:res.body.Data.BuyNowOrderItemDetailsList[j].itemname+' X '+res.body.Data.BuyNowOrderItemDetailsList[j].Quantity;
			// 		}
			// 		if(res.body.Data.BuyNowOrderItemDetailsList.length - 1 == j){
			// 			this.orderHis.push(data);
			// 		}
			// 	}
			// }
	  	});
  	}
}
