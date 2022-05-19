import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ProblemComponent } from './problem/problem.component';
import { KatexModule } from "ng-katex";
import { ProblemCardComponent } from './problem-card/problem-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import { AvatarComponent } from './avatar/avatar.component';
import {IgxAvatarModule} from "igniteui-angular";
import { FavouritesComponent } from './favourites/favourites.component';
import {RankComponent} from "./rank/rank.component";
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RankingsComponent,
    ProblemComponent,
    ProblemCardComponent,
    AvatarComponent,
    FavouritesComponent,
    RankComponent,
    AdminComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    KatexModule,
    HttpClientModule,
    IgxAvatarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
