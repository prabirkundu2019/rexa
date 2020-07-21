import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditprofilePage } from './editprofile.page';
import { Camera } from '@ionic-native/camera/ngx';

const routes: Routes = [
  {
    path: '',
    component: EditprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Camera
  ],
  declarations: [EditprofilePage]
})
export class EditprofilePageModule {}
