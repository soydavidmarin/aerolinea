import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Vuelo } from '../models/Vuelo';



@Injectable({
  providedIn: 'root'
})
export class AerolineaService {

  constructor(private http: HttpClient) { }

  async login(usuario: String, contrasena: String): Promise<any> {
    return lastValueFrom<any>(this.http.post('http://localhost:3005/api/login', {
      "password": contrasena,
      "email": usuario
    }));
  }

  async register(nombre: String, usuario: String, contrasena: String): Promise<any> {
    return lastValueFrom<any>(this.http.post('http://localhost:3005/api/usuarios/', {
      "nombre": nombre,
      "password": contrasena,
      "email": usuario
    }));
  }
  async checkFlights(): Promise<any> {
    return lastValueFrom<any>(this.http.get('http://localhost:3005/api/vuelos/', {
      params: {
        "clave": environment.token,
        "fkdocumento": ""
      },
    }));
  }
  async checkUser(): Promise<any> {
    return lastValueFrom<any>(this.http.get('http://localhost:3005/api/usuarios/', {
      params: {
        "clave": environment.token,
        "fkdocumento": ""
      },
    }));
  }
}


