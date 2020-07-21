import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageviewerPage } from './imageviewer.page';
import { PinchZoomModule } from 'ngx-pinch-zoom';

const routes: Routes = [
];

@NgModule({
  imports: [
    PinchZoomModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImageviewerPage]
})
export class ImageviewerPageModule {}
