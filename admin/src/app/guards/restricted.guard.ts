import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RestrictedGuard implements CanActivate {

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){

  }

  canActivate():any{
    if(!this._adminService.isAuthenticated(['admin'])){
      this._router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
