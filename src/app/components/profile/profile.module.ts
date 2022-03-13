//leaves.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ManageAddressComponent } from './manage-address/manage-address.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ManageAddressComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNSfDuFx6KHTrx2MyfLP6JIJ1l3wOJCaQ',
      libraries: ['places', 'geometry']
    }),    
    MatGoogleMapsAutocompleteModule,
  ]
})
export class ProfileModule { }
