import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../RegistrationRequest';
import { Observable } from 'rxjs';
import { User } from '../User';
import { UpdateEmployeeRequest } from '../UpdateEmployeeRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8088/api/v1/admin'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem("accessToken");
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  registerEmployee(request: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-employee`, request, { headers: this.getAuthHeaders() });
  }

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/employees`, { headers: this.getAuthHeaders() });
  }

  updateEmployee(id: number, request: UpdateEmployeeRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-employee/${id}`, request, { headers: this.getAuthHeaders(),
      responseType: 'text' 

     });
  }

 
  disableEmployee(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/disable-employee/${id}`, null, { 
      headers: this.getAuthHeaders(),
      responseType: 'text' 
    });
  }
  

  enableEmployee(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/enable-employee/${id}`, null, { headers: this.getAuthHeaders() });
  }
}