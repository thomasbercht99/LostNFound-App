import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id!: any;
  data: any;
  temp: any;
  state: boolean = false;

  submitted: boolean = false;
  userDialog: boolean = false;
  temporaile: any ={};
  buttonValue = 'grid';
  buttonItems: any[] = [];
  posts: any[] = [];
  profile!: any;
  formulaires!: any;
  project!: any;
  randomColor!: string;
  form!: any;
  role!: any;
  constructor(private service: UserService, private fb: FormBuilder,    private toastController: ToastController,    private log: AuthentificationService, private observices: ObjectService

    ) {}

  async ngOnInit() {
    this.formulaires = this.fb.group({
      _id: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      admin: [''],
    });
    this.form =  this.fb.group({
      _id: ['', Validators.required],
      isFound: [false, Validators.required],
    });
    this.temp = localStorage.getItem('id');
    this.id = JSON.parse(this.temp);
    this.role = this.log.role;

    this.getAllProjectForUser();
    this.randomColor = this.service.generateRandomColor();

    this.buttonItems = [{ value: 'grid', icon: 'grid' }];
  }



  edit(data: any) {
    this.temporaile = { ...data };
    this.userDialog = true;
}


  get userName() {
    return this.formulaires.get('userName');
  }
  get firstName() {
    return this.formulaires.get('firstName');
  }
  get lastName() {
    return this.formulaires.get('lastName');
  }
  get email() {
    return this.formulaires.get('email');
  }
  modifier(){
   if(this.formulaires.invalid){
    this.formulaires.markAllAsTouched();

   }else{
    this.state = true;
    this.service.update(this.formulaires.value).subscribe({
      next: (value) => {

        console.log(value);
        localStorage.setItem("role", JSON.stringify(value.admin))

      },
      error: (err) => {
        console.error('Observable emitted an error: ' + err),
          (this.state = false);
      },
      complete: () => (this.state = false, this.temporaile = {} , this.ngOnInit(),     this.userDialog = false , this.presentToast("Compte modifié avec Succés")    ),
    });
   }
  }

  getAllProjectForUser() {
    this.submitted = true;
    this.service.getUserProject(this.id).subscribe({
      next: (value) => {
        (this.project = value), console.log(this.project);
      },
      error: (err) => {
        console.error('Observable emitted an error: ' + err),
          (this.submitted = false);
      },
      complete: () => (this.submitted = false),
    });
  }

  changeState(object:any){
      this.form.patchValue({
        _id: object._id,
        isFound: !object.isFound
      })

      this.observices.update(this.form.value).subscribe({
        next: (value) => {

        },
        error: (err) => {
          console.error('Observable emitted an error: ' + err),
            (this.state = false);
            this.presentToast("Nous rencontrons une erreur")
        },
        complete: () => {
            this.presentToast("Object modifié  avec Succés")
            this.ngOnInit()
          },
      });



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
