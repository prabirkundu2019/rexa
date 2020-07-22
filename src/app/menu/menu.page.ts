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
	CustomerLoginId="";

  	constructor(public router:Router,public navCtrl:NavController,private apis:ApiService,private other:OtherService,private menu:MenuController,private app:AppVersion) {
		if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined" && localStorage.getItem('userdata') != "")
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
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
		if("userdata" in localStorage && localStorage.getItem('userdata') != "undefined" && localStorage.getItem('userdata') != "")
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}
		this.getProfileData();
	}

	getProfileData(){
		if(this.CustomerLoginId != "")
		{
			this.name = JSON.parse(localStorage.getItem('userdata')).name;
		}
		// this.apis.getProfileData('',JSON.parse(localStorage.getItem('userdata')).ContactNo).subscribe(res=>{
		// 	//this.other.isValidToken(res.body.Message);
		// 	this.image =  res.body.Data[0] ? res.body.Data[0].Img : "";
		// 	localStorage.setItem('profiledate',JSON.stringify(res.body.Data[0]));
		// 	localStorage.setItem('image',res.body.Data[0].Img);
		// 	this.name = res.body.Data[0].CustomerName;
		// });
	}

  	getCartSize(){   	  				
    	this.apis.getCartItems(this.CustomerLoginId).subscribe(res=>{      		
      		if(res.body.status == 'true'){
      			localStorage.setItem('cart','true');
      			localStorage.setItem('cartcount',res.body.cartcount);
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
	    this.apis.getDefaultAdd(this.CustomerLoginId).subscribe(res=>{
	      //this.other.isValidToken(res.body.Message);
	      this.add = res.body.defaultaddress;	      
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
