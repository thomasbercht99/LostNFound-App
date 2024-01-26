import { Injectable } from '@angular/core';
let id:any = localStorage.getItem('id');

@Injectable({
  providedIn: 'root'
})


export class EditObjectService {
  objectInformation = {
      object: {
          _id : "",
          name: '',
          picture: '../../../assets/image.png',
          description: "",
          placeId: '',
          userId: JSON.parse(id),
      },
      placeInformation: {
        geolocalisation: [],
        floor: "",
        description: "",
        geo: "",
        longitude: "",
        latitude: "",
      },


  };
  getObjectInformation() {
    return this.objectInformation;
}
}
