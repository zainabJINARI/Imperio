import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/sub-components/header/header.component';
import { FooterComponent } from './components/sub-components/footer/footer.component';
import { HeroSectionComponent } from './components/sub-components/hero-section/hero-section.component';
import { BrandSectionComponent } from './components/sub-components/brand-section/brand-section.component';
import { CarsSectionComponent } from './components/sub-components/cars-section/cars-section.component';
import { ExploreCarsPageComponent } from './components/explore-cars-page/explore-cars-page.component';
import { RouterOutlet } from '@angular/router';
import { BrandCardComponent } from './components/sub-components/brand-card/brand-card.component';
import { CarCardComponent } from './components/sub-components/car-card/car-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    
  
    ClientComponent,
              HomeComponent,
              HeaderComponent,
              FooterComponent,
              HeroSectionComponent,
              BrandSectionComponent,
              CarsSectionComponent,
              ExploreCarsPageComponent,
              BrandCardComponent,
              CarCardComponent,
              
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterOutlet,
    NgFor,
    SharedModule
  ]
})
export class ClientModule { }
