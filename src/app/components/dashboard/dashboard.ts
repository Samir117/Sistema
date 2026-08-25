import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  imports: [Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private http: HttpClient) {
  }

  pacientes = signal<any[]>([]);
  modalabierto: boolean = false;
  pacienteSelecciona: any = null;

  ngOnInit() {
    console.log('SE EJECUTÓ NGONINIT');

    this.cargarpacientes();
  }


  cargarpacientes() {
    this.http.get('https://dummyjson.com/users')
      .subscribe((data: any) => {
        this.pacientes.set(data.users);
         console.log(this.pacientes);
      });
  }

  verdetalle(paciente: any) {
    this.pacienteSelecciona = paciente;
    this.modalabierto = true;
  }

  Actualizar(paciente: any){

  }

  Eliminar(paciente: any){

  }

  cerrarmodal() {
    this.pacienteSelecciona = null;
    this.modalabierto = false;
  }
}
