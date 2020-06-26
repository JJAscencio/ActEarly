import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { BabyService } from './../../services/baby.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-baby-profile',
  templateUrl: './create-baby-profile.page.html',
  styleUrls: ['./create-baby-profile.page.scss'],
})
export class CreateBabyProfilePage implements OnInit {

  user: any;
  baby: any;
  file: any;
  createBabyForm: FormGroup;
  loadingIndicator: any;
  loading = false;

  constructor(
    private babyService: BabyService,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.initForm();
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user),
      console.log(this.user.name)
    });
  }

  initForm() {
    this.createBabyForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      dateofbirth: new FormControl(null, [Validators.required]),
      doctorsname: new FormControl(null),
      doctorsemail: new FormControl(null),
    })
  }

  async onSubmit(): Promise<void> {
    await this.presentLoading('Creando perfil...');

    if (this.createBabyForm.valid) {
      const name = this.createBabyForm.controls.name.value;
      const lname = this.createBabyForm.controls.lname.value;
      const sex = this.createBabyForm.controls.sex.value;
      const dateofbirth = this.createBabyForm.controls.dateofbirth.value;
      const doctorsname = this.createBabyForm.controls.doctorsname.value;
      const doctorsemail = this.createBabyForm.controls.doctorsemail.value;

      try {
        const baby = {
          name,
          lname,
          sex,
          dateofbirth,
          doctorsname,
          doctorsemail,
          uid: this.user.id,
          username: this.user.username,
          createdAt: Date.now(),

        };
        await this.babyService.createBaby(baby);
        this.dismissLoading();
        this.presentAlertConfirm('Felicidades!', 'Puedes comenzar a con el seguimiento de tu bebé!');
        this.createBabyForm.reset();
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo malo ha pasado', error.message);
      }

    } else {
      this.dismissLoading();
      this.presentAlert('Algo malo ha pasado', 'Por favor llena todos los campos correctamente.');
    }
  }

  async presentLoading(body: string) {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: body
    });
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Listo']
    });

    await alert.present();
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.navCtrl.navigateRoot(['tabs/followup']);
          }
        }
      ]
    });

    await alert.present();
  }
}
