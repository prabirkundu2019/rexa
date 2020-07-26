import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) { }

  private header() {
    let headers = new HttpHeaders({
        'X-San-Jwt': ''
    });
    return headers;
  }

  login(usermane,password):Observable<HttpResponse<any>>{
    let formdata = {"email":usermane,"password":password}
    return this.http.post<any>(environment.baseurl1+'/login',formdata,{observe:'response'});
  }

  getOtp(no):Observable<HttpResponse<any>>{
  	return this.http.get<any>(environment.baseurl1+'/SP_GenerateOtp/?MobileNo='+no,{observe:'response'});
  }

  getFrogotOtp(no):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/ForgotPasswordGenerateOTP/?MobileNo='+no,{observe:'response'});
  }

  verifyOtp(otp,no,type):Observable<HttpResponse<any>>{
  	let formdata = {'Code':otp,'MobileNo':no,'Type':type}
  	return this.http.post<any>(environment.baseurl1+'/authentication/otp',formdata,{observe:'response'});
  }

  // getCategory(level=0,size=0,page=0):Observable<HttpResponse<any>>{
  //   return this.http.get<any>(environment.baseurl1+'/SP_FrontendCategory?LevelNo='+level+'&Size='+size+'&Page='+page+'',{observe:'response'});
  // }

  getCategory(level=0,size=0,page=0):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/category?LevelNo='+level+'&Size='+size+'&Page='+page+'',{observe:'response'});
  }

  getSubCategory(pid):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/subcategory/'+pid,{observe:'response'});
  }

  getItems(cid = 0,filter=null,order=null,uid,page = null,size = null):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/productlist/'+cid,{observe:'response'});
  }

  getItemsWithFilter(cid = 0,filter=null,order=null):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/apifilter?subcatid='+cid+'&sortby='+order+'&'+filter,{observe:'response'});
  }

  getSellertItems(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/sellerproductlist/'+id,{observe:'response'});
  }

  // getItems(cid = 0,filter=null,order=null,uid,page = null,size = null):Observable<HttpResponse<any>>{
  //   return this.http.get<any>(environment.baseurl1+'/SP_FrontendAllItems?CustomerLoginId='+uid+'&CategoryId='+cid+'&'+filter+'&'+order+'&Page='+page+'&Size='+size,{observe:'response'});
  // }

  getItemDetail(cid,id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/productsingle/'+id,{observe:'response'});
  }

  sendEnquiry(userid, productid):Observable<HttpResponse<any>>{
    let formdata = {"userid": userid, "productid":productid}
    return this.http.post<any>(environment.baseurl1+'/sendenquiry',formdata,{observe:'response'});
  }

  pincodeCheck(pincode):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/pincodecheck/'+pincode,{observe:'response'});
  }

  // getItemDetail(cid,id,uid):Observable<HttpResponse<any>>{
  //   return this.http.get<any>(environment.baseurl1+'/SP_FrontendItemDetails?CustomerLoginId='+uid+'&CategoryId='+cid+'&ItemId='+id,{observe:'response'});
  // }

  signup(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/signup',formdata,{observe:'response'});
  }

  signupPayment(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/Customer/callbackpayumoneybycustomerbyapp',formdata,{observe:'response'});
  }

  resetForgotPassword(modal):Observable<HttpResponse<any>>{
    let formdata = {"MobileNo":modal.mobile,"Password":modal.password,"OTP":modal.otp}
    return this.http.post<any>(environment.baseurl1+'/ForgotPasswordCustomer',formdata,{observe:'response'});
  }

  getcountries():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/setting/CommonMaster?CommonCode=101',{observe:'response'});
  }

  getstates(cid):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/setting/CommonMaster1?CommonCode=102&CommonId='+cid,{observe:'response'});
  }

  getcities(sid):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/setting/CommonMaster2?CommonCode=103&CommonId1='+sid,{observe:'response'});
  }

  getPaymentMethods():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/paymentmethodlist',{observe:'response'}); 
  }

  getCartItems(userId):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/getcart?userid='+userId,{observe:'response'}); 
  }

  getCartItemsdetail():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/getcartWithDetails?IsWishingItem=false',{observe:'response'}); 
  }

  addToCart(user_id, productId, quantity):Observable<HttpResponse<any>>{
    let formdata = {"userid":user_id,"productid":productId,"quantity":quantity,"action":"add"};
    return this.http.post<any>(environment.baseurl1+'/cart',formdata,{observe:'response'}); 
  }

  updateCartItem(user_id, productId, quantity):Observable<HttpResponse<any>>{
    let formdata = {"userid":user_id,"productid":productId,"quantity":quantity,"action":"update"};
    return this.http.post<any>(environment.baseurl1+'/cart',formdata,{observe:'response'}); 
  }

  removeCart(user_id, productId, qty):Observable<HttpResponse<any>>{
    let formdata = {"userid":user_id,"productid":productId,"quantity":qty,"action":"remove"};
    return this.http.post<any>(environment.baseurl1+'/cart',formdata,{observe:'response'}); 
  }

  emptyCart(user_id):Observable<HttpResponse<any>>{
    let formdata = {"userid":user_id};
    return this.http.post<any>(environment.baseurl1+'/emptycart',formdata,{observe:'response'}); 
  }

  getCartSize():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/category',{observe:'response'});
  }

  getWalletBalance(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/walletbalance/'+id,{observe:'response'});
  }

  getWalletCards():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/card',{observe:'response'}); 
  }

  getWalletCardDetails(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/card/'+id,{observe:'response'}); 
  }

  buycard(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/buycard',formdata,{observe:'response'}); 
  }

  addToWishlist(data,Qty):Observable<HttpResponse<any>>{
    let formdata = {"IsFromMobile":1,"IsWishingItem":true,"CartDetails":[{"ItemId":data.name.ItemId,"Qty":Qty,"ItemRateSetupId":data.selected.ItemRateSetupId}]};
    return this.http.post<any>(environment.baseurl1+'/getcart',formdata,{observe:'response'}); 
  }

  getAddUsingPin(pin):Observable<HttpResponse<any>>{
    return this.http.get<any>('https://api.postalpincode.in/pincode/'+pin,{observe:'response'});
  }

  addAddress(formadata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/addshipaddress',formadata,{observe:'response'}); 
  }

  getcontrycode(name):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/setting/countryutility?Id='+name+'&CodeFor=shopping',{observe:'response'});
  }

  getSavedAdd(userid):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/getshipaddress?userid='+userid,{observe:'response'}); 
  }

  getDefaultAdd(userid):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/defaultaddress/'+userid,{observe:'response'}); 
  }

  deleteAdd(id):Observable<HttpResponse<any>>{
    let formdata = {"shippingid":id};
    return this.http.post<any>(environment.baseurl1+'/deleteshippingaddress/'+id,formdata,{observe:'response'});
  }

  // getSavedAdd(filter = null):Observable<HttpResponse<any>>{
  //   if(filter){
  //     return this.http.get<any>(environment.baseurl1+'/getSavedAdd?IsDefault=1',{observe:'response'}); 
  //   }
  //   return this.http.get<any>(environment.baseurl1+'/setting/Address',{observe:'response'}); 
  // }

  delSavedAdd(id):Observable<HttpResponse<any>>{
    return this.http.delete<any>(environment.baseurl1+'/setting/Address?Id='+id,{observe:'response'}); 
  }

  checkCoupon(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/applycoupon',formdata,{observe:'response'});
  }

  getCouponList(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/SP_GetCouponList',formdata,{observe:'response'});
  }
  
  buy(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/ordersql',formdata,{observe:'response'});
  }

  buySuccess(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/callbackpayumoneybyapp',formdata,{observe:'response'});
  }
  /* buySuccess(formdata):Observable<HttpResponse<any>>{
  	let myQuery = ''
    for (let entry in formdata) {
        myQuery += entry + '=' + encodeURIComponent(formdata[entry]) + '&';
    }
    // remove last '&'
    myQuery = myQuery.substring(0, myQuery.length-1)  	
    return this.http.get<any>(environment.baseurl1+'/callbackpayumoney?'+myQuery,{observe:'response'});
  }*/

  orderHistory(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/orderlist/'+id,{observe:'response'}); 
  }

  orderHistoryItemDetail(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/orders/'+id,{observe:'response'}); 
  }

  search(text):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/search?search='+text,{observe:'response'}); 
  }

  getProfileData(id=null):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/profile?userid='+id,{observe:'response'});
  }

  updateProfile(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/updateprofile',formdata,{observe:'response'});
  }

  getPriceRange():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/SP_ItemChargeTransaction',{observe:'response'}); 
  }

  Txnhistory(id):Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/wallethistory/'+id,{observe:'response'}); 
  }

  WalletCardType():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/setting/WalletCardType',{observe:'response'}); 
  }

  Item():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/Item?IsWithRegistration=1',{observe:'response'}); 
  }

  WalletTopupMaster(WalletCardId):Observable<HttpResponse<any>>{  	
    return this.http.get<any>(environment.baseurl1+'/setting/WalletTopupMaster?WalletCardId='+WalletCardId,{observe:'response'}); 
  }

  walletTopup(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/Customer/WalletTopupByAdmin',formdata,{observe:'response'});
  }

  walletTopupPayment(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/Customer/callbackpayumoneybytopupbyapp',formdata,{observe:'response'});
  }

  milkTopup(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/TopupProduct',formdata,{observe:'response'});
  }

  milkTopupPayment(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/callbackpayumoneybytopupproductbyapp',formdata,{observe:'response'});
  }

   walletupgrade(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/Customer/WalletUpgrade',formdata,{observe:'response'});
  }

  walletupgradePayment(formdata):Observable<HttpResponse<any>>{
    return this.http.post<any>(environment.baseurl1+'/common/Customer/callbackpayumoneybywalletupgradebyapp',formdata,{observe:'response'});
  }


  vendoragent():Observable<HttpResponse<any>>{
    return this.http.get<any>(environment.baseurl1+'/category?WorkDomain=pagaprint.pe.hu',{observe:'response'}); 
  }

  cancelOrder(oid,iid = 0,remarks = null){
    return this.http.get<any>(environment.baseurl1+'/SP_UpdateItemBuyNowStatus?OrderId='+oid+'&RowID='+iid+'&Status=3&Remark='+remarks+'&CustomerLoginID='+localStorage.getItem('userdata')?JSON.parse(localStorage.getItem('userdata')).CustomerLoginId:'',{observe:'response'});
  }

  rateAndReview(formdata,itemId=null){
  	if(formdata){
      return this.http.post<any>(environment.baseurl1+'/SP_BuyNowReview',formdata,{observe:'response'});
    }
    return this.http.get<any>(environment.baseurl1+'/SP_GetBuyNowReview?ItemID='+itemId,{observe:'response'});
  }

  // getBanner(){
  //   return this.http.get<any>(environment.baseurl1+'/BannerImages',{observe:'response'});
  // }

  getBanner(){
    return this.http.get<any>(environment.baseurl1+'/homegallery',{observe:'response'});
  }

  getCoupon(){
    return this.http.get<any>(environment.baseurl1+'/couponcode',{observe:'response'});
  }

  getBrand(){
    return this.http.get<any>(environment.baseurl1+'/Brand',{observe:'response'});
  }

  getBrandItems(id){
    return this.http.get<any>(environment.baseurl1+'/SP_FrontendAllItems?BrandIds='+id,{observe:'response'});
  }

  getMenuCategory(){
  	return this.http.get<any>(environment.baseurl1+'/category',{observe:'response'});
  }

  getAllSharedCustomer(formdata){
  	let myQuery = ''
    for (let entry in formdata) {
        myQuery += entry + '=' + encodeURIComponent(formdata[entry]) + '&';
    }    
    myQuery = myQuery.substring(0, myQuery.length-1)  

  	return this.http.get<any>(environment.baseurl1+'/common/RefLink?'+myQuery,{observe:'response'});
  }
  shareCustomer(formdata){ 	 
  	return this.http.post<any>(environment.baseurl1+'/common/RefLink',formdata,{observe:'response'});
  }
  getCards(){
  	return this.http.get<any>(environment.baseurl1+'/setting/WalletCardType',{observe:'response'});
  }

}
















