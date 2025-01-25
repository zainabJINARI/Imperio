import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  constructor(private router:Router){}


  goDown() {
    this.router.navigate([], { fragment: "explorecars" }).then(() => {
      const element = document.getElementById('explorecars');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
