import { Component, OnInit } from '@angular/core';
import { AerolineaService } from '../../services/aerolinea.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: String = '';
  contrasena: String = '';
  cargando: boolean = false;
  /**
     * Permite inyectar dependencias
     * @param service servicio
     * @param toastr servicio de mensajes para el usuario
     * @param router servicio para las rutas de la app
     */
  constructor(
    private service: AerolineaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Permite iniciar sesión
   */
  login() {
    this.cargando = true;
    this.service
      .login(this.usuario, this.contrasena)
      .then((response: any) => {
        this.cargando = false;
        if (response.ok) {
          environment.token = response.token;
          this.router.navigateByUrl('/aerolinea/home');
        } else {
          this.toastr.error(response.msg, 'Error!');
        }
      })
      .catch((error) => {
        this.cargando = false;
        this.toastr.error(error.error.msg, 'Error!');
      });
  }
}
