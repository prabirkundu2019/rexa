import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

	CustomerName:any;
	add:any;
	image:any;
	name:any;
	version:any = '0.1.2';
	menuCategory:any;
	isRemainder:0;
	mItemLegel=false;

  	constructor(public router:Router,public navCtrl:NavController,private apis:ApiService,private other:OtherService,private menu:MenuController,private app:AppVersion) {
	  	this.other.getrefresh().subscribe(res =>{
	  		if(res.do){
	  			this.getCartSize();
	  		}
	  	});

	    this.other.getNewAdd().subscribe(res=>{
	      if(res.do){
	        this.defaultAdd();
	      }
	    });

	    this.other.getUpdateProfile().subscribe(res=>{
	      if(res.do){
	        this.getProfileData();
	      }
	    });

   		this.getMenuCategory();
  	}

  	ngOnInit() {
	  	/* if(!localStorage.getItem('userdata')){
	  		this.navCtrl.navigateRoot('login');
	  	} */
	    this.app.getVersionNumber().then(code=>{
	      this.version = code;
	    })
	  	this.getCartSize();
	    this.defaultAdd();
  	}
  
	ionViewWillEnter(){
		this.getProfileData();
	}

	getProfileData(){
		this.name = JSON.parse(localStorage.getItem('userdata')).name;
		// this.apis.getProfileData('',JSON.parse(localStorage.getItem('userdata')).ContactNo).subscribe(res=>{
		// 	//this.other.isValidToken(res.body.Message);
		// 	this.image =  res.body.Data[0] ? res.body.Data[0].Img : "";
		// 	localStorage.setItem('profiledate',JSON.stringify(res.body.Data[0]));
		// 	localStorage.setItem('image',res.body.Data[0].Img);
		// 	this.name = res.body.Data[0].CustomerName;
		// });
	}

  	getCartSize(){   	  				
    	this.apis.getCartSize().subscribe(res=>{      		
      		if(parseInt(res.body.Data) != 0){
      			localStorage.setItem('cart','true');
      			localStorage.setItem('cartcount',res.body.Data);
      			this.other.setcart();      			
      		}else{
      			localStorage.setItem('cart','false');
      			localStorage.setItem('cartcount','0');
      			this.other.setcart();      			
      		}
    	});
  	}

  	openProfile(){
    	this.menu.close();
    	if(this.name)
    		this.router.navigate(['/menu/profile']);
    	else
    		this.router.navigate(['/login']);

  	}

  	defaultAdd(){
	    this.apis.getSavedAdd(true).subscribe(res=>{
	      //this.other.isValidToken(res.body.Message);
	      this.add = res.body.Data[0];	      
	    });
  	}
  	replacespace(name) {
    	return name.replace(/ /g, '_');
  	}

  	getMenuCategory(){
	    /* this.apis.getCategory(1,25,1).subscribe(res=>{
	      	this.menuCategory = res.body.Data.CategoryDetailsList;
	    }); */

	    this.apis.getMenuCategory().subscribe(res=>{
	      	this.menuCategory = res.body.catlist;
	    });
  	}
  	
}
