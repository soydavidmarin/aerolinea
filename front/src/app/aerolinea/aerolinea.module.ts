import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AerolineaRoutingModule } from './aeorolinea-routing.module';
import { SignInComponent } from './pages/sign_in/sign_in.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignInComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AerolineaRoutingModule,
    FormsModule
  ]
})
export class AerolineaModule { }
