import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';
import swal from 'sweetalert2';

@Injectable()
export class MyGuard implements CanActivate {
  loggedIn = false;
  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.isLogged()
      .subscribe((result) => {
        if (result && result.uid) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Necesitas Iniciar sesión!',
            footer: '<a href="/login">Go to Login</a>',
          });
        }
      }, (error) => {
        this.loggedIn = false;
        swal({
          type: 'error',
          title: 'Oops...',
          text: error,
          footer: '<a routerLink="/login">Go to Login</a>',
        });
      });
  }
  canActivate() {
    return this.loggedIn;
  }
}
