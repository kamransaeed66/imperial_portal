// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class RoleGuard implements CanActivate
{
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('/////////// Role Guard  ////////////');
    const userRole = localStorage.getItem('loggedIn');
    console.log('userRole', userRole);
    console.log('route.data.role', route.data.role);
    if (route.data.role !== userRole) {
      this.router.navigate(['/404']);
    }
    return true;
  }

}
