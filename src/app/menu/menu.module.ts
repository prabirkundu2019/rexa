import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';


const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'tabs',
        loadChildren: ()=>import('../tabs/tabs.module').then(m=>m.TabsPageModule)
      },
      {
        path:'singlecat/:cname/:cid',
        loadChildren:()=>import('../singlecat/singlecat.module').then(m=> m.SinglecatPageModule)
      },
      {
        path:'singleitem/:iname/:cid/:id',
        loadChildren:()=>import('../singleitem/singleitem.module').then(m=> m.SingleitemPageModule)
      },
      {
        path:'cart',
        loadChildren:()=> import('../cart/cart.module').then(m=> m.CartPageModule)
      },
      {
        path:'wishlist',
        loadChildren:()=> import('../wishlist/wishlist.module').then(m=> m.WishlistPageModule)
      },
      { 
        path: 'singlecatitems/:cname/:subid/:cid',
        loadChildren:()=> import('../singlecatitems/singlecatitems.module').then(m=> m.SinglecatitemsPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../checkout/checkout.module').then(m=> m.CheckoutPageModule)
      },
      {
        path:'alladd',
        loadChildren:() => import('../alladd/alladd.module').then(m=> m.AlladdPageModule)
      },
      {
        path:'newadd',
        loadChildren:() => import('../add-address/add-address.module').then(m=> m.AddAddressPageModule)
      },
      {
        path:'profile',
        loadChildren:() => import('../profile/profile.module').then(m=> m.ProfilePageModule)
      },
      {
        path:'editprofile',
        loadChildren:() => import('../editprofile/editprofile.module').then(m=> m.EditprofilePageModule)
      },
      { 
        path: 'orderlist', 
        loadChildren:() => import('../orderlist/orderlist.module').then(m=> m.OrderlistPageModule)
        //loadChildren: './orderlist/orderlist.module#OrderlistPageModule' 
      },
      {
        path:'orderhistory/:id',
        loadChildren:() => import('../orderhistory/orderhistory.module').then(m=> m.OrderhistoryPageModule)
      },
      {
        path:'orderitemdetal/:soid/:oid/:rid/:name/:cid/:id',
        loadChildren:() => import('../orderitemdetail/orderitemdetail.module').then(m=> m.OrderitemdetailPageModule)
      },
      {
        path:'wallet',
        loadChildren:() => import('../wallet/wallet.module').then(m=> m.WalletPageModule)
      },
      {
        path:'topup',
        loadChildren:() => import('../topup/topup.module').then(m=> m.TopupPageModule)
      },
      {
        path:'wallet-upgrade',
        loadChildren:() => import('../wallet-upgrade/wallet-upgrade.module').then(m=> m.WalletUpgradePageModule)
      },
      {
        path:'carddetail/:id',
        loadChildren:() => import('../card-detail/card-detail.module').then(m=> m.CardDetailPageModule)
      },
      {
        path:'milktopup',
        loadChildren:() => import('../milktopup/milktopup.module').then(m=> m.MilktopupPageModule)
      },
      {
        path:'legel/:type',
        loadChildren:() => import('../legel/legel.module').then(m=> m.LegelPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
