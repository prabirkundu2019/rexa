import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { OtherService } from '../service/other.service';
import { IncdecPage } from '../incdec/incdec.page';
import { Platform, NavController } from '@ionic/angular';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})
export class SellerPage implements OnInit {

	catName:any;
  id:any;
  subcatid: any;
	items:any;
	customPopoverOptions: any = {
    	header: 'Select Quantity'
 	};
	expfilter:boolean=false;
	ItemRateListMinMax:any;
	filter:any;
	order:any;
	cart:boolean = false;
	cartCount = '';
	filterapplied:any;
	CustomerLoginId='';
	selectedOption=0;

	constructor(public navCtrl:NavController,private other:OtherService,public router:Router,private apis:ApiService,private modalController:ModalController) {
    if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
    }
		this.other.getrefresh().subscribe(res=>{
	  		if(res.do){
	    		this.getItems();
	  		}	
		});

		this.other.getFilter().subscribe(res=>{
	  		this.filter = res.filter;
	  		this.order = res.order;
	  		this.getItemswithFilter(this.filter,this.order);
	  		this.filterapplied = this.filter?(this.filter.split('&').length-1):false;
		});
		this.other.getcart().subscribe(res=>{
	  		if(res.do){
	    		this.cart = localStorage.getItem('cart')=='true'?true:false;
	    		this.cartCount = localStorage.getItem('cartcount');
	  		}
		});
	}

  ngOnInit() {
    this.cart = localStorage.getItem('cart')=='true'?true:false;
    this.cartCount = localStorage.getItem('cartcount');
  	let url = this.router.url.split('/');
    this.id = url[url.length-1];
  	this.getItems();
  }  

  async presentIncdecModal(data) {  
  	if(this.selectedOption){
  		for(let i=0;i<data.rate.length;i++){
  			if(this.selectedOption == data.rate[i].ItemRateSetupId){
  				data.selected = data.rate[i];
  			}
  		}
  	}

    if(data.selected){
      const modal = await this.modalController.create({
        component: IncdecPage,
        cssClass:'incdecmodal',
        componentProps:{
          'data':data,
          'to':'cart'
        }
      });
      return await modal.present();
    }else{
      this.other.presentToast('Please select range !!','danger');
    }
  }

  onSelectChange(cat, index, selectedValue: any) {
    this.selectedOption = selectedValue.detail.value;
    this.items[index].cartQuantity = selectedValue.detail.value;
    console.log(this.items);
  }

  expFilter(){
    this.expfilter = !this.expfilter;
  }

  replaceunserscore(name){
    name = "test";
    return name.replace(/_/g,' ');
  }

  replacespace(name){
    name = "test";
    return name.replace(/\s/g,'_');
  }

  getItemswithFilter(filter,order){
    this.other.presentLoading().then(m=>{
      this.items = [];
      this.apis.getSellertItems(this.id).subscribe(res=>{
        console.log(res.body);
        this.other.dismissLoading();
        //this.ItemRateListMinMax = res.body.Data.ItemRateListMinMax;
        this.items = res.body.productlist;
        for(let i=0;i<res.body.productlist.length;i++){
          this.items[i].cartQuantity = 1;
        }
        if(!res.body.productlist.length){
            this.other.setTotalItems(0);
          }
      })
    })
  }

  getItems(){  	
	
  	this.apis.getSellertItems(this.id).subscribe(res=>{
      console.log(res.body.productlist.length);
      //this.items = [];
      //this.ItemRateListMinMax = res.body.Data.ItemRateListMinMax;
      this.items = res.body.productlist;
      console.log(this.items);
  		for(let i=0;i<res.body.productlist.length;i++){
        this.items[i].cartQuantity = 1;
      }
  	})
  }

  moveToCart(item){  	
    this.apis.addToCart(this.CustomerLoginId,item.id, item.cartQuantity,'','').subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.userid === this.CustomerLoginId){
        localStorage.setItem('cartcount',res.body.cartcount);
        this.other.presentToast('Item added to cart','success');
        this.other.dorefresh();
      }
    })
  }

  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
      // cssClass:'incdecmodal',
      componentProps:{
        'data':this.ItemRateListMinMax,
        'filter':this.filter,
        'order':this.order
      }
    });
    return await modal.present();
  }

}
