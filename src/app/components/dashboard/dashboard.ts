import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [Header, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  nombre: string = '';
  apellido: string = '';

  constructor(private http: HttpClient) {}

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
      this.crearGraficagenero();
      this.crearGraficamayorde30();
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

  crearGraficagenero() {
    const hombres = this.pacientes().filter((pacientes) => pacientes.gender == 'male').length;

    const mujeres = this.pacientes().filter((paciente) => paciente.gender == 'female').length;

    const canvas = document.getElementById('graficaPacientes') as HTMLCanvasElement;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Hombre', 'Mujeres'],

        datasets: [
          {
            label: 'Pacientes',
            data: [hombres, mujeres],
            backgroundColor: ['#42A5F5', '#EC407A'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  crearGraficamayorde30() {
    const mayor30 = this.pacientes().filter((pacientes) => pacientes.age > 30).length;
    const menor30 = this.pacientes().filter((pacientes) => pacientes.age < 30).length;

    const canvas = document.getElementById('graficaedad') as HTMLCanvasElement;

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Mayores a 30', 'Menores a 30'],
        datasets: [
          {
            label: 'Grafica Mayores de 30',
            data: [mayor30, menor30],
            backgroundColor: ['#42A5F5', '#EC407A'],
          },
        ],
      },
      options: {
        responsive: true,
      },
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
