import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ObjectService } from 'src/app/services/object.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { EditObjectService } from 'src/app/services/editObjectService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent  implements OnInit {
  formulaires!: any;
  submitted: boolean = false;
  deleted: boolean = false;
  data!: any;
  backup!: any;
  formulaire!: any;
  form!: any;
  temporaile: any ={};
  role!: string;
  userId!: string;
  randomColor!: string;
  objectDialog: boolean = false;
  state: boolean = false;
  temp!:any;
  constructor(
    private fb: FormBuilder,
    private service: ObjectService,
    public popoverController: PopoverController,
    private log: AuthentificationService,
    private toastController: ToastController,
    private services: EditObjectService,
    private router: Router

  ) {}

  ngOnInit() {
    this.formulaire = this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      picture: ['', Validators.required],
      userId: ['', Validators.required],
      placeId: ['', Validators.required],
      isFound: [false],

    });
    this.form =  this.fb.group({
      _id: ['', Validators.required],
      isFound: [false, Validators.required],
    });

    this.getAllObject();
    this.randomColor = this.service.generateRandomColor();
    this.role = this.log.role;
    this.userId = this.log.id;
    this.temp = JSON.parse(this.log.id)
  }


  get description() {
    return this.formulaire.get('description');
  }

  get name() {
    return this.formulaire.get('name');
  }
  get picture() {
    return this.formulaire.get('picture');
  }
  get userIds() {
    return this.formulaire.get('userId');
  }
  get placeId() {
    return this.formulaire.get('placeId');
  }
  get isFound() {
    return this.formulaire.get('isFound');
  }

  getAllObject() {

      this.submitted = true;
      this.service.getAll().subscribe({
        next: (value) => {
          if(value && typeof value === "object") {
            const reversed = value.reverse()
            this.backup = reversed
            this.data = reversed.map(r => {
              const str = r.creationDate+ ""
              // const d: Date  = Date.parse(date)
              const arr = this.timeDiff(new Date(), new Date(str))
              return {
                ...r,
                dateDiff:  this.localize(arr[0], arr[1])
              }
            })
          }
        },
        error: (err) => {console.error('Observable emitted an error: ' + err), this.submitted = false},
        complete: () => (this.submitted = false),
      });
  }
  timeDiff(date1: any, date2: any) {
      if (!(date1 instanceof Date && date2 instanceof Date))
          throw new RangeError('Invalid date arguments');

      const timeIntervals = [31536000, 2628000, 604800, 86400, 3600, 60, 1];
      const intervalNames = ['an', 'mois', 'semains', 'jour', 'heure', 'minute', 'séconde'];
      const diff = Math.abs(date2.getTime()-date1.getTime())/1000;
      const index = timeIntervals.findIndex(i=>(diff/i) >= 1);
      const n = Math.floor(diff/timeIntervals[index]);
      const interval = intervalNames[index];
      return [n, interval];
  }
  localize(value: any, str: any)
  {
      if (value != 1)
          str += 's';

      return `il y'a ${value} ${str}`
  }
  changeState(object:any){
    if(this.role === 'true' || this.temp === object.userId._id){
      this.form.patchValue({
        _id: object._id,
        isFound: !object.isFound
      })

      this.service.update(this.form.value).subscribe({
        next: (value) => {

        },
        error: (err) => {
          console.error('Observable emitted an error: ' + err),
            (this.state = false);
            this.presentToast("Nous rencontrons une erreur")
        },
        complete: () => {
            this.presentToast("Object modifié  avec Succés")
            this.getAllObject()
          },
      });
    }

  }


  details(id:string){
    this.router.navigateByUrl(`/home/details/${id}`)
    this.popoverController.dismiss();
  }
  delete(data: any){

    this.deleted = true;
    this.service.delete(data).subscribe({
      next: (value) => console.log(value),
      error: (err) => {
        console.log(err)
        if(err.code === 200){
          this.deleted = false;

          this.popoverController.dismiss(),
          this.presentToast("Object supprimé avec Succées")
          this.ngOnInit()
        }else{
          this.presentToast("Nous rencontrons une erreur verifez votre connection et réessayer")

        }

         this.submitted = false},
      complete: () => (this.ngOnInit(), this.deleted = true      ),
    });
  }
  logout(){
    this.log.logout();
  }
  search(words: any){
    let word  = words.target.value
    if( word !== ""){
      let filter = this.backup.filter((item:any)=> item.name.toLowerCase().includes(word.toLowerCase())  || item.description.toLowerCase().includes(word.toLowerCase()) );
      this.data = filter;
    }else{
      this.data = this.backup;

    }
  }
  edit(data: any) {
    console.log(data);
    this.services.getObjectInformation().object.userId = data.userId._id;
    this.services.getObjectInformation().object._id = data._id;
    this.services.getObjectInformation().object.description = data.description;
    this.services.getObjectInformation().object.name = data.name;
    this.services.getObjectInformation().object.placeId = data.placeId._id;
    this.services.getObjectInformation().object.picture = data.picture;
    this.services.getObjectInformation().placeInformation.geo = data.placeId.floor +"-" + data.placeId.description;

    this.services.getObjectInformation().placeInformation.geolocalisation = data.placeId.geolocalisation;

    this.services.getObjectInformation().placeInformation.description = data.placeId.description;
    this.services.getObjectInformation().placeInformation.floor = data.placeId.floor;
    this.popoverController.dismiss(),


    this.router.navigateByUrl("/home/edit");




}
  handleChange(ev:any) {
    let state  = ev.target.value
    if( state !== "tout"){
      console.log(state +  typeof(state));

      let filter = this.backup.filter((item:any)=> item.isFound.toString().toLowerCase() === state.toLowerCase()  );
      this.data = filter;
    }else{
      this.data = this.backup;

    }  }

    redirect(userId:any){
      if(userId ===  JSON.parse(this.userId)){
        this.router.navigateByUrl(`/home/profile`)

      }else{
        const id = JSON.parse(this.userId)
        this.router.navigateByUrl(`/home/external/${userId}`)

      }
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 1500,
        position: "top",
      });

      await toast.present();
    }

    modifier(){
      if(this.formulaires.invalid){
       this.formulaires.markAllAsTouched();

      }else{
       this.state = true;
       this.service.update(this.formulaires.value).subscribe({
         next: (value) => {

           console.log(value);
         },
         error: (err) => {
           console.error('Observable emitted an error: ' + err),
             (this.state = false);
         },
         complete: () => (this.state = false, this.temporaile = {} , this.ngOnInit(),     this.objectDialog = false , this.presentToast("Compte supprimé avec Succés")    ),
       });
      }
     }
}
