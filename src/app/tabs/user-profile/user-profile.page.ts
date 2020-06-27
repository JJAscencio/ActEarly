import { EditProfilePage } from 'src/app/tabs/modals/edit-profile/edit-profile.page';
import { ModalController, NavController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user: any;

  loadingIndicator: any;
  loading = false

  constructor(private authService: AuthService,
    private userService: UserService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController  ,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(['']);
    });
  }

  async openModalEdit(user: string) {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        uID: user
      }
    });
    return await modal.present();
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
      buttons: ['Listo!']
    });

    await alert.present();
  }

}
