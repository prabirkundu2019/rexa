import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, Events } from '@ionic/angular';
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
  CustomerLoginId = "";

  constructor(public router:Router,public modalController: ModalController,private platform:Platform, private other:OtherService, public events: Events) {
    this.events.subscribe('user:created', (user, time) => {
      console.log('Welcome', user, 'at', time);
			// user and time are the same arguments passed in `events.publish(user, time)`
			this.CustomerLoginId = user.id;
    });
    if(this.CustomerLoginId == "" && "userdata" in localStorage && localStorage.getItem('userdata') != "undefined" && localStorage.getItem('userdata') != null)
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
  }

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
