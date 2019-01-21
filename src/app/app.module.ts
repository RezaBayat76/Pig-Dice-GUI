import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertComponent} from './_components/alert/alert.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {UserComponent} from './_components/user/user.component';
import {MatCardModule} from '@angular/material';
import {DesignGameComponent} from './design-game/design-game.component';
import {ProfileComponent} from './profile/profile.component';
import {GameStarterComponent} from './game-starter/game-starter.component';
import {UsersComponent} from './users/users.component';
import {GameComponent} from './_components/game/game.component';
import {UserCommentComponent} from './user-comment/user-comment.component';
import {UserCommentTemplateComponent} from './_components/user-comment-template/user-comment-template.component';
import {GameCommentComponent} from './game-comment/game-comment.component';
import {GameCommentTemplateComponent} from './_components/game-comment-template/game-comment-template.component';
import {PlayGameComponent} from './play-game/play-game.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {DialogModule} from 'primeng/dialog';
import { GameSliderComponent } from './_components/game-slider/game-slider.component';
import { AdminCheckCommentsComponent } from './admin-check-comments/admin-check-comments.component';
import { GameCheckCommentComponent } from './_components/game-check-comment/game-check-comment.component';
import { UserCheckCommentComponent } from './_components/user-check-comment/user-check-comment.component';
import { GuestComponent } from './guest/guest.component';
import { GuestOnlineUserComponent } from './guest-online-user/guest-online-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    DesignGameComponent,
    ProfileComponent,
    GameStarterComponent,
    UsersComponent,
    GameComponent,
    UserCommentComponent,
    UserCommentTemplateComponent,
    GameCommentComponent,
    GameCommentTemplateComponent,
    PlayGameComponent,
    GameSliderComponent,
    AdminCheckCommentsComponent,
    GameCheckCommentComponent,
    UserCheckCommentComponent,
    GuestComponent,
    GuestOnlineUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    NgxSmartModalModule.forRoot(),
    DialogModule,
    FormsModule,
    routing
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
