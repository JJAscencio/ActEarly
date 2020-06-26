import { Baby } from 'src/models/baby.model';
import { BabyService } from 'src/app/services/baby.service';
import { EditBabyPage } from 'src/app/tabs/modals/edit-baby/edit-baby.page';
import { PopoverController, NavController, ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  baby: Baby;

  currentPopover = null;
  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private babyService: BabyService
  ) {

  }

  ngOnInit() {
    const bID = this.navParams.get('bID');
    this.getBaby(bID);
    console.log(bID);
  }

  getBaby(bId: string) {
    this.babyService.getBaby(bId).subscribe((baby) => {
      this.baby = baby as Baby;
    })
  }

  closePopover() {
    this.popoverCtrl.dismiss();
  }

  goToBabyProfile(babyId: string) {
    this.navCtrl.navigateForward(['tabs', 'followup', 'baby', babyId]);
  }

  async openModalEdit(baby: string) {
    const modal = await this.modalCtrl.create({
      component: EditBabyPage,
      componentProps: {
        bID: baby
      }
    });
    return await modal.present();
  }

}
