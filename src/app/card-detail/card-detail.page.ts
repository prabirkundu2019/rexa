import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { ImageviewerPage } from '../imageviewer/imageviewer.page';
import { OtherService } from '../service/other.service';
import { IncdecPage } from '../incdec/incdec.page';

@Component({
  selector: 'app-cardedetail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

	itemName:string;
	cid='';
	pid='';
	images = [];
	activeimage = {index:0,url:''};
	customPopoverOptions: any = {
    header: 'Select Range'
  };
  data:any=[];
  aboutdata:any=[];
  totalsaleprice = 0;
  cart:boolean = false;
  cartCount = '';
  totalmrpprice = 0;
  refresh:any;
  CustomerLoginId='';

  constructor(public router:Router,private apis:ApiService,private modalController:ModalController,private other:OtherService,private iab: InAppBrowser) {
    if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
	  }
    this.other.getrefresh().subscribe(res=>{
      if(res.do){
        this.refresh = true;
        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
  	let url = this.router.url.split('/');
  	this.pid = url[url.length - 1];
  	this.getCardDetail(this.pid);
  }

  ionViewDidEnter() {
    if(this.refresh){
      let url = this.router.url.split('/');
      this.pid = url[url.length - 1];
      this.getCardDetail(this.pid);
    }
  }

  getCardDetail(id){
  	this.apis.getWalletCardDetails(id).subscribe(res=>{
      this.data = res.body.cardlist;
      console.log(this.data);
  	})
  }

  async presentIncdecModal(data,to) {
    if(data.selected){
      const modal = await this.modalController.create({
        component: IncdecPage,
        cssClass:'incdecmodal',
        componentProps:{
          'data':data,
          'to':to
        }
      });
      return await modal.present();
    }else{
      this.other.presentToast('Please select range !!','danger');
    }
  }

  async zoomImage(){
    this.other.presentLoading();
    const modal = await this.modalController.create({
      component: ImageviewerPage,
      componentProps:{
        'images':this.data.image,
        'index':this.activeimage.index
      }
    });
    return await modal.present();
  }

  buy(){
    let formdata = {"userid":this.CustomerLoginId, "cardid": this.pid};
    this.apis.buycard(formdata).subscribe(res=>{
      console.log(res);
      // if(res.body.status == "true"){
      //   const browser = this.iab.create(res.body.paymenturl, "_self", {
			// 		location: 'no',
			// 		clearcache: 'yes',
			// 		hardwareback: 'no',
			// 	});
			// 	browser.on('loadstart').subscribe((event) => {		
			// 		if (event.url == res.body.success_paymenturl) {		  		
			// 			this.router.navigate(['/menu/profile'],{replaceUrl:true});
	    //       this.other.presentToast("Wallet Upgraded Successfully !!",'success');
			// 			browser.close();
			// 		} else if (event.url == res.body.failed_paymenturl) {		  		
			// 			this.other.presentToast("Error In Order Processing Please try again !!",'danger');
			// 			browser.close();
			// 		}
			// 	});
      // }
    })
  }

  error(){
  }

}