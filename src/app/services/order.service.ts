import { Injectable } from "@angular/core";
import { Observable, observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { ListRequest } from "../shared/requests/list-request";
import { HomeListResponse } from "../shared/responses/home-list-response";
import { CancelOrderRequest, OrderHistoryRequest, OrderListRequest, OrderRequest } from "../shared/requests/order-request";
import { CancelOrderResponse, OrderHistoryResponse, OrderListResponse, OrderResponse } from "../shared/responses/order-response";
import { ProductOrder } from "../shared/models/product-order";


@Injectable({
    providedIn:"root"
})

export class OrderService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService ){        
    }

    getProductOrderDetails(productOrder:ProductOrder) : Observable<OrderResponse>{
        return this.http.post<OrderResponse>(baseURL+'api/Request/SubmitProductOrder', productOrder)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    submitOrder(productOrder:ProductOrder) : Observable<OrderResponse>{
        return this.http.post<OrderResponse>(baseURL+'api/Request/SubmitProductOrder', productOrder)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getOrderList(orderListRequest:OrderListRequest) : Observable<OrderListResponse>{
        return this.http.post<OrderListResponse>(baseURL+'api/Request/getCustomerOrdersV1', orderListRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
        
    getOrderHistoryDetails(orderHistoryRequest:OrderHistoryRequest) : Observable<OrderHistoryResponse>{
        return this.http.post<OrderHistoryResponse>(baseURL+'api/Request/getOrdersHistoryDetailsV1', orderHistoryRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    cancelOrder(cancelOrderRequest:CancelOrderRequest) : Observable<CancelOrderResponse>{
        return this.http.post<CancelOrderResponse>(baseURL+'api/Request/CancelProductOrder', cancelOrderRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    cancelOrderItem(cancelOrderRequest:CancelOrderRequest) : Observable<CancelOrderResponse>{
        return this.http.post<CancelOrderResponse>(baseURL+'api/Request/CancelOrder', cancelOrderRequest)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}