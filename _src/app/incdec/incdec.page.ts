import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-incdec',
  templateUrl: './incdec.page.html',
  styleUrls: ['./incdec.page.scss'],
})
export class IncdecPage implements OnInit {

	@Input() data:any;
	@Input() to:any;

  constructor(private apis:ApiService,private modal:ModalController,private other:OtherService) { }

  ngOnInit() {
  	this.data.total = this.data.selected.SaleRate*this.data.selected.RangeFrom;
  }

  inc(input){
  	if(input.value < parseInt(input.max)){
  		input.value++;
  		this.data.total = this.data.total+this.data.selected.SaleRate;
  	}
  }

  dec(input){
  	if(input.value > parseInt(input.min)){
  		input.value--;  		
  		this.data.total = this.data.total-this.data.selected.SaleRate;
  	}
  }

  addToCart(input){
    this.other.presentLoading().then(m=>{
      if(this.to == 'cart'){
        this.apis.addToCart(0,this.data,input.value).subscribe(res=>{
          this.other.dismissLoading();
          this.other.isValidToken(res.body.Message);
          if(res.body.Code == 1000){
            this.modal.dismiss();
            this.other.presentToast('Item add to cart','success');
            this.other.dorefresh();
          }else{
          	this.modal.dismiss();
          	this.other.presentToast(res.body.Message,'danger');
          }
        },err=>{
          this.other.presentToast('Something went wrong','danger');
          this.other.dismissLoading();
        });
      }else{
        this.apis.addToWishlist(this.data,input.value).subscribe(res=>{
          this.other.dismissLoading();
          this.other.isValidToken(res.body.Message);
          if(res.body.Code == 1000){
            this.modal.dismiss();
            this.other.presentToast('Item add to wishlist','success');
            this.other.dorefresh();
          }else{
          	this.modal.dismiss();
          	this.other.presentToast(res.body.Message,'danger');
          }
        },err=>{
          this.other.presentToast('Something went wrong','danger');
          this.other.dismissLoading();
        });
      }  
    })
  }

}
