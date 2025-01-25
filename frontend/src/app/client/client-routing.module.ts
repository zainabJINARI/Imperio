import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { ExploreCarsPageComponent } from './components/explore-cars-page/explore-cars-page.component';

const routes: Routes = [
  {
    path:'',
    component:ClientComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'cars',
        component:ExploreCarsPageComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
