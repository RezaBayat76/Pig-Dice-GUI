import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {GameStarterComponent} from './game-starter/game-starter.component';
import {DesignGameComponent} from './design-game/design-game.component';
import {UsersComponent} from './users/users.component';
import {UserCommentComponent} from './user-comment/user-comment.component';
import {GameCommentComponent} from './game-comment/game-comment.component';
import {PlayGameComponent} from './play-game/play-game.component';
import {AdminCheckCommentsComponent} from "./admin-check-comments/admin-check-comments.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'start-game', component: GameStarterComponent, canActivate: [AuthGuard]},
  {path: 'start-game/:id', component: PlayGameComponent, canActivate: [AuthGuard]},
  {path: 'design-game', component: DesignGameComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'user-comment/:id', component: UserCommentComponent, canActivate: [AuthGuard]},
  {path: 'game-comment/:id', component: GameCommentComponent, canActivate: [AuthGuard]},
  {path: 'check-comment', component: AdminCheckCommentsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
