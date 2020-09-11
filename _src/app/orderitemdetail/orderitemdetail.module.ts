import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderitemdetailPage } from './orderitemdetail.page';
import { OwlModule } from 'ngx-owl-carousel';
import { PinchZoomModule } from 'ngx-pinch-zoom';

const routes: Routes = [
  {
    path: '',
    component: OrderitemdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    PinchZoomModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderitemdetailPage]
})
export class OrderitemdetailPageModule {}
