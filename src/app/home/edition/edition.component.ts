import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { ImageService } from 'src/app/services/upload.service';
import { ObjectService } from 'src/app/services/object.service';
import { EditObjectService } from 'src/app/services/editObjectService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss'],
})
export class EditionComponent  implements OnInit {
  image:any;
  submitted: boolean = false;
  formsubmitted: boolean = false;
  cart: boolean = false;
  data: any;
  form!: any;
  geo: any;
  imageSrc="../../../assets/image.png"
   constructor(private service: ImageService,private services: ObjectService, private fb: FormBuilder,
     private objects: EditObjectService,
     private router: Router,
     private toastController: ToastController,
     private location: Location
     ) { }

   ngOnInit() {


     this.form = this.objects.getObjectInformation().object;
     this.geo = this.objects.getObjectInformation().placeInformation.geo;
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
         this.router.navigateByUrl("/home/editlocalisation")

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
     console.log(this.form)
     this.services.update(this.form).subscribe({
       next: (value) =>{ },
       error: (err) => {console.error('Observable emitted an error: ' + err),            this.presentToast("Nous rencontrons une erreur")          ,this.submitted = false},
       complete: () => {
         this.presentToast("Object enregistré avec succées");
        this.redirect()
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

   forward(){
    this.location.back();
  }


 async redirect(){
  await this.router.navigateByUrl("/home");
  window.location.reload();


  }
}
