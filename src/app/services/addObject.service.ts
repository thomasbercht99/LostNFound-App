import { Injectable } from '@angular/core';
let id:any = localStorage.getItem('id');

@Injectable({
  providedIn: 'root'
})


export class AddObjectService {
    objectInformation = {
        object: {
            name: '',
            picture: '../../../assets/image.png',
            description: "",
            placeId: '',
            userId: JSON.parse(id),
        },
        placeInformation: {
          geolocalisation: [46.781231, 6.6447348],
          floor: "",
          description: "",
          geo: "",
        },

    };
    getObjectInformation() {
      return this.objectInformation;
  }
  }




