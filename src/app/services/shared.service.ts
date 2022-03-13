import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Place } from "../shared/models/place";
import { Prediction } from "../shared/models/prediction";
import { User } from "../shared/models/user";


@Injectable({
    providedIn:"root"
})

export class SharedService {
    public data:any;
    public place:Place;
    public orderSuccessMessage:string='';
    public user:User;
    public sharingPlaceData = new Subject<Place>();
    public sharingLoginData = new Subject<boolean>();

    constructor() { }  
        


}