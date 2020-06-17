import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { BabyService } from './../../services/baby.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-child-profile',
  templateUrl: './create-child-profile.page.html',
  styleUrls: ['./create-child-profile.page.scss'],
})
export class CreateChildProfilePage implements OnInit {

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

  // async takePicture() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Prompt
  //   });

  //   const base64 = `data:image/${image.format};base64, ${image.base64String}`;
  //   this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);

  //   const imageBlob = this.base64toBlob(image.base64String);
  //   this.file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });
  //   this.createBabyForm.get("profilepic").setValue("Foto tomada!");
  //   this.createBabyForm.get("profilepic").updateValueAndValidity();
  // }

  // base64toBlob(dataURI: string) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });

  //   return blob;
  // }

  // resetView(): void {
  //   this.file = undefined;
  //   this.displayPhoto = undefined;
  // }



}
