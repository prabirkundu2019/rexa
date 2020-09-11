import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

	txndata:any;
	walletdata={name:'',bal:''};
	CustomerLoginId:"";

  constructor(private apis:ApiService,private other:OtherService,public router:Router) { 
	console.log(localStorage.getItem('userdata'));
	if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined")
	{
		this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
		if (this.CustomerLoginId === undefined){
			this.CustomerLoginId = '';
		}
	}
  }

  ngOnInit() {
  	this.Txnhistory();
  }

  Txnhistory(){
  	this.apis.wallettransaction(this.CustomerLoginId).subscribe(res=>{
  		if(res.body.status === "true"){
  			this.txndata = res.body.transactionhistory;
  		}
  	})
  }
}
