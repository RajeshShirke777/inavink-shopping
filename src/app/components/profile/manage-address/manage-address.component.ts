import { Component, OnInit,ViewEncapsulation, ElementRef, ViewChild, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {Meta, Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Prediction } from 'src/app/shared/models/prediction';
import { HomeService } from 'src/app/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CustomerAddress } from 'src/app/shared/models/customer-address';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {

  formGroup: FormGroup;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  filteredJSONDataOptions: any[];
  //txtLocationDetails = new FormControl();
public m:marker={
  draggable:true,
    lat:0,
    lng:0,
    label:'',
};
  geoCoder: google.maps.Geocoder;
  userId: number;
  AddressList: CustomerAddress[];
  CustomerAddress: CustomerAddress={
    id:0,
    address_line_1:'',
    address_line_2:'',
    address_type:'',
    contact_name:'',
    contact_no:'',
    is_deleted:false,
    lat:0,
    lng:0,
    location_details:'',
    user_id:0
  };

  constructor(private homeService:HomeService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router , 
    private accountService:AccountService,
    private customValidator:CustomValidationService,
    private titleService: Title,
    private metaTagService: Meta,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object) { 
      if (isPlatformBrowser(this.platformId)) {
    var userData = localStorage.getItem("user") ;
      if(userData === null || userData === undefined || userData === "undefined"){
        //this.isLoggedIn=false;
        //this.userId= 56;
        this.router.navigate(['/accounts/login'], { queryParams: { returnUrl: '/profile/manage-address' }});
      }
      else{
        var user = JSON.parse(localStorage.getItem("user")) ;
        this.userId=user.id;
        this.CustomerAddress={
          id:0,
          user_id:this.userId,
          lat:0,
          lng:0,
          address_type:'Home',
          location_details:'',
          address_line_1:'',
          address_line_2:'',
          contact_name:'',
          contact_no:'',
          is_deleted:false
        };
      }
    }
    }

  ngOnInit() {
    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
    this.metaTagService.updateTag(    
      { name: 'title', content: 'Buy Online from Local Shops Near you | Vocal for Local | Near Me' });   
    this.metaTagService.updateTag(
      { name: 'description', content: 'Be Vocal for Local, now checkout and Shop Online from Local Shops near me. One of the Best of India Shopping site to support Local stores'  });
    this.metaTagService.updateTag(
      { name:  'robots', content: 'index, follow' });
    this.metaTagService.updateTag(
      { name: 'author', content: 'InAVink' });
    this.metaTagService.updateTag(
      { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
    this.metaTagService.updateTag(
      { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'}); 
    this.createForm();
    this.zoom = 16;
    this.latitude = 19.197371371120543;
    this.longitude = 72.97032659845583;
    this.zoom = 16;
    this.m.draggable=true;
    this.m.lat=this.latitude;
    this.m.lng=this.longitude;
    this.m.label='';

    this.setCurrentPosition();
    this.getAddressList();

  }

  getAddressList(){
    this.accountService.getAddressList(this.userId).subscribe(data =>
      {
          this.AddressList = data.addressList;
      });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'locationDetails': ['',Validators.required],
      'addressLine1': ['',Validators.required],
      'addressLine2': ['',Validators.required],
      'contactName': ['',Validators.required],
      'contactNo': ['',Validators.compose([Validators.required, this.customValidator.mobileNoValidator()])],
      'addressType': ['Home',Validators.required],
    });
  }

  getError(el) {
    switch (el) {
      case 'locationDetails':
        if (this.formGroup.get('locationDetails').hasError('required')) {
          return 'location details required';
        }
        break;
      case 'addressLine1':
        if (this.formGroup.get('addressLine1').hasError('required')) {
          return 'Address Line 1 required';
        }
        break;
      case 'addressLine2':
        if (this.formGroup.get('addressLine2').hasError('required')) {
          return 'Address Line 2 required';
        }
        break;
      case 'contactName':
        if (this.formGroup.get('contactName').hasError('required')) {
          return 'Contact name required';
        }
        break;
      case 'contactNo':
        if (this.formGroup.get('contactNo').hasError('required')) {
          return 'Contact no required';
        }
        break;
      case 'addressType':
        if (this.formGroup.get('addressType').hasError('required')) {
          return 'address type required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(post) {

    if(this.formGroup.valid === true){ 
    console.log(post);
    var customerAddress:CustomerAddress = {
      id:this.CustomerAddress.id,
      user_id:this.userId,
      lat:this.latitude,
      lng:this.longitude,
      address_type:post.addressType,
      location_details:post.locationDetails,
      address_line_1:post.addressLine1,
      address_line_2:post.addressLine2,
      contact_name:post.contactName,
      contact_no:post.contactNo,
      is_deleted:false
    };

    this.accountService.saveAddress(customerAddress).subscribe(data =>
      {
        if(data.status == "success"){
          this.CustomerAddress = data.customer_address;
          this.snackBar.open("Address saved successfully", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          this.getAddressList();
        }
        else{
          this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
          
        }
      });
    }
    else{
      this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
          
    }
  } 

  public resetForm(){
    this.formGroup.reset();
    this.formGroup.get('addressType').patchValue('Home');
    this.CustomerAddress = {
      id:0,
      user_id:this.userId,
      lat:0,
      lng:0,
      address_type:'Home',
      location_details:'',
      address_line_1:'',
      address_line_2:'',
      contact_name:'',
      contact_no:'',
      is_deleted:false
    };
  }

  public editAddress(address:CustomerAddress){
    
    console.log(address);
    this.CustomerAddress =address;
    this.latitude = parseFloat(this.CustomerAddress.lat.toString());
        this.longitude = parseFloat(this.CustomerAddress.lng.toString());
        this.zoom = 16;
        this.m.draggable=true;
        this.m.lat=this.latitude;
        this.m.lng=this.longitude;
        this.m.label='';

    this.formGroup.get('addressType').patchValue(this.CustomerAddress.address_type);
    this.formGroup.get('locationDetails').patchValue(this.CustomerAddress.location_details);
    this.formGroup.get('addressLine1').patchValue(this.CustomerAddress.address_line_1);
    this.formGroup.get('addressLine2').patchValue(this.CustomerAddress.address_line_2);
    this.formGroup.get('contactName').patchValue(this.CustomerAddress.contact_name);
    this.formGroup.get('contactNo').patchValue(this.CustomerAddress.contact_no);
    this.snackBar.open("Address loaded successfully", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
          
  }

  public deleteAddress(address:CustomerAddress){
    console.log(address);
    address.is_deleted=true;

    this.accountService.saveAddress(address).subscribe(data =>
      { 
        if(data.status == "success"){
        this.CustomerAddress = {
          id:0,
          user_id:this.userId,
          lat:0,
          lng:0,
          address_type:'Home',
          location_details:'',
          address_line_1:'',
          address_line_2:'',
          contact_name:'',
          contact_no:'',
          is_deleted:false
        };
        this.snackBar.open("Address deleted successfully", '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
        this.getAddressList();
        }
      else{
        this.snackBar.open("Invalid details", '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        
        }
      });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.m.draggable=true;
        this.m.lat=this.latitude;
        this.m.lng=this.longitude;
        this.m.label='';
        this.homeService.getPlaceDetailsByLatLng(this.m.lat,this.m.lng).subscribe(
          data => {
            this.formGroup.get('locationDetails').patchValue(data.place.formatted_address);
          });
      });
    }
  }

  public onSelectedPlace(value: Prediction): void {
    //console.log(event); 
    // //.value.description = "test";
    //event.option.deselect();
    if(value.place_id == "0") {
      
      this.formGroup.get('locationDetails').patchValue("");
      this.setCurrentPosition();
    }
    else {
      
    this.homeService.getPlaceDetails(value.place_id).subscribe(
      data => { 
        console.log(data.place.lat);
        this.latitude = parseFloat(data.place.lat.toString());
        this.longitude = parseFloat(data.place.lng.toString());
        this.zoom = 16;
        this.m.draggable=true;
        this.m.lat=this.latitude;
        this.m.lng=this.longitude;
        this.m.label='';
      }   
  );
    }
  }

  public getAutocompletePredictions()  {
    if(this.formGroup.get('locationDetails').value.length<2) {
        console.log('query is too short, bye');
        return [];
    }        
    this.getPlacePredictions(this.formGroup.get('locationDetails').value)
        .then(data => {
          this.filteredJSONDataOptions =data;
        })
        .catch(err => console.log(err));
}

  private getPlacePredictions(query: string): Promise<any> {
    
    let newList = [];
    let autocompleteSrv = new google.maps.places.AutocompleteService();
    return new Promise((resolve, reject) => {
        autocompleteSrv.getPlacePredictions({
            input: query
        }, function (predictions, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {

              predictions.forEach(element => {
        
                newList.push({'description': element.description, 'place_id': element.place_id , 'name':'' });
        
                });
                console.log(newList);
                resolve(newList);
            } else {
                reject(status);
            }
        });
    });
}  

  markerDragEnd(m: marker, $event: google.maps.MouseEvent) {
    this.latitude = $event.latLng.lat();
        this.longitude = $event.latLng.lng()
    this.m.lat=$event.latLng.lat();
    this.m.lng=$event.latLng.lng()
    this.homeService.getPlaceDetailsByLatLng(this.m.lat,this.m.lng).subscribe(
      data => {
        this.formGroup.get('locationDetails').patchValue(data.place.formatted_address);
      });
    console.log('dragEnd', m);
  }

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}