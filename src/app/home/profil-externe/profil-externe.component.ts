import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-profil-externe',
  templateUrl: './profil-externe.component.html',
  styleUrls: ['./profil-externe.component.scss'],
})
export class ProfilExterneComponent  implements OnInit {

  id!: any;
  data: any;
  temp: any;
  submitted: boolean = false;
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];
  profile!: any ;
  project!:any;
  randomColor!: string;
  form: any;
  forms: any;

  desactive: boolean = false;
  role!: any;
  constructor(private service: UserService, private router: ActivatedRoute,private location: Location,    private fb: FormBuilder,
    private log: AuthentificationService,
    private toastController: ToastController,
    private observices: ObjectService
    ) { }

 async ngOnInit() {
  this.role = this.log.role;
  this.forms =  this.fb.group({
    _id: ['', Validators.required],
    isFound: [false, Validators.required],
  });
  this.form =  this.fb.group({
    _id: ['', Validators.required],
    isDesactivated: [false, Validators.required],
  });
  this.randomColor = this.service.generateRandomColor();
  this.temp = localStorage.getItem('id');
  this.role = this.log.role;
    this.id = this.router.snapshot.params['id'];
    this.getAllProjectForUser();

    this.buttonItems = [
      {value: 'grid', icon: 'grid'},

    ];

  }
  changeState(object:any, state:any){
    this.form.patchValue({
      _id: object,
      isDesactivated: !state
    })
    this.desactive = true;
    this.service.update(this.form.value).subscribe({
      next: (value) => {

      },
      error: (err) => {
        this.desactive = false;

        console.error('Observable emitted an error: ' + err),
          this.presentToast("Nous rencontrons une erreur")
      },
      complete: () => (this.presentToast("Utilisateur desactivé  avec Succés"),    this.desactive = false, this.ngOnInit()
      ),
    });

  }



  changeStateObj(object:any){
    if(this.role === 'true' || this.temp === object.userId._id){
      this.forms.patchValue({
        _id: object._id,
        isFound: !object.isFound
      })

      this.observices.update(this.forms.value).subscribe({
        next: (value) => {

        },
        error: (err) => {
          console.error('Observable emitted an error: ' + err),
            this.presentToast("Nous rencontrons une erreur")
        },
        complete: () => {
            this.presentToast("Object modifié  avec Succés")
            this.ngOnInit()
          },
      });
    }


  }
getAllProjectForUser(){
  this.submitted = true;
  this.service.getUserProject(this.id).subscribe({
    next: (value) =>{ this.project = value, console.log(this.project)
    },
    error: (err) => {console.error('Observable emitted an error: ' + err), this.submitted = false},
    complete: () => (this.submitted = false),
  });
}
forward(){
  this.location.back();
}



async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: "top",
  });

  await toast.present();
}

}



