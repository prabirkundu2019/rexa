import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainwallet',
  templateUrl: './mainwallet.page.html',
  styleUrls: ['./mainwallet.page.scss'],
})
export class MainwalletPage implements OnInit {

	walletDetail:any;

  constructor() { }

  ngOnInit() {
  	let data = JSON.parse(localStorage.getItem('profiledate'));
  	this.walletDetail = {img:data.ImgWallet,amt:data.WalletBalance,name:data.WalletCardName+'('+data.WalletCardNo+')',status:'Active',item:data.PurchaseItemName};
  }

}
