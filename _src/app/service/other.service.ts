import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController, ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
//import { TopupPage } from '../topup/topup.page';
import { MainwalletPage } from '../mainwallet/mainwallet.page';
import { MainnotificationPage } from '../mainnotification/mainnotification.page';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  address = new Subject<any>();
  filter = new Subject<any>();
  totalItems = new Subject<any>();
  refresh = new Subject<any>();
  cart = new Subject<any>();
  newadd = new Subject<any>();
  updatep = new Subject<any>();
  order = new Subject<any>();

  constructor(public navCtrl:NavController,private toaster:ToastController,public loadingController: LoadingController,private alertController:AlertController,private router:Router,private modalController:ModalController, private popoverController:PopoverController) { }

  async presentToast(msg,color) {
    const toast = await this.toaster.create({
      message: msg,
      duration: 2000,
      color:color,
      position: 'top'
    });
    toast.present();
  }

  async presentWalletPopover() {
    const popover = await this.popoverController.create({
      component: MainwalletPage,
      translucent: true,
      cssClass:'custompopover',
    });
    return await popover.present();
  }

  async presentNotificationPopover() {
    const popover = await this.popoverController.create({
      component: MainnotificationPage,
      translucent: true,
      cssClass:'custompopover',
    });
    return await popover.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processing...'
    });
    await loading.present();
  }

  /* async presentTopupModal() {
    const modal = await this.modalController.create({
      component: TopupPage
    });
    return await modal.present();
  } */

  dismissLoading(){
    this.loadingController.dismiss();
  }

  async presentExitToast() {
    const toast = await this.toaster.create({
      message: 'Click again to exit app !!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  setadd(add){
    console.log(add);
    this.address.next({add:add});
  }

  getadd(){
    return this.address.asObservable();
  }

  dorefresh(){
    this.refresh.next({do:true});
  }

  getrefresh(){
    return this.refresh.asObservable();
  }

  setFilter(filter=null,order=null){
    this.filter.next({filter:filter,order:order});
  }

  getFilter(){
    return this.filter.asObservable();
  }

  getTotalItems(){
    return this.totalItems.asObservable();
  }

  setTotalItems(no){
    this.totalItems.next({items:no});
  }

  setcart(){
    this.cart.next({do:true});
  }

  getcart(){
    return this.cart.asObservable();
  }

  setNewAdd(){
    this.newadd.next({do:true});
  }

  getNewAdd(){
    return this.newadd.asObservable();
  }

  updateProfile(){
    this.updatep.next({do:true});
  }

  getUpdateProfile(){
    return this.updatep.asObservable();
  }

  ordercancel(){
    this.order.next({do:true});
  }

  getOrderCancel(){
    return this.order.asObservable();
  }

  isValidToken(msg){
    if(msg == 'Jwt token expired'){
      this.navCtrl.navigateRoot('/login');
    }
  }
  
}
