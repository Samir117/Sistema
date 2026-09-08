import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
interface Permiso {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [Header, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  nombre: string = '';
  apellido: string = '';
  usuariosFiltrados = signal<any[]>([]);
  pacientes = signal<any[]>([]);
  id: number;
  nombrepermiso: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarpacientes();
  }

  cargarpacientes() {
    this.http.get('https://dummyjson.com/users').subscribe((data: any) => {
      this.pacientes.set(data.users);
      this.usuariosFiltrados.set(data.users);
      this.crearGraficagenero();
      this.crearGraficamayorde30();
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
        plugins: {
          title: {
            display: true,
            text: 'Grafica de Hombres y Mujeres',
            color: '#4776BF',
            font: {
              size: 16,
              family: 'tahoma',
              weight: 'bold',
              style: 'normal',
            },
          },
        },
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

  permisosDisponibles: Permiso[] = [
    { id: 1, nombre: 'Crear usuarios' },
    { id: 2, nombre: 'Editar usuarios' },
    { id: 3, nombre: 'Eliminar usuarios' },
    { id: 4, nombre: 'Consultar usuarios' },
    { id: 5, nombre: 'Usuarios' },
    { id: 6, nombre: 'Cambiar contrasñea' },
    { id: 7, nombre: 'Gestionar usuarios' },
  ];

  permisosActivos: Permiso[] = [];

  activarPermiso(permiso: any) {
    const yaActivo = this.permisosActivos.some((p) => p.id == permiso.id);
    if (yaActivo) {
      this.permisosActivos = this.permisosActivos.filter((p) => p.id !== permiso.id);
    } else {
      this.permisosActivos.push(permiso);
    }
  }
  desactivarPermiso(permiso: any) {
    this.permisosActivos = this.permisosActivos.filter((p) => p.id !== permiso.id);
  }

  contenidoActivo: string = 'Detalles';

  cambiarContenido(contenido: string): void {
    this.contenidoActivo = contenido;
  }

  estaActivo(permiso: any): boolean {
  return this.permisosActivos.some(
    (p: any) => p.id === permiso.id
  );
}
}
