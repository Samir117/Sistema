import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Changepassword } from './components/changepassword/changepassword';

export const routes: Routes = [
    {path: 'login', component:Login},
    {path: 'dashboard', component: Dashboard},
    {path:'', component:Login},
    {path: 'changepassword',component: Changepassword},
    {path: '**', redirectTo:'/login'}
];
