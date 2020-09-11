import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { ImageviewerPage } from '../imageviewer/imageviewer.page';
import { OtherService } from '../service/other.service';
import { IncdecPage } from '../incdec/incdec.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  shortDescription:boolean=false;
  longDescription:boolean=true;
  availableMsg:boolean=true;
  nonAvailableMsg:boolean=true;
  isWishlist:boolean=false;
  isNotWishlist:boolean=true;
  message: "";
	imageForSharing: "";

  constructor(public router:Router,private apis:ApiService,private modalController:ModalController,private other:OtherService,private socialSharing: SocialSharing) {
    if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined")
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
  	this.apis.getItemDetail(cid,id,this.CustomerLoginId).subscribe(res=>{
      this.data = res.body.productdetails;
      this.sliders = res.body.relatedproductlist;
      this.data.mrp_price = res.body.productdetails.mrp_price;
      this.activeimage.url = res.body.productdetails.image;
      if(res.body.wishlist_status == "true")
      {
        this.isWishlist = true;
        this.isNotWishlist = false;
      }else{
        this.isWishlist = false;
        this.isNotWishlist = true;
      }
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
    this.apis.pincodeCheck(this.pincode)
    .subscribe(res=>{
      if(res.body.status == "true")
      {
        this.availableMsg = false;
        this.nonAvailableMsg = true;
      }else{
        this.availableMsg = true;
        this.nonAvailableMsg = false;
      }
      //this.other.presentToast(res.body.message,'success');
    })
  }

  sendEnquiry(product_id){
    this.apis.sendEnquiry(this.CustomerLoginId,product_id).subscribe(res=>{
      this.enquiryMsg = 1;
      this.other.presentToast('Enquiry sent succssfully!','success');
    })
  }

  readMore(){
    this.shortDescription = true;
    this.longDescription = false;
  }

  addToWishlist(product_id){
    this.apis.addToWishList(this.CustomerLoginId,product_id).subscribe(res=>{
      this.isWishlist = true;
      this.isNotWishlist = false;
      this.other.presentToast('Product added to wishlist','success');
    })
  }

  shareviaWhatsapp(){
		this.socialSharing.shareViaWhatsApp(this.data.product_name,this.activeimage.url,this.data.productlink)
	}
	// shareviaFacebook(){
	// 	this.socialSharing.shareViaFacebook("test",this.activeimage.url,null)
	// }
	shareviaTwitter(){
		this.socialSharing.shareViaTwitter(this.data.product_name,this.activeimage.url,this.data.productlink)
	}

}
