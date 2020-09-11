import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

	showcards=false;
	cards:any;
  	constructor(private apis:ApiService,private other:OtherService,public router:Router) { }

  	ngOnInit() {  		
  	}

  	getCards(){
  		this.showcards=true;
  		this.apis.getCards().subscribe(res=>{
  			if(res.body.Code === 1000){
  				this.cards = res.body.Data;
  			}
  		});
  	}

}
