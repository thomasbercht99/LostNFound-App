import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfileComponent } from './profile/profile.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { DetailsComponent } from './details/details.component';
import { ProfilExterneComponent } from './profil-externe/profil-externe.component';
import { MapComponent } from './map/map.component';
import { EditionComponent } from './edition/edition.component';
import { EditMapComponent } from './edit-map/edit-map.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {path: 'home', component: AccueilComponent},
      {path: 'add', component: AddObjectComponent},
      {path: 'localisation', component: MapComponent},
      {path: 'editlocalisation', component: EditMapComponent},

      {path: 'profile', component: ProfileComponent},
      {path: 'edit', component: EditionComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'external/:id', component: ProfilExterneComponent},
      {path: "", redirectTo: 'home', pathMatch: "full"},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
