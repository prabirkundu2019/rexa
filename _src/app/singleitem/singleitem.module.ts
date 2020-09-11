import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SingleitemPage } from './singleitem.page';
import { OwlModule } from 'ngx-owl-carousel';
import { PinchZoomModule } from 'ngx-pinch-zoom';

const routes: Routes = [
  {
    path: '',
    component: SingleitemPage
  }
];

@NgModule({
  imports: [
    PinchZoomModule,
    OwlModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SingleitemPage]
})
export class SingleitemPageModule {}
