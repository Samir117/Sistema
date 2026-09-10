import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuabierto = false;
  usuario: any;
  sidebarAbierto = signal(false);
  constructor(
  ) {

    const usuarionombre = localStorage.getItem('user');
    if (usuarionombre) {
      this.usuario = JSON.parse(usuarionombre);
    }
  }

  toggleSidebar():void{
    this.sidebarAbierto.update(valor => !valor);
  }
  cerrarSidebar():void{
    this.sidebarAbierto.set(false);
  }
  menu() {
    this.menuabierto = !this.menuabierto;
  }

  getInitials(): string {
  const firstName = this.usuario?.firstName?.trim() || '';
  const lastName = this.usuario?.lastName?.trim() || '';

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}





}
