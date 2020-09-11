import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-singlecat',
  templateUrl: './singlecat.page.html',
  styleUrls: ['./singlecat.page.scss'],
})
export class SinglecatPage implements OnInit {
  catdata: any;
	subcatdata:any;
	catName:string;
  page:number = 0;
  pid:any;
  cart:boolean = false;
  cartCount = '';
  listHidden=false;
  gridHidden=true;
  showListIcon=true;
  showGridIcon=false;

  constructor(private apis:ApiService,public router:Router,private other:OtherService) {
    this.other.getcart().subscribe(res=>{
      if(res.do){
        this.cart = localStorage.getItem('cart')=='true'?true:false;
        this.cartCount = localStorage.getItem('cartcount');
      }
    })
  }

  ngOnInit() {
    this.cart = localStorage.getItem('cart')=='true'?true:false;
    this.cartCount = localStorage.getItem('cartcount');
  	let url = this.router.url.split('/');
  	this.catName = url[url.length - 2];
    this.pid = url[url.length-1];
  	this.getSubCategory()
  }

  loadData(e){
    // this.apis.getSubCategory(this.pid).subscribe(res=>{
    //   console.log(res);
    //   for(let i=0;i<res.body.subcatlist.length;i++){
    //     this.subcatdata.push(res.body.subcatlist[i]);        
    //   }
    // })
  }

  replacespace(name){
    return name.replace(/ /g,'_');
  }

  replaceunserscore(name){
    return name.replace(/_/g,' ');
  }

  getSubCategory(){
  	this.apis.getSubCategory(this.pid).subscribe(res=>{
      console.log(res);
      this.catdata = res.body.catdetails;
      this.subcatdata = res.body.subcatlist;
  		// for(let i=0;i<res.body.Data.AllItemsCategoryWiseList.length;i++){
    //     let data = {name:'',rate:[]};
    //     data.name = res.body.Data.AllItemsCategoryWiseList[i];
    //     for(let j=0;j<res.body.Data.ItemRateList.length;j++){
    //       if(res.body.Data.ItemRateList[j].ItemId == res.body.Data.AllItemsCategoryWiseList[i].ItemId){
    //         data.rate.push(res.body.Data.ItemRateList[j]);
    //       }
    //       if(j == res.body.Data.ItemRateList.length-1){
    //         this.newitems.push(data);
    //       }
    //     }
    //   }
  	})
  }

  showGrid(){
    this.listHidden = true;
    this.gridHidden = false;

    this.showListIcon = false;
    this.showGridIcon = true;
  }

  showList(){
    this.listHidden = false;
    this.gridHidden = true;

    this.showListIcon = true;
    this.showGridIcon = false;
  }

}
