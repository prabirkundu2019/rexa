import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../../search/search.page';
import { IncdecPage } from '../../incdec/incdec.page';
import { OtherService } from '../../service/other.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

	slideOpts = {
    initialSlide: 0,
    speed: 400,
    navigation:false,
    pagination:false
  };
  catData:any;
  customPopoverOptions: any = {
    header: 'Select Range'
  };
  newitems:any;
  cart:boolean = false;
  cartCount = '';
  page:any;
  coupon:any;

  constructor(private other:OtherService,private apis:ApiService,public modalController: ModalController) {
    this.other.getrefresh().subscribe(res=>{
      if(res.do){
        this.getItems();
      }
    })
    this.other.getcart().subscribe(res=>{
      if(res.do){
        this.cart = localStorage.getItem('cart')=='true'?true:false;
        this.cartCount = localStorage.getItem('cartcount');
      }
    })
  }

  ngOnInit() {
    this.cart = localStorage.getItem('cart')=='true'?true:false;
    this.cartCount = localStorage.getItem('cartcount');
    //this.getCoupon();
  	this.getCategory();
    this.getItems();
  }

  getCoupon(){
  	this.apis.getCoupon().subscribe(res=>{
  		console.log(res);
  		this.coupon = res.body.Data.CouponTimmingList;
  	})
  }

  replacespace(name){
    return name.replace(/\s/g,'_');
  }

  getCategory(){
  	this.apis.getCategory(1,4,1).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		this.catData = res.body.Data;
  	})
  }

  getItems(){
    this.apis.getItems(0,'IsMobile=1').subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      this.newitems = [];
      this.page = 2;
      for(let i=0;i<res.body.Data.AllItemsCategoryWiseList.length;i++){
        let data = {name:'',rate:[],selected:'',total:''};
        data.name = res.body.Data.AllItemsCategoryWiseList[i];
        for(let j=0;j<res.body.Data.ItemRateList.length;j++){
          if(res.body.Data.ItemRateList[j].ItemId == res.body.Data.AllItemsCategoryWiseList[i].ItemId){
            if(!data.selected){
              data.selected = res.body.Data.ItemRateList[j]
            }
            data.rate.push(res.body.Data.ItemRateList[j]);
          }
          if(j == res.body.Data.ItemRateList.length-1){
            this.newitems.push(data);
          }
        }
      }
    })
  }

  openwallet(){
  	this.other.presentWalletPopover();
  }

  loadData(event) {
  	this.apis.getItems(0,'IsMobile=1').subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      event.target.complete();
      this.page += 1;
      for(let i=0;i<res.body.Data.AllItemsCategoryWiseList.length;i++){
        let data = {name:'',rate:[],selected:'',total:''};
        data.name = res.body.Data.AllItemsCategoryWiseList[i];
        for(let j=0;j<res.body.Data.ItemRateList.length;j++){
          if(res.body.Data.ItemRateList[j].ItemId == res.body.Data.AllItemsCategoryWiseList[i].ItemId){
            if(!data.selected){
              data.selected = res.body.Data.ItemRateList[j]
            }
            data.rate.push(res.body.Data.ItemRateList[j]);
          }
          if(j == res.body.Data.ItemRateList.length-1){
            this.newitems.push(data);
          }
        }
      }
    })
  }

  async opensearch(){
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }

  async presentIncdecModal(data) {
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

  selectRange(i,data){
    this.newitems[i].selected = data.detail.value;
  }

  moveToCart(id,cid){
    this.apis.emptyCart(1).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.Code === 1000){
        this.other.presentToast('Item added to cart','success');
        this.other.dorefresh();
      }
    })
  }

}
