import { Component } from '@angular/core';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  imports: [Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private http: HttpClient){
    this.cargarpacientes();
  }

  pacientes: any []=[];

  modalabierto: boolean =false;
  pacienteSelecciona: any =null;

  ngOnInit(){
    this.cargarpacientes();
  }


  cargarpacientes(){
    this.http.get('https://dummyjson.com/users')
    .subscribe((data:any) =>{
      this.pacientes =data.users;
      console.log(this.pacientes);
    });
  }

  verdetalle(paciente:any){
    this.pacienteSelecciona = paciente;
    this.modalabierto = true;
  }

  cerrarmodal(){
    this.pacienteSelecciona = null;
    this.modalabierto = false;
  }
}
