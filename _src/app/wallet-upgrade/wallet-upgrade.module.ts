import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalletUpgradePage } from './wallet-upgrade.page';

const routes: Routes = [
  {
    path: ':id',
    component: WalletUpgradePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WalletUpgradePage]
})
export class WalletUpgradePageModule {}
