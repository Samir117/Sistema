import { Component, computed, signal } from '@angular/core';
import { Header } from '../header/header';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-changepassword',
  imports: [Header, FormsModule, ReactiveFormsModule],
  templateUrl: './changepassword.html',
  styleUrl: './changepassword.css',
})
export class Changepassword {

  password = "";
  password2="";
verpassword = true;
verpassword2 = true;



}


