import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

	@Input() prevadd:any;
	data:any;
	countries:any;
	states:any;
	cities:any;
	ccode:any;
	ccid:any;
	Length:any;
	CustomerLoginId: "";
	model = {add1:'',add2:'',zip:'',ano:'',city:'',state:'',country:'',addtype:6,isdefault:false}
	customPopoverOptions: any = {
		header: 'Select'
	};

  constructor(private apis:ApiService,private other:OtherService,public modal:ModalController) {
	if(localStorage.getItem('userdata') != "undefined")
    {
      this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
      if (this.CustomerLoginId === undefined){
        this.CustomerLoginId = '';
      }
	}
  }

  ngOnInit() {
	console.log(this.prevadd);
  	if(this.prevadd){
		this.model = {add1:this.prevadd.add1,add2:this.prevadd.add2,zip:this.prevadd.zip,ano:this.prevadd.ano,city:this.prevadd.city,state:this.prevadd.state,country:this.prevadd.country,addtype:this.prevadd.addtype,isdefault:this.prevadd.isdefault?true:false};
  		//this.getadd({value:this.prevadd.PostCode});
  	}
  }

//   getadd(pin){
//   	this.model.country = '';
//   	this.model.city = '';
//   	this.model.state = '';
//     this.apis.getAddUsingPin(pin.value).subscribe(res=>{
//       this.data = res.body[0].PostOffice;
//       if(this.data){
//       	//this.getcountries();
//       }
//     })
//   }

//   getcountries(){
//   	this.apis.getcountries().subscribe(res=>{
//   		this.countries = res.body.Data;
//   		for(let i=0;i<this.countries.length;i++){
// 	      if(this.countries[i].CommonDesc == this.data[0].Country){
// 	        this.model.country = this.countries[i].Id;
// 	        this.getstates(this.model.country);
// 	        this.getcontrycode(this.countries[i].CommonDesc);
// 	      }
// 	    }
//   	})
//   }

//   getcontrycode(name){
//   	this.apis.getcontrycode(this.model.country).subscribe(res=>{
//       this.other.isValidToken(res.body.Message);
//   		this.ccode = res.body.Data[0].Phonecode;
//   		this.ccid = res.body.Data[0].Id;
//   		this.Length = res.body.Data[0].Length;
//   	})
//   }

//   getstates(cntry){
//   	this.apis.getstates(cntry).subscribe(res=>{
//   		this.states = res.body.Data;
//       for(let i=0;i<this.states.length;i++){
//         if(this.states[i].CommonDesc1 == this.data[0].State){
//           this.model.state = this.states[i].Id;
//           this.getcities(this.model.state);
//         }
//       }
//   	})
//   }

//   getcities(state){
//   	this.apis.getcities(state).subscribe(res=>{
//   		this.cities = res.body.Data;
//       for(let i=0;i<this.cities.length;i++){
//         if(this.cities[i].CommonDesc2 == this.data[0].District){
//           this.model.city = this.cities[i].Id;
//         }
//       }
//   	})
//   }

  add(form){
  	let formdata = {"id":this.prevadd?this.prevadd.id:0,"addtype":this.model.addtype,"add1":this.model.add1,"add2":this.model.add2,"ano":this.model.ano,"mobile_no":this.model.ano,"city":this.model.city,"country":this.model.country,"state":this.model.state,"zip":this.model.zip,"isdefault":this.model.isdefault?1:0,"userid":this.CustomerLoginId}
  	this.apis.addAddress(formdata).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
  		if(res.body.status === "true"){
  			this.other.setNewAdd();
  			this.modal.dismiss();
  		}
  	})
  }

}
