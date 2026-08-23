import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuabierto = false;
  usuario: any;
  constructor(
  ) {

    const usuarionombre = localStorage.getItem('user');
    if (usuarionombre) {
      this.usuario = JSON.parse(usuarionombre);
    }
  }

  menu() {
    this.menuabierto = !this.menuabierto;
  }


}
