import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
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

  getToken():string{
   
    
    let token = JSON.parse(localStorage.getItem('token') || '') ? JSON.parse(localStorage.getItem('token') || '')['access-token']: ''
    console.log(token)
    return this.verifyToken(token) ? token : null
  }

  verifyToken(token:string){

    if (!token) {
      console.error("Token is missing!");
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      // Current timestamp in seconds
      const currentTime = Math.floor(Date.now() / 1000); 
      // Check if token is still valid
      return decoded.exp > currentTime; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  

  }
  logout(callback=()=>{}){

    this.http.post<any>(`${this.baseUrl}/logout`,null).subscribe({
      next:(response)=>{
        localStorage.clear()
        alert(`${JSON.stringify(response)}`)
        callback()


      },
      error:(error)=>{
        
        alert('error while trying to log out '+error)
      }
    })

  }

}


