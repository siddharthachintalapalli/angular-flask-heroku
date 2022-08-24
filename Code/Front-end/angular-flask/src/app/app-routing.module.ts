import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { InsightsComponent } from './insights/insights.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'insights',component:InsightsComponent},
  {path:'profile',component:ProfileComponent},
  {path:'admin',component:AdminComponent},
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
