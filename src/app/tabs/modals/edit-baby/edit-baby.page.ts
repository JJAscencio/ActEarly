import { BabyService } from 'src/app/services/baby.service';
import { Baby } from 'src/models/baby.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-baby',
  templateUrl: './edit-baby.page.html',
  styleUrls: ['./edit-baby.page.scss'],
})
export class EditBabyPage implements OnInit {

  @Input() bID: string;

  editBabyForm: FormGroup;
  baby: Baby;
  loadingIndicator: any;
  loading = false;

  babyProfile: any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private babyService: BabyService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    const bID = this.navParams.get('bID');
    this.getBaby(bID)
    console.log(bID);
    this.initForm();
  }

  getBaby(bId: string) {
    this.babyService.getBaby(bId).subscribe((baby) => {
      this.baby = baby as Baby;
      this.patchForm();
    })
  }

  async updateBaby() {
    await this.presentLoading('Guardando el perfil...');
    if (this.editBabyForm.valid) {
      const updatedBaby = {
        ...this.editBabyForm.value
      };

      try {
        await this.babyService.updateBaby(this.baby.id.toString(), updatedBaby);
        this.dismissLoading();
        this.presentAlertConfirm('¡Exito!', 'El perfil ha sido modificado exitosamente.');
        this.closeModal();
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo malo ha pasado', error.message);
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Algo malo ha pasado', 'Por favor llena todos los campos correctamente.');
    }
  }

  patchForm() {
    this.editBabyForm.patchValue({
      name: this.baby.name,
      lname: this.baby.lname,
      sex: this.baby.sex,
      dateofbirth: this.baby.dateofbirth,
      doctorsname: this.baby.doctorsname,
      doctorsemail: this.baby.doctorsemail,
    });
  }

  initForm() {
    this.editBabyForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      dateofbirth: new FormControl(null, [Validators.required]),
      doctorsname: new FormControl(null),
      doctorsemail: new FormControl(null),
    });
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

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.closeModal();
            this.navCtrl.navigateRoot(['tabs','followup']);
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Listo']
    });

    await alert.present();
  }

  deleteBaby(babyId: string) {
    this.babyService
      .deleteBaby(babyId)
      .then(() => {
        console.log(babyId);
        this.presentAlertConfirm('¡Exito!', 'El perfil del bebé ha sido eliminado');
      })
      .catch((error) => {
        this.presentAlert('Algo malo ha pasado', error.message);
      });
  }

}
