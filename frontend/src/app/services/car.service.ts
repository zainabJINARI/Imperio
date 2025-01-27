import { Injectable, OnInit } from '@angular/core';
import { Car } from '../models/Car';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService implements OnInit {
  cars: Car[] = []
  baseUrl: string = 'http://localhost:8080/api/cars'

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }


  /**
   * Retrieves authentication headers with the JWT token.
   * If the token is missing or expired, the user is redirected to the login page.
   * @returns HttpHeaders with the Authorization token or redirects to login if invalid.
   */
  private getAuthHeaders() {
    const token = this.auth.getToken();


    console.log(token)
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });


    } else {
      alert('The  session is expired you should relog in')
      localStorage.clear()
      this.router.navigateByUrl('/login')

    }
    return


  }


 /**
   * Fetches a paginated list of cars, with optional filtering by availability.
   * @param page The page number.
   * @param size The number of cars per page.
   * @param available Optional filter to get only available cars.
   * @param callback A callback function that receives the fetched data.
   */
  public getCars(page: number, size: number, available: any = null, callback = (data: any) => { }) {



    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())

    if (available != null) {
      let boolValue: boolean = Boolean(available);

      params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('available', `${boolValue}`);

    }


    this.http.get<any>(`${this.baseUrl}/all`, { params }).subscribe({
      next: (data) => {
        let returedData = JSON.parse(JSON.stringify(data))
        this.cars.push(...returedData.items)
        callback(returedData)

      },
      error: (error) => {
        alert('Error while trying to get cars ' + error)

      }

    })

  }

   /**
   * Deletes a car by its ID and updates the local cars list.
   * @param id The ID of the car to delete.
   * @param callback A callback function executed after successful deletion.
   */
  public deleteCar(id: number, callback = () => { }) {
    // get the token and check if it's still valid or it's expired
    let headersData = this.getAuthHeaders()

    if (!headersData) {
      return

    }

    this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: headersData }).subscribe({
      next: () => {
        this.cars = this.cars.filter(c => c.id != id)
        callback()

      },
      error: () => {
        alert('error while trying to delete car')
      }
    })

  }

/**
   * Retrieves a car by its ID from the local cars list.
   * @param id The ID of the car to retrieve.
   * @returns The car object if found, otherwise undefined.
   */
  public getCarById(id: number) {
    return this.cars.find(c => c.id == id)
  }

  /**
   * Adds a new car by sending a FormData object to the backend.
   * @param carData The form data containing the car details.
   * @param callback A callback function executed after the car is successfully created.
   */

  public addCar(carData: FormData, callback = (arg: any) => { }) {

    let headersData = this.getAuthHeaders()

    if (!headersData) {
      return

    }

    this.http.post<number>(this.baseUrl, carData, { headers: headersData }).subscribe({
      next: (id) => {
        let carObject: any = {};

        carData.forEach((value, key) => {
          carObject[key] = value;
        });
        carObject.id = id;
        carObject.available = true
        this.cars.push(carObject);

        callback(id)

      },
      error: () => {
        alert('Erro while trying to create car ')
      }
    })





  }


  /**
   * Updates an existing car by sending a FormData object with new details.
   * @param id The ID of the car to update.
   * @param carData The form data containing updated car details.
   * @param callback A callback function executed after the car is successfully updated.
   */
  public editCar(id: number, carData: FormData, callback = (arg: any) => { }) {
    let headersData = this.getAuthHeaders()

    if (!headersData) {
      return

    }


    this.http.put<any>(`${this.baseUrl}/${id}`, carData, { headers: headersData }).subscribe({
      next: (updatedCar) => {
        console.log(carData)



        this.cars = this.cars.map((c) => {
          // if the returned updated car doesn't hold a value in the picture then the picture didn't change
          if (!updatedCar.picture) {
            updatedCar.picture = c.picture
          }
          return c.id == updatedCar.id ? updatedCar : c

        })

        callback(updatedCar)

      },
      error: () => {
        alert('Erro while trying to update car ')
      }
    })
  }



  ngOnInit(): void {
    this.getCars(0, 8)

  }
}
