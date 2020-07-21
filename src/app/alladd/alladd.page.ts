import { Component, OnInit } from '@angular/core';
import { OtherService } from '../service/other.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddAddressPage } from '../add-address/add-address.page';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-alladd',
  templateUrl: './alladd.page.html',
  styleUrls: ['./alladd.page.scss'],
})
export class AlladdPage implements OnInit {

  addresses:any;
  params:any;
  CustomerLoginId: "";

  constructor(private other:OtherService, private route:ActivatedRoute,public router:Router,private modalController:ModalController,private apis:ApiService) {
    if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
    }
    this.other.getNewAdd().subscribe(res=>{
      if(res.do){
        this.getSavedAdd();
      }
    })
  }

  ngOnInit() {
    this.getSavedAdd();
    this.route.queryParams.subscribe(params=>{
      this.params = params;
    })
  }

  getSavedAdd(){
    this.apis.getSavedAdd(this.CustomerLoginId).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      this.addresses = res.body.shipaddlist;
    })
  }

  selectadd(add){
  	this.other.setadd(add);
  	history.back();
  }

  edit(add){
    this.presentAddAdderssModal(add);
  }

  del(id){
    this.apis.delSavedAdd(id).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      if(res.body.Code === 5015){
        this.other.presentToast('Address deleted !!','success');
        this.getSavedAdd();
      }
    })
  }

  async presentAddAdderssModal(add = null) {
    const modal = await this.modalController.create({
      component: AddAddressPage,
      componentProps:{
        'prevadd':add
        // 'filter':this.filter,
        // 'order':this.order
      }
    });
    return await modal.present();
  }

}
