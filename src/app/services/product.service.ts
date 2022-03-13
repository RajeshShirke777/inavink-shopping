import { Injectable } from "@angular/core";
import { Observable, observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { ListRequest } from "../shared/requests/list-request";
import { ProductListResponse } from "../shared/responses/product-list-response";
import { ProductDetailsResponse } from "../shared/responses/product-details-response";


@Injectable({
    providedIn:"root"
})

export class ProductService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService ){        
        }
        

    listProduct(productListRequest: ListRequest) : Observable<ProductListResponse>{
        return this.http.post<ProductListResponse>(baseURL+'api/Request/listproduct', productListRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getProduct(productId:number) : Observable<ProductDetailsResponse>{
        return this.http.get<ProductDetailsResponse>(baseURL+'api/Request/getProductDetails?id='+ productId)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    
}