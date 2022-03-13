import { Injectable } from "@angular/core";
import { Observable, observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { ListRequest } from "../shared/requests/list-request";
import { HomeListResponse } from "../shared/responses/home-list-response";


@Injectable({
    providedIn:"root"
})

export class HomeService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService ){        
        }
        

    getBanners() : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/Get?type=Banners')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    searchProducts(productSearchRequest:ListRequest) : Observable<HomeListResponse>{
        return this.http.post<HomeListResponse>(baseURL+'api/Request/ProductSearch', productSearchRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
   

    getFeaturedProducts(latValue:number,longValue:number, pageNo: number) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/Get?type=FeaturedProducts&lat='+ latValue +'&long='+ longValue+'&pageno='+ pageNo+'&itemPerPage='+ 12)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getRecentlyAddedProducts(latValue:number,longValue:number, pageNo: number) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/Get?type=RecentlyAdded&lat='+ latValue +'&long='+ longValue+'&pageno='+ pageNo+'&itemPerPage='+ 12)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getNearbyStores(latValue:number,longValue:number, cid:number, key:string, pageNo: number) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/Get?type=NearbyStores&lat='
        + latValue +'&long='+ longValue+'&cid='+ cid+'&key='+ key+'&pageno='+ pageNo+'&itemPerPage='+ 12)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getCategories(categorylistRequest: ListRequest) : Observable<HomeListResponse>{
        //const headers = { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' };
        
            //let options = new RequestOptions({ headers: headers });
        return this.http.post<HomeListResponse>(baseURL+'api/Request/listcategorynew', categorylistRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
        // return this.http.post<HomeListResponse>('http://localhost:55885/api/Request/listCategoryNew', categorylistRequest)
        // .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPlaces(value:string) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/GetPlaces?searchtext=' + value)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPlaceDetails(value:string) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/GetPlaceDetails?placeid=' + value)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getProductKeywords(value:string) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/getProductKeywords?searchtext=' + value)
        .pipe(catchError(this.processHTTPMsgService.handleError));        
    }
    
    getPlaceDetailsByLatLng(lat:number, lng:number) : Observable<HomeListResponse>{
        return this.http.get<HomeListResponse>(baseURL+'api/Home/GetPlaceDetailsByLatLng?lat=' + lat+ '&long='+lng)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}