import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Vuelo } from '../models/Vuelo';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AerolineaService {

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Permite iniciar sesión y traer el token desde el servicio
   * @param usuario correo
   * @param contrasena contraseña
   * @returns Mensaje del servicio
   */
  async login(usuario: String, contrasena: String): Promise<any> {
    return lastValueFrom<any>(this.http.post('http://localhost:3005/api/login', {
      "password": contrasena,
      "email": usuario
    }));
  }

  /**
   * Permite registrar a un usuario
   * @param nombre Nombre de usuario
   * @param usuario Correo
   * @param contrasena contraseña
   * @returns mensaje del servicio
   */
  async register(nombre: String, usuario: String, contrasena: String): Promise<any> {
    return lastValueFrom<any>(this.http.post('http://localhost:3005/api/usuarios/', {
      "nombre": nombre,
      "password": contrasena,
      "email": usuario
    }));
  }
  /**
   * Trae todos los vuelos de la base de datos
   * @returns Json con vuelos
   */
  async checkFlights(): Promise<any> {
    return lastValueFrom<any>(this.http.get('http://localhost:3005/api/vuelos/', {
      params: {
        "clave": environment.token,
        "fkdocumento": ""
      },
    }));
  }
  /**
   * Trae un usuario de la base de datos
   * @returns Usuario
   */
  async checkUser(): Promise<any> {
    return lastValueFrom<any>(this.http.get('http://localhost:3005/api/usuarios/', {
      headers: {
        "token": environment.token,
      }
    }));
  }

  /**
   * Permite saber si una sesión es válida o no
   * @returns sesión válida
   */
  validarSesion(): boolean {
    if (environment.token == '') {
      this.router.navigateByUrl('/aerolinea/login');
      return false;
    }
    return true;
  }
}


