import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { ObjectService } from 'src/app/services/object.service';
import * as L from 'leaflet';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  implements OnInit {


  id!: string;
  submitted: boolean = false;
  data!: any;
  map!: L.Map;
  randomColor!: string;
  constructor(
    private route: ActivatedRoute,
    private service: ObjectService,
    private location: Location
  ) { }

  ngOnInit() {
  this.id =  this.route.snapshot.params["id"];
  this.randomColor = this.service.generateRandomColor();

  this.getObject()
  }


    getObject() {

      this.submitted = true;
      this.service.getById(this.id).subscribe({
        next: (value) =>{ this.data = value},
        error: (err) => {console.error('Observable emitted an error: ' + err), this.submitted = false},
        complete: () => {
          this.submitted = false;
          this.loadMap(this.data?.placeId.geolocalisation[0],this.data.placeId.geolocalisation[1]);
        },
      });
  }


  loadMap(x:any, y:any) {
    console.log(x, "loaded map", y);
    this.map = L.map("map").setView([y, x], 100);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
     L.marker([y, x]).addTo(this.map).bindPopup("Ici");

    setTimeout(() =>{
      this.map.invalidateSize();
    }, 0);
  }
  forward(){
    this.location.back();
  }

}
