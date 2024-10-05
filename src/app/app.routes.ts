import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrarse', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
