import { Component, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentChecked {

  //user$ = this.usersService.currentUserProfile$;
  userUid: string = ''

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngAfterContentChecked(): void {
    this.userUid = localStorage.getItem('userId') ?? ''
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    })
  }
}
