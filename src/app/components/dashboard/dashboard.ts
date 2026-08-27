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
  constructor(private http: HttpClient) {}

  pacientes = signal<any[]>([]);
  modalabierto: boolean = false;
  modalabiertoeditar: boolean = false;
  modalborrar: boolean = false;
  pacienteSelecciona: any = null;

  body: string = {};

  ngOnInit() {
    console.log('SE EJECUTÓ NGONINIT');

    this.cargarpacientes();
  }

  cargarpacientes() {
    this.http.get('https://dummyjson.com/users').subscribe((data: any) => {
      this.pacientes.set(data.users);
      console.log(this.pacientes);
    });
  }

  editarpacientes() {
    this.http.patch(
      `https://dummyjson.com/users/${this.pacienteSelecciona.id}`,
      {lastName: 'awais'

      }).subscribe((data: any) => {
        this.pacientes.set(data.users);
        console.log(this.pacientes);
      });
    
  }

  verdetalle(paciente: any) {
    this.pacienteSelecciona = paciente;
    this.modalabierto = true;
    this.modalabiertoeditar = false;
    this.modalborrar = false;
  }

  Actualizar(paciente: any) {
    this.pacienteSelecciona = paciente;
    this.modalabiertoeditar = true;
    this.modalabierto = false;
    this.modalborrar = false;
  }

  Eliminar(paciente: any) {
    this.pacienteSelecciona = paciente;
    this.modalabierto = false;
    this.modalabiertoeditar = false;
    this.modalborrar = true;
  }

  cerrarmodal() {
    this.pacienteSelecciona = null;
    this.modalabierto = false;
    this.modalabiertoeditar = false;
    this.modalborrar = false;
  }
}
