import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../AuthenticationRequest';
import { AuthenticationResponse } from '../AuthenticationResponse';
import { Observable } from 'rxjs';
import { RegistrationRequest } from '../RegistrationRequest';
import { User } from '../User';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   private apiUrl = 'http://localhost:8088/api/v1/auth';
   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request);
  }
  getPrincipal(): Observable<User> {
    if (isPlatformBrowser(this.platformId)) {  // Check if running in browser
      const token = localStorage.getItem('accessToken');  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<User>(`${this.apiUrl}/me`, { headers });
    } else {
      // Handle the case when not in the browser (SSR)
      return new Observable<User>(); // Return an empty observable or handle the case appropriately
    }
  }

  getById(id: number): Observable<User> {
    const token = localStorage.getItem('accessToken');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  

    return this.http.get<User>(`${this.apiUrl}/user/${id}`, { headers });
  }

  sendResetCode(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgot-password?email=${email}`, {}, {
        responseType: 'text' as 'json'  
    });
}
resetPassword(code: string, newPassword: string): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/reset-password?code=${code}&newPassword=${newPassword}`, {}, {
    responseType: 'text' as 'json'
  });
}
registerClient(request: RegistrationRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, request);
}
activateAccount(token: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/activate-account?token=${token}`);
}

  

}
