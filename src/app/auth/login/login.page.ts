import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulaires!: any;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: AuthentificationService,
    private toastController: ToastController

  ) {}

  ngOnInit() {
    this.formulaires = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get userName() {
    return this.formulaires.get('userName');
  }
  get password() {
    return this.formulaires.get('password');
  }

  login() {
    if (this.formulaires.invalid) {
      this.formulaires.markAllAsTouched();
    } else {
      this.submitted = true;
      this.service.login(this.formulaires.value).subscribe({
        next: (value) => console.log(value),
        error: (err) => {console.error('Observable emitted an error: ' + err), this.submitted = false, this.presentToast()},
        complete: () => (this.submitted = false),
      });
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Mots de passe ou noms d'utilisateur incorect",
      duration: 1500,
      position: "top",
    });

    await toast.present();
  }
}
