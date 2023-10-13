import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

//! Routes spécifiques -> principale car cela peut écraser des routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'}, // Route de la page d'accueil
  { path: 'login', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent} //! ** intercepte toutes les routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot dans le module principal
  exports: [RouterModule]
})
export class AppRoutingModule { }
