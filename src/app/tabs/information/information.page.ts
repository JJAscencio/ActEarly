import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  logout(): void {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(['']);
    });
  }

}
