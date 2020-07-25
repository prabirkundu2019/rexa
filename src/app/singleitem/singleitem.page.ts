import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { ImageviewerPage } from '../imageviewer/imageviewer.page';
import { OtherService } from '../service/other.service';
import { IncdecPage } from '../incdec/incdec.page';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.page.html',
  styleUrls: ['./singleitem.page.scss'],
})
export class SingleitemPage implements OnInit {

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
  pincode="";
  enquiryMsg=0;
  sliders:any=[];

  constructor(public router:Router,private apis:ApiService,private modalController:ModalController,private other:OtherService) {
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
  	let url = this.router.url.split('/');
  	this.itemName = url[url.length - 3];
  	this.cid = url[url.length - 2];
  	this.pid = url[url.length - 1];
  	this.getItemDetail(url[url.length-2],url[url.length-1]);
  }

  ionViewDidEnter() {
    if(this.refresh){
      this.cart = localStorage.getItem('cart')=='true'?true:false;
      this.cartCount = localStorage.getItem('cartcount');
      let url = this.router.url.split('/');
      this.itemName = url[url.length - 3];
      this.getItemDetail(url[url.length-2],url[url.length-1])
    }
  }

  productDetails(data){
    this.router.navigate(['/menu/singleitem/'+data.product_slug+'/'+data.catid+'/'+data.id],{replaceUrl:true})
  }

  segmentChanged(ev: any) {
  }

  getItemDetail(cid,id){
  	this.apis.getItemDetail(cid,id).subscribe(res=>{
      this.data = res.body.productdetails;
      this.sliders = res.body.relatedproductlist;
      this.data.mrp_price = 1111;
      this.activeimage.url = res.body.productdetails.image;
      console.log(this.data);
      // this.data.selected = this.data.ItemRateList[0];
      // this.data.name = this.data.ItemDetails;
      // this.activeimage.url = this.data.ItemColorwiseImages[0].FilepathMedium;
      // this.aboutdata=[];
      // this.totalsaleprice = this.data.selected.Qty*this.data.selected.SaleRate;
      // this.totalmrpprice = this.data.selected.Qty*this.data.selected.MrpRate;
      // for(let i=0;i<this.data.ItemSpecificationList.length;i++){
      //   let data = {head:'',subhead:[]}
      //   if(!this.data.ItemSpecificationList[i].ParentCategoryId){
      //     data.head = this.data.ItemSpecificationList[i];
      //     for(let j=0;j<this.data.ItemSpecificationList.length;j++){
      //       if(this.data.ItemSpecificationList[i].ItemSubTitle_CategoryId == this.data.ItemSpecificationList[j].ParentCategoryId){
      //         data.subhead.push(this.data.ItemSpecificationList[j])
      //       }if(j == this.data.ItemSpecificationList.length - 1){
      //         this.aboutdata.push(data);
      //       }
      //     }
      //   }
      // }
  	})
  }

  replaceunserscore(name){
    return name.replace(/_/g,' ');
  }

  selectRange(data){
    this.data.selected = data.detail.value;
    this.totalsaleprice = this.data.selected.Qty*this.data.selected.SaleRate;
    this.totalmrpprice = this.data.selected.Qty*this.data.selected.MrpRate;
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

  addToCart(item){  	
    this.apis.addToCart(this.CustomerLoginId,item.id,1).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.userid === this.CustomerLoginId){
        this.other.presentToast('Item added to cart','success');
        localStorage.setItem('cartcount',res.body.cartcount);
        this.other.dorefresh();
      }
    })
  }

  buyNow(item){  	
    this.apis.addToCart(this.CustomerLoginId,item.id,1).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.userid === this.CustomerLoginId){
        localStorage.setItem('cartcount',res.body.cartcount);
        this.other.presentToast('Item added to cart','success');
        this.router.navigate(['/menu/checkout'],{replaceUrl:true})
      }
    })
  }

  error(){
  }

  pincodeCheck(){
    this.apis.pincodeCheck(this.pincode).subscribe(res=>{
      this.other.presentToast(res.body.message,'success');
    })
  }

  sendEnquiry(product_id){
    this.apis.sendEnquiry(this.CustomerLoginId,product_id).subscribe(res=>{
      this.enquiryMsg = 1;
      this.other.presentToast('Enquiry sent succssfully!','success');
    })
  }

}
