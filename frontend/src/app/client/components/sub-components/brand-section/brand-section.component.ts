import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-section',
  templateUrl: './brand-section.component.html',
  styleUrl: './brand-section.component.css'
})
export class BrandSectionComponent {
   luxuryCarBrands:any[] = [
    { name: "Rolls-Royce", logo: "brand_logos/rollsroyce.png" },
    { name: "Bentley", logo: "brand_logos/bentley.png" },
    { name: "Bugatti", logo: "brand_logos/bugatti.png" },
    { name: "Lamborghini", logo: "brand_logos/lamborghini.png" },
    { name: "Ferrari", logo: "brand_logos/ferrari.png" },
    { name: "Aston Martin", logo: "brand_logos/astonmartin.png" },
    { name: "Maserati", logo: "brand_logos/maserati.png" },
    { name: "Porsche", logo: "brand_logos/porche.png" },
    { name: "Mercedes-Maybach", logo: "brand_logos/mercedesmaybach.png" },
    { name: "Tesla", logo: "brand_logos/tesla.png" },
    { name: "Cadillac", logo: "brand_logos/cadillac.png" },
    { name: "Jaguar", logo: "brand_logos/jaguar.png" },
    { name: "Land Rover", logo: "brand_logos/landrover.png" },
    { name: "Koenigsegg", logo: "brand_logos/koenigsegg.png" },
];



}
