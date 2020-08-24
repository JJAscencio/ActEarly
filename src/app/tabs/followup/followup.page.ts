import { NavController, AlertController } from '@ionic/angular';
import { Baby } from 'src/models/baby.model';
import { AuthService } from 'src/app/services/auth.service';
import { BabyService } from './../../services/baby.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {

  user: any;
  babys: Baby[] = [];
  pageSize = 9;
  upToDate = false;
  loadingIndicator: any;
  loading = false;

  constructor(
    private authService: AuthService,
    private babyService: BabyService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      this.getBabys();
    });
  }

  getBabys() {
    this.babyService.getBabysByUserAndPage(this.user.id, null, this.pageSize).subscribe((babys: any[]) => {
      this.babys = babys;
      this.upToDate = babys.length < this.pageSize;
    });
  }

  loadMoreBabys(event: any) {
    if (!this.upToDate) {
      const lastBaby = this.babys[this.babys.length - 1];

      setTimeout(() => {
        this.babyService.getBabysByUserAndPage(this.user.id, lastBaby, this.pageSize).subscribe((babys: any[]) => {
          this.babys = this.babys.concat(babys);
          this.upToDate = babys.length < this.pageSize;
          event.target.complete();
        });
      }, 1000);
    } else {
      event.target.complete();
    }
  }

  refresh(event: any) {
    setTimeout(() => {
      this.getBabys();
      event.target.complete();
    }, 1000);
  }

  goToBabyProfile(babyId: string) {
    this.navCtrl.navigateForward(['tabs', 'followup', 'baby', babyId]);
    this.presentAlert('Atención!', 'Conteste las siguientes preguntas acerca de los hitos de su bebé. Hable con el Dr. en cada visita acerca de los hitos críticos que su bebé ha alcanzado y de los que espera después.')
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Continuar']
    });

    await alert.present();
  }

  goToCreateBaby() {
    this.navCtrl.navigateForward(['tabs', 'create-baby-profile']);
  }

  ageFromDateOfBirthday(dateOfBirth: any): any {
    const today = Date.now();
    const alive = today - dateOfBirth;
    const month = Math.floor(alive / 2629743000);
    return month;
  }
}
