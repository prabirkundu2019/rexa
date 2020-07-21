import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

	@ViewChild('searchbar',{static:false}) search:any;
  searchdata:any;
  loading:boolean= false;

  constructor(public modal:ModalController,private apis:ApiService,public router:Router,private other:OtherService) { }

  ngOnInit() {
  	setTimeout(()=>{
  		this.search.setFocus();
  	},500)
  }

  doSearch(){
    this.loading = true;
    this.searchdata = [];
    this.apis.search(this.search.value).subscribe(res=>{
      this.other.isValidToken(res.body.Message);
      this.loading = false;
      this.searchdata = res.body.productlist;
    })
  }

  replacespace(name){
    return name.replace(/ /g,'_');
  }

  gotoSpecefic(type,id,pid,name){
    this.modal.dismiss();
    if(type == 'item'){
      this.router.navigate(['/menu/singleitem',this.replacespace(name),pid,id]);
    }else if(type == 'category' && pid === 0){
      this.router.navigate(['/menu/singlecat',this.replacespace(name),id]);
    }else{
      this.router.navigate(['/menu/singlecatitems',this.replacespace(name),id]);
    }
  }

}
