import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ApiService } from './service/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplink:Deeplinks,
    private apis:ApiService,
    public nav:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.apis.vendoragent().subscribe(res=>{
      // 	localStorage.setItem("userdata",JSON.stringify(res.body.Data));
      // })
      this.deeplink.route({
		     '/paytm-gateway': {}
		   }).subscribe(match => {
		     // match.$route - the route we matched, which is the matched entry from the arguments to route()
		     // match.$args - the args passed in the link
		     // match.$link - the full link data
		     //console.log('Successfully matched route', match);
		     this.nav.navigateRoot('/menu/tabs/tab2');
		   }, nomatch => {
		     // nomatch.$link - the full link data
		     //console.log('Got a deeplink that didn\'t match', nomatch);
		   });

    });
  }
}
