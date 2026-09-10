import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
interface Permiso {
  id: number;
  nombre: string;
}
interface PermisoExt {
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
    { id: 1, nombre: 'Historia Clinica Urgencias' },
    { id: 2, nombre: 'Evolucion Medica' },
    { id: 3, nombre: 'Historia Clinica de UCI' },
    { id: 4, nombre: 'Consultar usuarios' },
    { id: 5, nombre: 'Usuarios' },
    { id: 6, nombre: 'contraseña' },
    { id: 7, nombre: 'Gestionar Formatos' },
    { id: 8, nombre: 'Gestionar Historias' },
    { id: 9, nombre: 'Gestionar contraseñas' },
  ];

  permisosDisponiblesExt: PermisoExt[] = [
    { id: 1, nombre: 'Historia Clinica Urgencias Ext' },
    { id: 2, nombre: 'Evolucion Medica Ext' },
    { id: 3, nombre: 'Historia Clinica de UCI Ext' },
    { id: 4, nombre: 'Consultar usuarios Ext' },
    { id: 5, nombre: 'Usuarios Ext' },
    { id: 6, nombre: 'contraseña' },
    { id: 7, nombre: 'Gestionar Formatos Ext' },
    { id: 8, nombre: 'Gestionar Historias Ext' },
    { id: 9, nombre: 'Gestionar contraseñas Ext' },
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
    return this.permisosActivos.some((p: any) => p.id === permiso.id);
  }

  /**----------------------------------------------------------------------------*/
  permisosActivosExt: PermisoExt[] = [];
  activarPermisoExt(permisoExt: any) {
    const yaActivo = this.permisosActivosExt.some((p) => p.id == permisoExt.id);
    if (yaActivo) {
      this.permisosActivosExt = this.permisosActivosExt.filter((p) => p.id !== permisoExt.id);
    } else {
      this.permisosActivosExt.push(permisoExt);
    }
  }
  desactivarPermisoExt(permisoExt: any) {
    this.permisosActivosExt = this.permisosActivosExt.filter((p) => p.id !== permisoExt.id);
  }

  contenidoActivoExt: string = 'Detalles';

  cambiarContenidoExt(contenido: string): void {
    this.contenidoActivoExt = contenido;
  }

  estaActivoExt(permisoExt: any): boolean {
    return this.permisosActivosExt.some((p: any) => p.id === permisoExt.id);
  }
}
