import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rateandreview',
  templateUrl: './rateandreview.page.html',
  styleUrls: ['./rateandreview.page.scss'],
})
export class RateandreviewPage implements OnInit {

	no = 0;
	text:string;
	@Input() data:any;
	@Input() suborder:any
	@Input() order:any

  constructor(private apis:ApiService,private other:OtherService,private model:ModalController) { }

  ngOnInit() {
  	this.getreview();
  }

  getreview(){
  	this.apis.rateAndReview(null,this.data.ItemDetails.ItemId).subscribe(res=>{
  		console.log(res);
  	})
  }

  rate(i,from){
  	this.no = from == 'c'?i:this.no==0?i:this.no+i;
  }

  submit(){
  	if(this.no && this.text){
  		let formdata = {"OrderID": this.order,"SubOrderID": this.suborder,"ItemID": this.data.ItemDetails.ItemId,"Review": this.text,"Stars": this.no}
  		this.apis.rateAndReview(formdata).subscribe(res=>{
  			console.log(res);
  			if(res.body.Code === 1000){
  				this.other.presentToast('Thank you for your review','success');
  				this.model.dismiss();
  			}else{
  				this.other.presentToast('Something went wrong !!','danger');
  			}
  		})
  	}
  }

}
