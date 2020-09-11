import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageModule } from './search/search.module';
import { SearchPage } from './search/search.page';
import { ToastrModule } from 'ngx-toastr';
import { ImageviewerPageModule } from './imageviewer/imageviewer.module';
import { ImageviewerPage } from './imageviewer/imageviewer.page';
import { IncdecPageModule } from './incdec/incdec.module';
import { IncdecPage } from './incdec/incdec.page';
import { FilterPageModule } from './filter/filter.module';
import { FilterPage } from './filter/filter.page';
import { AddAddressPageModule } from './add-address/add-address.module';
import { AddAddressPage } from './add-address/add-address.page';
import { RateandreviewPageModule } from './rateandreview/rateandreview.module';
import { RateandreviewPage } from './rateandreview/rateandreview.page';
import { CancelorderPageModule } from './cancelorder/cancelorder.module';
import { CancelorderPage } from './cancelorder/cancelorder.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { WindowRef } from './checkout/winref';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { TopupPageModule } from './topup/topup.module';
import { TopupPage } from './topup/topup.page';
import { MainwalletPageModule } from './mainwallet/mainwallet.module';
import { MainwalletPage } from './mainwallet/mainwallet.page';
import { MainnotificationPageModule } from './mainnotification/mainnotification.module';
import { MainnotificationPage } from './mainnotification/mainnotification.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [MainwalletPage, MainnotificationPage, TopupPage, CancelorderPage, RateandreviewPage, AddAddressPage, FilterPage, IncdecPage, SearchPage, ImageviewerPage],
  imports: [
    MainwalletPageModule, 
    MainnotificationPageModule, 
    TopupPageModule, 
    CancelorderPageModule, 
    RateandreviewPageModule, 
    AddAddressPageModule, 
    FilterPageModule, 
    IncdecPageModule, 
    SearchPageModule, 
    ImageviewerPageModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    HttpClientModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    Deeplinks,
    InAppBrowser,
    WindowRef,
    AppVersion,
    StatusBar,
    SocialSharing,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
