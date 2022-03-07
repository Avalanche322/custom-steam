import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { GamesMainComponent } from './games/games-main/games-main.component';
import { ProfileComponent } from './profile/profile.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { GamesLibraryComponent } from './games/games-library/games-library.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['games']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GamesMainComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'games',
    component: GamesMainComponent
  },
  {
    path: 'library',
    component: GamesLibraryComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'friends',
    component: FriendsPageComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin)
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
