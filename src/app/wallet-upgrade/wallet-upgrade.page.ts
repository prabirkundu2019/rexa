import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './wallet-upgrade.page.html',
  styleUrls: ['./wallet-upgrade.page.scss'],
})
export class WalletUpgradePage implements OnInit {

	cardlists:any;
	CustomerLoginId = "";

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
  			this.getWalletCards();
  		}
  	})
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getWalletCards();
  }

  getWalletCards(){
  	this.apis.getWalletCards().subscribe(res=>{
		if(res.body.status == "true")
		{
			this.cardlists = res.body.cardlist;
			console.log(this.cardlists);
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

}