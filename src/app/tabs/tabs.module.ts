import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'tab2',
        loadChildren:()=>import('./tab2/tab2.module').then(m=> m.Tab2PageModule)
      },
      {
        path:'tab1',
        loadChildren:()=>import('./tab1/tab1.module').then(m=> m.Tab1PageModule)
      },
      {
        path:'tab4',
        loadChildren:()=>import('../makemoney/makemoney.module').then(m=> m.MakemoneyPageModule)
      },
      {
        path:'profile',
        loadChildren:()=>import('../profile/profile.module').then(m=> m.ProfilePageModule)
      },
      {
        path:'cart',
        loadChildren:()=>import('../cart/cart.module').then(m=> m.CartPageModule)
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
  declarations: [TabsPage]
})
export class TabsPageModule {}
