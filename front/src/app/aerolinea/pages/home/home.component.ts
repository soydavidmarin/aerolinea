import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { Vuelo } from '../../models/Vuelo';
import { AerolineaService } from '../../services/aerolinea.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vuelos!: Vuelo[];
  usuario!: String;

  /**
   * Permite inyectar dependencias
   * @param service servicio
   * @param toastr servicio de mensajes para el usuario
   * @param router servicio para las rutas de la app
   */
  constructor(private service: AerolineaService,
    private toastr: ToastrService,
    private router: Router) { }

  /**
   * Valida la sesión y luego consulta los vuelos
   */
  ngOnInit(): void {
    if (this.service.validarSesion()) {
      this.consultarVuelos();
      this.usuario = environment.user;
      this.consultarUsuario();
    }
  }
  /**
   * Permite consultar un usuario
   */
  consultarUsuario() {
    this.service.checkUser().then(data => {
      this.usuario = data.usuarios[0].nombre;
    }).catch(error => console.info(error));
  }

  /**
   * Trae todos los vuelos desde el servicio
   */
  consultarVuelos(): void {
    this.service.checkFlights().then(data => {
      console.log(data.vuelos);
      this.vuelos = data.vuelos.map((vuelo: any) => vuelo);
    }).catch(error => console.info(error));
  }
  /**
   * Cierra la sesión
   */
  cerrarSesion() {
    environment.token = '';
    this.router.navigateByUrl('/aerolinea/login');
  }
}

