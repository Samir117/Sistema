import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [Header,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  nombre: string ="";
  apellido: string ="";

  constructor(private http: HttpClient, ) {}

  pacientes = signal<any[]>([]);
  modalabierto: boolean = false;
  modalabiertoeditar: boolean = false;
  modalborrar: boolean = false;
  pacienteSelecciona: any = null;

 

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
      {
        

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
