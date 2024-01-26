
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { AddObjectService } from 'src/app/services/addObject.service';
import { EditObjectService } from 'src/app/services/editObjectService';
import { ObjectService } from 'src/app/services/object.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-edit-map',
  templateUrl: './edit-map.component.html',
  styleUrls: ['./edit-map.component.scss'],
})
export class EditMapComponent  implements OnInit {
  maps!: L.Map;
  form!: any;
  submitted: boolean = false;
  formsubmitted: boolean = false;
  localisation!: any;
  constructor(private location:Location, private object: EditObjectService,private service: PlaceService, private services: ObjectService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {



    this.form = this.object.getObjectInformation().placeInformation;
    this.loadMap(this.object.getObjectInformation().placeInformation.geolocalisation);


  }
  loadMap(data: any) {
    this.maps = L.map("map").setView(data, 100);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.maps);
    this.maps.on('click', (event: L.LeafletMouseEvent) => {
      const latlng = event.latlng;
      this.localisation = latlng;
      let temp =[];
      temp.push(latlng.lng, latlng.lat);
      this.form.geolocalisation =  temp;

      console.log(this.form.geolocalisation);
      // Faites ce que vous voulez avec les coordonnées ici
    });
    L.marker(data).addTo(this.maps).bindPopup("Ici");


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
        console.log(this.object.getObjectInformation())
        this.router.navigateByUrl('/home/edit');
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
