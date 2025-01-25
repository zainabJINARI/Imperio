import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/cars/auth'; // Adjust to your API's base URL
  constructor(private http: HttpClient) {}

  login(username: string, password: string,callback=()=>{}) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    this.http.post<any>(`${this.baseUrl}/login`, null, { params }).subscribe({
      next:(token)=>{
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token));
        callback()

      },
      error:()=>{

      }
    })
  }
  isAuthenticated(){

  }

}
