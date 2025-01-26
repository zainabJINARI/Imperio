import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router:Router, private auth:AuthService){

  }
onLogout() {
this.auth.logout(()=>{
  this.router.navigateByUrl('/login')
})
}

}
