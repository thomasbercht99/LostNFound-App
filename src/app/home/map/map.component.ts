import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { AddObjectService } from 'src/app/services/addObject.service';
import { ObjectService } from 'src/app/services/object.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  maps!: L.Map;
  form!: any;
  submitted: boolean = false;
  formsubmitted: boolean = false;
  localisation!: any;
  constructor(private location:Location, private object: AddObjectService,private service: PlaceService, private services: ObjectService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {

    this.loadMap();


    this.form = this.object.getObjectInformation().placeInformation;

  }
  loadMap() {
    this.maps = L.map("map").setView([46.781231, 6.6447348], 100);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.maps);
    this.maps.on('click', (event: L.LeafletMouseEvent) => {
      const latlng = event.latlng;
      this.localisation = latlng;
      let temp =[];
      temp.push(latlng.lng, latlng.lat);
      this.form.geolocalisation =  temp;
      // Faites ce que vous voulez avec les coordonnées ici
    });

    setTimeout(() =>{
      this.maps.invalidateSize();
    }, 0);
  }
  forward(){
    this.location.back();
  }


  enregistrer(){
    if(this.form.floor && this.form.description){
      if(this.form.geolocalisation.length > 0){
    this.submitted = true;
    this.service.create(this.form).subscribe({
      next: (value) =>{ this.object.getObjectInformation().object.placeId = value._id, this.object.getObjectInformation().placeInformation.geo = value.floor+"-"+ value.description },
      error: (err) => {console.error('Observable emitted an error: ' + err), this.submitted = false,this.presentToast("Nous rencontrons une erreur lors de la ceartion de la geolocalisation", ) },
      complete: () => {
        this.submitted = false;
        this.presentToast("Place enregistrée avec succées");
        this.router.navigateByUrl('/home/add');
    }
  });


  }else{
    this.presentToast("veuillez selectionner la position")
  }
  }
  this.formsubmitted = true;

  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: "top",
    });

    await toast.present();
  }
}
