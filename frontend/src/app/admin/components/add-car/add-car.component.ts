import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {

  public carForm!: FormGroup;
  public isLoading:boolean=false
  constructor(
    private fb: FormBuilder,
    private router:Router , 
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      pricePerDay: [0, [Validators.required, Validators.min(1)]],
      picture: '', 
     
    });

   
  }


  
  onFileChangeImg(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
  
    if (file) {
      this.carForm.patchValue({ picture: file });
      this.carForm.get('picture')?.updateValueAndValidity();
    }
  }
    saveCar() {
      if (this.carForm.valid) {
        this.isLoading=true
        
        const formData = new FormData();
        formData.append('brand', this.carForm.get('brand')?.value);
        formData.append('model', this.carForm.get('model')?.value);
        formData.append('pricePerDay', this.carForm.get('pricePerDay')?.value);
       
        
        const imageFile = this.carForm.get('picture')?.value;
        if (imageFile) {
          formData.append('picture', imageFile);
        }
    
        
        this.carService.addCar(formData,()=>{
          this.isLoading=false
          this.router.navigateByUrl('/admin')

        })
      } else {
        alert('The form is invalid')
      }
    }


}
