import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

	model = {name:'',mobile:'',email:'',password:''};
	imageData:any;
	updatedImg:any;
	image:any;
	imageId:any;
	countries:any;
	states:any;
	cities:any;
	CustomerLoginId: "";
	customPopoverOptions: any = {
		header: 'Select'
	};

  constructor(public router:Router,private other:OtherService,private camera: Camera,private DomSanitizer: DomSanitizer,private apis:ApiService) { 
	if(localStorage.getItem('userdata') != "undefined")
	{
		this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
		if (this.CustomerLoginId === undefined){
			this.CustomerLoginId = '';
		}
	}
  }

  ngOnInit() {
    this.model.mobile = JSON.parse(localStorage.getItem('userdata')).ContactNo;
    this.getProfileData();
  }

  select(){
  	const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true
    }
    this.camera.getPicture(options).then((imageData) => {
    	this.imageData = 'data:image/png;base64,'+imageData;
    });
  }

//   setG(val){
//   	this.model.gender = val;
//   }

//   getcountries(){
//   	this.apis.getcountries().subscribe(res=>{
//   		this.countries = res.body.Data;
//   		for(let i=0;i<this.countries.length;i++){
// 	      if(this.countries[i].CommonDesc == this.model.country){
// 	        this.model.country = this.countries[i].Id;
// 	        this.getstates(this.model.country);
// 	        // this.getcontrycode(this.countries[i].CommonDesc);
// 	      }
// 	    }
//   	})
//   }

//   getstates(cntry){
//   	this.apis.getstates(cntry).subscribe(res=>{
//   		this.states = res.body.Data;
//       for(let i=0;i<this.states.length;i++){
//         if(this.states[i].CommonDesc1 == this.model.state){
//           this.model.state = this.states[i].Id;
//           this.getcities(this.model.state);
//         }
//       }
//   	})
//   }

// 	getcities(state){
//   		this.apis.getcities(state).subscribe(res=>{
//   			this.cities = res.body.Data;
//       		for(let i=0;i<this.cities.length;i++){
//         		if(this.cities[i].CommonDesc2 == this.model.city){
//           			this.model.city = this.cities[i].Id;
//         		}
//       		}
//   		});
//   	}

  	getProfileData(){
	    this.apis.getProfileData(JSON.parse(localStorage.getItem('userdata')).id).subscribe(res=>{
	      	this.other.isValidToken(res.body.Message);
	      	if(res.body.status === "true"){
	      		this.model.name = res.body.udetails.name;
				this.model.email = res.body.udetails.email;
				this.model.mobile = res.body.udetails.mobile;
				//this.image = res.body.Data[0].Img;
				//this.imageId = res.body.Data[0].ImgId;
	      }
	    });
  	}

  update(){
    // let data ={"LoginId":this.model.no,"CustomerName":this.model.uname,"Email":this.model.email,"ImageFiles":[{"Name":this.model.uname+".jpg","BaseString":this.imageId?'':this.imageData,"Extension":"jpg","Id":this.imageId?this.imageId:0,"IsBaseImage":this.imageId?0:1}]}
    let formdata = {
    	//"LoginId":this.model.no,
    	//"Password":"edit",
		//"Title":this.model.title,
		"userid":this.CustomerLoginId,
    	"name":this.model.name,
    	"email":this.model.email,
    	"mobile":this.model.mobile
    }
    this.apis.updateProfile(formdata).subscribe(res=>{
      if(res.body.status === "true"){
        this.other.updateProfile();
        this.other.presentToast("Profile updated successfully !!",'success');
        history.back();
      }
    })
  }


}
