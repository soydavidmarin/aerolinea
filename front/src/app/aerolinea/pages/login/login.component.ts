import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario!: String;
  contrasena!: String;
  
  constructor() { }

  ngOnInit(): void {
  }

}
