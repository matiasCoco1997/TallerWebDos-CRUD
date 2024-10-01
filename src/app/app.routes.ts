import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'products', component: ProductComponent },
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },  
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
