import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-legel',
  templateUrl: './legel.page.html',
  styleUrls: ['./legel.page.scss'],
})
export class LegelPage implements OnInit {

	type = '';
	heading='';

  	constructor(private activatedRoute: ActivatedRoute) { }

  	ngOnInit() {
  		this.type = this.activatedRoute.snapshot.paramMap.get('type');
  		if(this.type=="privacy_policy")
  			this.heading="Privacy Policy";
  		else if(this.type=="terms")
  			this.heading="Terms";
  		else if(this.type=="user_aggrement")
  			this.heading="User Aggrement";
  		else if(this.type=="cancellation")
  			this.heading="Cancellation Policy";
  		else if(this.type=="guidelines")
  			this.heading="Guidelines";
  	}

}
