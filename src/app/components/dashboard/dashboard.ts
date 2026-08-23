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

  constructor(private http: HttpClient){}

  pacientes: any []=[];

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
}
