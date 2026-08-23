import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  /**
   * Estos parametros se pasan para recibir del form el usuario
   * la contraseña y el error que arroje la peticion http
   */
  username: string = "";
  password: string = "";
  error: string = "";
  loading: boolean = false;

  /**
   * Este constructor se genera para importar los servicios
   * de http que es lo que nos permitira realizar las peticiones al 
   * api para el login
   * y el route para redirrecionar al usuario luego del login
   * @param http 
   * @param router 
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  /**
   * Metodo para iniciar sesion validar usuario y password y
   * realizar consumo del api para el login
   */
  iniciarsesion() {
    if (!this.username || !this.password) {

      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Debe ingresar un usuario y una contraseña"
      });
      return;
    }
    this.loading = true;
    this.error = "";

    const body = {
      username: this.username,
      password: this.password
    };



    /**
     * Aqui vamos a realizar el envio de los datos para login
     */
    this.http.post('https://dummyjson.com/auth/login', body).subscribe({

      //si funciona y es correcta las credenciales
      next: (response: any) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Bienvenid@ "+ this.username
        });

        //Se guarda el localstorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));

        //dirrecionamos luego del inicio de sesion
        this.router.navigate(['/dashboard']);

      },

      //si hay error
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseña o usuario incorrecto'
        });

        console.log(err);
        this.loading = false;

      }
    });


  }


}


