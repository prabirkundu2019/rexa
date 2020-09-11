import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu/tabs/tab2', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'otp/:id', loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule) },
  { path: 'forgotpass', loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule) },
  { path: 'wallet', loadChildren: './wallet/wallet.module#WalletPageModule' },
  { path: 'topup', loadChildren: './topup/topup.module#TopupPageModule' },
  { path: 'mainwallet', loadChildren: './mainwallet/mainwallet.module#MainwalletPageModule' },
  { path: 'milktopup', loadChildren: './milktopup/milktopup.module#MilktopupPageModule' },
  { path: 'wallet-upgrade', loadChildren: './wallet-upgrade/wallet-upgrade.module#WalletUpgradePageModule' },
  { path: 'offer', loadChildren: './offer/offer.module#OfferPageModule' },
  { path: 'referral', loadChildren: './referral/referral.module#ReferralPageModule' },
  { path: 'mainnotification', loadChildren: './mainnotification/mainnotification.module#MainnotificationPageModule' },
  { path: 'legel/:type', loadChildren: './legel/legel.module#LegelPageModule' },
  { path: 'orderlist', loadChildren: './orderlist/orderlist.module#OrderlistPageModule' },
  { path: 'card-detail', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' },
  { path: 'seller/:id', loadChildren: './seller/seller.module#SellerPageModule' },
  { path: 'otp', loadChildren: './otp/otp.module#OtpPageModule' },
  { path: 'makemoney', loadChildren: './makemoney/makemoney.module#MakemoneyPageModule' },
  { path: 'money', loadChildren: './money/money.module#MoneyPageModule' },
  { path: 'card-category', loadChildren: './card-category/card-category.module#CardCategoryPageModule' }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
