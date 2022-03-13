import { Injectable } from '@angular/core';
import { Place } from 'src/app/shared/models/place';

export class Settings {
    constructor(public name: string,
                public theme: string,
                public rtl: boolean,
                public defaultPlace:Place ) { }
}

@Injectable()
export class AppSettings {
    public place:Place= { 
        name:'Mulund West',
        formatted_address:'Mulund West, Mumbai, Maharashtra, India',
        lat: 19.1725542,
        lng: 72.942537,
        place_id:'ChIJA4D_CvK45zsRWTZrGK5NKhY',
        postal_code:''
    };
    public settings = new Settings(
        'Sophia',  // theme name
        'orange',     // green, blue, red, pink, purple, grey
        false ,
        this.place
    )
}