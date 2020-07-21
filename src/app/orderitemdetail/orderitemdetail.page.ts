import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtherService } from '../service/other.service';
import { ApiService } from '../service/api.service';
import { ImageviewerPage } from '../imageviewer/imageviewer.page';
import { ModalController } from '@ionic/angular';
import { RateandreviewPage } from '../rateandreview/rateandreview.page';

@Component({
  selector: 'app-orderitemdetail',
  templateUrl: './orderitemdetail.page.html',
  styleUrls: ['./orderitemdetail.page.scss'],
})
export class OrderitemdetailPage implements OnInit {

	itemName:string;
	images = [];
	activeimage = {index:0,url:''};
  data:any;
  aboutdata:any=[];
  rateid:any;
  order:any;
  suborder:any;

  constructor(public router:Router,private other:OtherService,private apis:ApiService,private modalController:ModalController) {
    this.other.getOrderCancel().subscribe(res=>{
      if(res.do){
        this.ngOnInit();
      }
    })
  }

  segmentChanged(ev: any) {
  }

  error(){
  }

  ngOnInit() {
  	let url = this.router.url.split('/');
  	this.order = url[url.length - 5];
  	this.suborder = url[url.length - 6];
  	this.itemName = url[url.length - 3];
  	this.rateid = url[url.length - 4];
  	this.getItemDetail(url[url.length-2],url[url.length-1]);
  }

  replaceunserscore(name){
    return name.replace(/_/g,' ');
  }

  getItemDetail(cid,id){
  	this.apis.getItemDetail(cid,id).subscribe(res=>{
      this.data = res.body.Data;
      for(let i=0;i<this.data.ItemRateList.length;i++){
      	if(this.data.ItemRateList[i].ItemRateSetupId == this.rateid){
      		this.data.selected = this.data.ItemRateList[i];
      	}
      }
      this.data.name = this.data.ItemDetails;
      this.activeimage.url = this.data.ItemColorwiseImages[0].FilepathMedium;
      this.aboutdata=[];
      for(let i=0;i<this.data.ItemSpecificationList.length;i++){
        let data = {head:'',subhead:[]}
        if(!this.data.ItemSpecificationList[i].ParentCategoryId){
          data.head = this.data.ItemSpecificationList[i];
          for(let j=0;j<this.data.ItemSpecificationList.length;j++){
            if(this.data.ItemSpecificationList[i].ItemSubTitle_CategoryId == this.data.ItemSpecificationList[j].ParentCategoryId){
              data.subhead.push(this.data.ItemSpecificationList[j])
            }if(j == this.data.ItemSpecificationList.length - 1){
              this.aboutdata.push(data);
            }
          }
        }
      }
  	})
  }

  makeactive(i){
    this.activeimage.url = this.data.ItemColorwiseImages[i].FilepathMedium;
  	this.activeimage.index = i;
  }

	async zoomImage(){
    this.other.presentLoading();
    const modal = await this.modalController.create({
      component: ImageviewerPage,
      componentProps:{
        'images':this.data.ItemColorwiseImages,
        'index':this.activeimage.index
      }
    });
    return await modal.present();
  }

  async rate(){
  	const modal = await this.modalController.create({
      component: RateandreviewPage,
      componentProps:{
        'data':this.data,
        'suborder':this.suborder,
        'order':this.order
      },
      cssClass:'incdecmodal'
    });
    return await modal.present();
  }

}
