/**
 * Created by admin on 2017/9/28.
 */
import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { SessionKey } from  './public/publicData';
import { Router } from '@angular/router';
@Injectable()
export class RoleService implements CanActivate {
  constructor(
    private router:Router
  ){

  }
  canActivate() {
    if(sessionStorage.getItem(SessionKey.ROLE)=='3'){
      this.router.navigate(['layout/section1/02']);
      return false;
    }else if(sessionStorage.getItem(SessionKey.ROLE)=='4'){
      this.router.navigate(['layout/section1/03']);
      return false;
    }else{
      return true
    }
  }
}
