import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent {


   public carForm!: FormGroup;
    public isLoading:boolean=false
    private id!:number
    constructor(
      private fb: FormBuilder,
      private router:Router , 
      private carService:CarService,
      private routeActive:ActivatedRoute
    ) {}
  
    ngOnInit(): void {

      
      this.id = this.routeActive.snapshot.params['id']
      let car 
      if(this.id){
        car= this.carService.getCarById(this.id) 

      }
      
      console.log(this.routeActive.snapshot.params['id'])
      this.carForm = this.fb.group({
        brand: [car?.brand, Validators.required],
        model: [car?.model, Validators.required],
        pricePerDay: [ car?.pricePerDay, [Validators.required, Validators.min(1)]],
        available:[car?.available ?? true,[Validators.required]],
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
          formData.append('isAvailable',this.carForm.get('available')?.value)
          
          const imageFile = this.carForm.get('picture')?.value;
          if (imageFile) {
            formData.append('picture', imageFile);
          }
      
          
          this.carService.editCar(this.id,formData,()=>{
            this.isLoading=false
            this.router.navigateByUrl('/admin')
  
          })
        } else {
          alert('The form is invalid')
        }
      }
  

}
