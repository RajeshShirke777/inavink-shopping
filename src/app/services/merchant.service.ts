import { Injectable } from "@angular/core";
import { Observable, observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { ListRequest } from "../shared/requests/list-request";
import { MerchantDetailsResponse, MerchantListResponse } from "../shared/responses/merchant-list-response";
import { ProductListResponse } from "../shared/responses/product-list-response";


@Injectable({
    providedIn:"root"
})

export class MerchantService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService ){        
        }
        
    getMerchantDetails(id: number) : Observable<MerchantDetailsResponse>{
        return this.http.get<MerchantDetailsResponse>(baseURL+'api/Request/getMerchantDetails?mid='+ id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    } 

       
    getStoreDetails(name: string) : Observable<MerchantDetailsResponse>{
        return this.http.get<MerchantDetailsResponse>(baseURL+'api/Request/getStoreDetails?name='+ name)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getMerchants(merchantListRequest: ListRequest) : Observable<MerchantListResponse>{
        return this.http.post<MerchantListResponse>(baseURL+'api/Home/getMerchants', merchantListRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getMerchantsByProductId(listRequest: ListRequest) : Observable<MerchantListResponse>{
        return this.http.post<MerchantListResponse>(baseURL+'api/Request/getMerchantsByProductId', listRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}