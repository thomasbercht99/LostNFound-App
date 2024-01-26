import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ProfileComponent } from './profile/profile.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DetailsComponent } from './details/details.component';
import { ProfilExterneComponent } from './profil-externe/profil-externe.component';
import { DialogModule } from 'primeng/dialog';
import { MapComponent } from './map/map.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { EditionComponent } from './edition/edition.component';
import { EditMapComponent } from './edit-map/edit-map.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    IonicModule,
    HomePageRoutingModule,
    BadgeModule,
    TagModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule
    ],
  declarations: [HomePage, AccueilComponent, AddObjectComponent, ProfileComponent, DetailsComponent,ProfilExterneComponent,MapComponent, EditionComponent,EditMapComponent]
})
export class HomePageModule {}
