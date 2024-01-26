import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { AddObjectService } from 'src/app/services/addObject.service';
import { PushService } from 'src/app/services/fcm.service';

import { ImageService } from 'src/app/services/upload.service';
import { ObjectService } from 'src/app/services/object.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss'],
})
export class AddObjectComponent  implements OnInit {
 image:any;
 submitted: boolean = false;
 formsubmitted: boolean = false;
 cart: boolean = false;
 data: any;
 form!: any;
 geo: any;
 status!:any;
 imageSrc="../../../assets/image.png"
  constructor(private service: ImageService,private services: ObjectService, private fb: FormBuilder,
    private object: AddObjectService,
    private router: Router,
    private toastController: ToastController,
    private log: AuthentificationService
    ) { }

  ngOnInit() {

    this.status = this.log.state;

    this.form = this.object.getObjectInformation().object;
    this.geo = this.object.getObjectInformation().placeInformation.geo;
  }


   async takePicture() {
    // Prepare camera options.
    const options: ImageOptions = {
      quality: 20,
      resultType: CameraResultType.Base64,
      allowEditing: false,
    };


    const pictureDataPromise = await Camera.getPhoto(options);

    this.submitted = true;
    const data =  await this.service.upload(pictureDataPromise).subscribe(
      {
        next: (value) => {
          console.log(value);
          this.imageSrc = value.data.url;
          this.form.picture = value.data.url;
        },
        error: (err) => {
          console.error('Observable emitted an error: ' + err),
            (this.submitted = false);
        },
        complete: () => (this.submitted = false),
      }
    )



  };
  selectCart(){
    if(this.form.name && this.form.description){
      if(this.form.picture != "../../../assets/image.png"){
        this.router.navigateByUrl("/home/localisation")

      }else{
        this.presentToast("Veuillez inserer la photo si l'action est en cours bien vouloir patienter...")
      }

    }
    this.formsubmitted = true;

  }

  // takeAndUploadPicture(): Observable<any> {
  //   this.takePicture().pipe(
  //     // Once the picture has been taken, upload it to the qimg API.
  //     // This returns a new observable of the resulting QimgImage object.
  //     switchMap((data) => {
  //       console.log(data);
  //       return this.service.upload(data.base64String);
  //     }),
  //     // Once the picture has been uploaded, log a message to the console
  //     // indicating that all went well.
  //     // This does not change the observable stream and you can delete this
  //     // if you don't want to log the URL to the image
  //     tap((image) =>
  //       console.log(`Successfully uploaded picture to ${image.url}`)
  //     )
  //   );
  //   let image = ""
  //     return from(image)

  // }

save(){
  if(this.form.name && this.form.description && this.form.picture && this.form.placeId){
    let temp:any = localStorage.getItem("id")
    this.object.getObjectInformation().object.userId = JSON.parse(temp);
    this.services.create(this.object.getObjectInformation().object).subscribe({
      next: (value) =>{ },
      error: (err) => {console.error('Observable emitted an error: ' + err),            this.presentToast("Nous rencontrons une erreur")          ,this.submitted = false},
      complete: () => {
        this.presentToast("Object enregistré avec succées");
        window.location.reload();

      }
  })
  }

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
