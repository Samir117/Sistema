import { Component, computed, signal } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  imports: [Header, FormsModule,],
  templateUrl: './changepassword.html',
  styleUrl: './changepassword.css',
})
export class Changepassword {

  password =signal('');

 tieneMinimo8 = computed(() => this.password().length >= 8);
  tieneMayuscula = computed(() => /[A-Z]/.test(this.password()));
  tieneNumero = computed(() => /[0-9]/.test(this.password()));

puntos = computed(() => {
    let cuenta = 0;
    if (this.tieneMinimo8()) cuenta++;
    if (this.tieneMayuscula()) cuenta++;
    if (this.tieneNumero()) cuenta++;
    return cuenta;
  });

  colorBarra = computed(() => {
    const total = this.puntos();
    if (total === 1) return 'rojo';
    if (total === 2) return 'naranja';
    if (total === 3) return 'verde';
    return 'gris';
  });
}


