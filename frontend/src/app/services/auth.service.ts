import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/cars/auth'; // Adjust to your API's base URL
  constructor(private http: HttpClient) {}


/**
   * Authenticates the user by sending login credentials to the backend.
   * If successful, stores the JWT token in local storage.
   * @param username The username of the user.
   * @param password The password of the user.
   * @param callback A callback function executed after successful login.
   */
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

   /**
   * Retrieves the stored JWT token from local storage.
   * Verifies if the token is still valid before returning it.
   * @returns The JWT token if valid, otherwise null.
   */
  getToken():string{
   
    
    let token = JSON.parse(localStorage.getItem('token') || '') ? JSON.parse(localStorage.getItem('token') || '')['access-token']: ''
    console.log(token)
    return this.verifyToken(token) ? token : null
  }

   /**
   * Verifies the validity of a given JWT token by checking its expiration time.
   * @param token The JWT token to verify.
   * @returns True if the token is valid, otherwise false.
   */
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


   /**
   * Logs the user out by making a logout request to the backend.
   * Clears local storage and executes the provided callback.
   * @param callback A callback function executed after successful logout.
   */
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


