import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './service/api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  location: any;
  constructor(
    private authService : ApiService,
    private router : Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }else{
        if(state.url === "/login" || state.url === ""){
          this.router.navigate(['/dashboard']);
        }
        return true;
      }
    }
}
