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

  constructor(private service: AerolineaService,
    private toastr: ToastrService,
    private router: Router) { }
  ngOnInit(): void {

    this.consultarVuelos();
    this.usuario = environment.user;
  }
  consultarUsuario() {
    this.service.checkUser().then(data => {
      this.vuelos = data.vuelos.map((vuelo: any) => vuelo);
    }).catch(error => console.info(error));
  }

  consultarVuelos(): void {
    this.service.checkFlights().then(data => {
      console.log(data.vuelos);
      this.vuelos = data.vuelos.map((vuelo: any) => vuelo);
    }).catch(error => console.info(error));
  }
  cerrarSesion() {
    environment.token = '';
    this.router.navigateByUrl('/aerolinea/login')
  }
}

