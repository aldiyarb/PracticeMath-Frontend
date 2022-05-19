import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {KatexModule} from "ng-katex";
import {ProblemComponent} from "./problem/problem.component";
import {FavouritesComponent} from "./favourites/favourites.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent},

  { path: 'home/problem/:id',
    component: ProblemComponent,
    canActivate: [AuthGuard]
  },
  { path: 'favourites',
    component: FavouritesComponent,
    canActivate: [AuthGuard]
  },
  { path: 'rankings',
    component: RankingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
