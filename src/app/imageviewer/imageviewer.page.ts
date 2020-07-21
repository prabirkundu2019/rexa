import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OtherService } from '../service/other.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.page.html',
  styleUrls: ['./imageviewer.page.scss'],
})
export class ImageviewerPage implements OnInit {

	@Input() images:any;
  @Input() index:any;
	loaded:boolean = false;
  @ViewChild('slider',{static:false}) slider:any;


  constructor(private other:OtherService,public modal:ModalController) { 
  }

  ngOnInit() {
    setTimeout(()=>{
      this.slider.slideTo(this.index);
    },200);
  }

  error(){
  	this.loaded = true;
  	this.other.dismissLoading();
  }

}
