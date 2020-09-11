import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OtherService } from '../service/other.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

	@ViewChild('pricerange',{static:false}) pricerange:any;
	@Input() data:any;
	@Input() filter:any;
	@Input() order:any;
	settimeout:any;
	totalitems:any;

  constructor(private other:OtherService,public modal:ModalController) { }

  ngOnInit() {
  	let min
	let max
  	if(this.filter){
  		min = parseInt(this.filter.split('&')[0].split('=')[1]);
  		max = parseInt(this.filter.split('&')[1].split('=')[1]);
  	}
  	setTimeout(()=>{
  		this.pricerange.value = { lower: min?min:this.data[0], upper: max?max:this.data[1] };
  	},300);
  	this.other.getTotalItems().subscribe(res=>{
  		this.totalitems = res.items;
  	})
  }

  setFilter(){
  	clearTimeout(this.settimeout);
  	this.settimeout = setTimeout(()=>{
		let filter = 'minprice='+this.pricerange.value.lower+'&maxprice='+this.pricerange.value.upper;
		this.filter = filter;
	  	this.other.setFilter(this.filter,this.order);
  	},700);
  }

  closeModel(){
  	this.other.setFilter(this.filter,this.order);
  	this.modal.dismiss();
  }

  setOrder(order){
	this.order = order;
	this.other.setFilter(this.filter,this.order);
  }

}