import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';

@Component({
  selector: 'app-pacientes',
  imports: [FormsModule, Header],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  usuariosFiltrados = signal<any[]>([]);
  nombre: string = '';
  apellido: string = '';

  constructor(private http: HttpClient) {}

  pacientes = signal<any[]>([]);
  modalabierto: boolean = false;
  modalabiertoeditar: boolean = false;
  modalborrar: boolean = false;
  pacienteSelecciona: any = null;
  textobuscar: string = '';

  ngOnInit() {
    this.cargarpacientes();
  }

  cargarpacientes() {
    this.http.get('https://dummyjson.com/users').subscribe((data: any) => {
      this.pacientes.set(data.users);
      this.usuariosFiltrados.set(data.users);
      console.log(this.pacientes);
    });
  }

  editarpacientes() {
    this.http
      .patch(`https://dummyjson.com/users/${this.pacienteSelecciona.id}`, {})
      .subscribe((data: any) => {
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


  buscaruser() {
    const texto = this.textobuscar.toLocaleLowerCase().trim();
    this.usuariosFiltrados.set(
      this.pacientes().filter(
        (paciente) =>
          paciente.firstName.toLowerCase().includes(texto) ||
          paciente.lastName.toLowerCase().includes(texto) ||
          paciente.username.toLowerCase().includes(texto),
      ),
    );
  }
}
