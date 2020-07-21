import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../../search/search.page';
import { OtherService } from '../../service/other.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  cart:boolean = false;
  cartCount = '';

  constructor(public modalController: ModalController,private other:OtherService) {
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
  }

  async opensearch(){
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }

}
