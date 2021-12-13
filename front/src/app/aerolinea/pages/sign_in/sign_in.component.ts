import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { AerolineaService } from '../../services/aerolinea.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign_in.component.html',
  styleUrls: ['./sign_in.component.css']
})
export class SignInComponent implements OnInit {
  usuario: String = '';
  contrasena: String = '';
  correo: String = '';
  cargando:boolean = false;

  constructor(private service: AerolineaService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registro() {
    this.cargando = true;
    this.service
      .register(this.usuario, this.correo, this.contrasena)
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
