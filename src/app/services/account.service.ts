import { Injectable } from "@angular/core";
import { Observable, observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, SignUpRequest } from "../shared/requests/account-request";
import { LoginResponse, ForgotPasswordResponse, ResetPasswordResponse,SignUpResponse, CustomerAddressResponse } from "../shared/responses/account-response";
import { CustomerAddress } from "../shared/models/customer-address";


@Injectable({
    providedIn:"root"
})

export class AccountService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService ){        
        }
        
        sendTokenToBackend(token:string) : Observable<SignUpResponse>{
            
    return this.http.post<any>(baseURL+'api/Request/checkRecaptcha', {recaptcha: token})
            .pipe(catchError(this.processHTTPMsgService.handleError));
        }
    signUp(request:SignUpRequest) : Observable<SignUpResponse>{
        return this.http.post<SignUpResponse>(baseURL+'api/Request/SignUp', request)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    login(request:LoginRequest) : Observable<LoginResponse>{
        return this.http.post<LoginResponse>(baseURL+'api/Request/Login', request)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    forgotPassword(request:ForgotPasswordRequest) : Observable<ForgotPasswordResponse>{
        return this.http.post<ForgotPasswordResponse>(baseURL+'api/Request/ForgotPassword', request)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    resetPassword(request:ResetPasswordRequest) : Observable<ResetPasswordResponse>{
        return this.http.post<ResetPasswordResponse>(baseURL+'api/Request/ResetPassword', request)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getAddressList(id:number) : Observable<CustomerAddressResponse>{
        return this.http.get<CustomerAddressResponse>(baseURL+'api/Request/getaddresslist?id='+id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    saveAddress(request:CustomerAddress) : Observable<CustomerAddressResponse>{
        return this.http.post<CustomerAddressResponse>(baseURL+'api/Request/saveAddress', request)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}