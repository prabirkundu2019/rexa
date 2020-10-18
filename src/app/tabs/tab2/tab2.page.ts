import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ModalController, Events } from '@ionic/angular';
import { SearchPage } from '../../search/search.page';
import { OtherService } from '../../service/other.service';
import { Router } from '@angular/router';
import { IncdecPage } from '../../incdec/incdec.page';



@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
	slideOpts = {
		initialSlide: 0,
		speed: 400,
		navigation: false,
		pagination: false
	};
	slideOpts2 = {
		initialSlide: 0,
		speed: 400,
		navigation: false,
		pagination: false
	};
	customPopoverOptions: any = {
		header: 'Select Range'
	};
	coupon: [];
	banner: [];
	catData: any;
	page: any;
	cart = false;
	cartCount = '0';
	newitems: any;
	CustomerLoginId = '';

	constructor(private apis: ApiService, public modalController: ModalController, public other: OtherService,public router:Router, public events: Events) {
		events.subscribe('user:created', (user, time) => {
			// user and time are the same arguments passed in `events.publish(user, time)`
			this.CustomerLoginId = user.id;
		});

		this.other.getrefresh().subscribe(res => {
			if (res.do) {
				this.getItems();
			}
		});

		if(this.CustomerLoginId == "" && "userdata" in localStorage && localStorage.getItem('userdata') != "undefined" && localStorage.getItem('userdata') != null)
		{
			this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).id;	
			if (this.CustomerLoginId === undefined){
				this.CustomerLoginId = '';
			}
		}

		this.other.getcart().subscribe(res => {			
			if (res.do) {
				this.cart = localStorage.getItem('cart') == 'true' ? true : false;
				this.cartCount = localStorage.getItem('cartcount') ? localStorage.getItem('cartcount') : '';
				if(this.cartCount == 'undefined'){
					localStorage.setItem('cartcount','0');
					localStorage.setItem('cart','false');
					this.cartCount='0';					
				}
			}
		});
	}

	ngOnInit() {
		this.other.dorefresh();
		try {
			//this.CustomerLoginId = JSON.parse(localStorage.getItem('userdata')).CustomerLoginId;
			this.getDefaultData();
		} catch (err) {
			this.apis.vendoragent().subscribe(res => {
				localStorage.setItem("userdata", JSON.stringify(res.body.Data));
				this.getDefaultData();
			});
		}
	}

	getDefaultData() {
		this.cart = localStorage.getItem('cart') == 'true' ? true : false;
		this.cartCount = localStorage.getItem('cartcount') ? localStorage.getItem('cartcount') : '';
		this.getCategory();
		this.getCoupon();
		this.getBanner();
		this.getItems();
	}

	getCategory() {
		this.apis.getCategory(1, 10, 1).subscribe(res => {
			this.page = 2;
			this.catData = res.body;
		});
	}

	openwallet() {
		// this.other.presentWalletPopover();
		this.router.navigate(['/menu/wallet']);
	}

	openCard(){
		this.router.navigate(['/menu/card-category'],{replaceUrl:true});
	}

	opennotification() {
		this.other.presentNotificationPopover();
	}

	loadData(e) {
		this.apis.getCategory(1, 10, this.page).subscribe(res => {
			this.page += 1;
			e.target.complete();
			for (let i = 0; i < res.body.Data.CategoryDetailsList.length; i++) {
				this.catData.CategoryDetailsList.push(res.body.Data.CategoryDetailsList[i]);
			}
		});
	}

	replacespace(name) {
		return name.replace(/ /g, '_');
	}

	getCoupon() {
		this.apis.getCoupon().subscribe(res => {
			this.coupon = res.body.couponcode_list;
		});
	}

	getBanner() {
		this.apis.getBanner().subscribe(res => {
			this.banner = res.body.homegallery_list;
			console.log(this.banner);
			// var imageslist = res.body.Data.BannerImagesList;
			// for (let i = 0; i < this.banner.length; i++) {
			// 	for (let j = 0; j < imageslist.length; j++) {
			// 		if (imageslist[j]['Id'] == this.banner[i]['Id']) {
			// 			this.banner[i]['Img'] = imageslist[j]['Img'];
			// 			this.banner[i]['UseType'] = imageslist[j]['UseType'];
			// 		}
			// 	}
			// }
		});
	}

	async opensearch() {
		const modal = await this.modalController.create({
			component: SearchPage
		});
		return await modal.present();
	}

	getItems() {
		this.apis.getItems(0, 'IsMobile=1',0).subscribe(res => {
			this.other.isValidToken(res.body.Message);
			this.newitems = [];
			this.page = 2;
			if (res.body.Data) {
				for (let i = 0; i < res.body.Data.AllItemsCategoryWiseList.length; i++) {
					const data = { name: '', rate: [], selected: '', total: '' };
					data.name = res.body.Data.AllItemsCategoryWiseList[i];
					for (let j = 0; j < res.body.Data.ItemRateList.length; j++) {
						if (res.body.Data.ItemRateList[j].ItemId == res.body.Data.AllItemsCategoryWiseList[i].ItemId) {
							if (!data.selected) {
								data.selected = res.body.Data.ItemRateList[j];
							}
							data.rate.push(res.body.Data.ItemRateList[j]);
						}
						if (j == res.body.Data.ItemRateList.length - 1) {
							this.newitems.push(data);
						}
					}
				}
			}
		})
	}

}
