import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	back:any;

  constructor(public router:Router,public modalController: ModalController,private platform:Platform, private other:OtherService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	var lastTimeBackPress = 0;
    var timePeriodToExit  = 2000;
  	this.back = this.platform.backButton.subscribe(() => {
      if(new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
        navigator['app'].exitApp();
      }else{
        this.other.presentExitToast();
        lastTimeBackPress = new Date().getTime();
      }
    })
  }

  ionViewWillLeave(){
    this.back.unsubscribe();
	}

  async opensearch(){
  	const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }
  openreferral(){
  	this.router.navigate(['/referral'],{replaceUrl:true});
  }


}
