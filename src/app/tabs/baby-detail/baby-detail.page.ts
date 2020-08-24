import { EditBabyPage } from 'src/app/tabs/modals/edit-baby/edit-baby.page';
import { NavController, ActionSheetController, ModalController, PopoverController, NavParams } from '@ionic/angular';
import { BabyService } from 'src/app/services/baby.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverComponent } from 'src/app/popover/popover.component';


@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.page.html',
  styleUrls: ['./baby-detail.page.scss'],
})
export class BabyDetailPage implements OnInit {

  user: any;
  baby: any;
  babyId: string;
  segment = 'criticos';
  currentPopover = null;

  constructor(
    private authService: AuthService,
    private babyService: BabyService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,

  ) { }

  ngOnInit() {

    this.babyId = this.activatedRoute.snapshot.paramMap.get('babyId');
    this.getBaby(this.babyId);
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

  getBaby(babyId: string) {
    this.babyService.getBaby(babyId).subscribe((baby: any) => {
      if (!baby) {
        this.navCtrl.navigateRoot(['tabs', 'followup']);
      }
      this.baby = baby;
    });
  }

  deleteBaby() {
    this.babyService.deleteBaby(this.baby).then(() => {
      this.navCtrl.navigateRoot(['tabs', 'profile']);
    });
  }

  refresh(event: any) {
    setTimeout(() => {
      this.getBaby(this.babyId);
      event.target.complete();
    }, 1000);
  }

  goToProfile(uid: string): void {
    if (uid === this.user.id) {
      this.navCtrl.navigateRoot(['tabs', 'profile']);
    } else {
      this.navCtrl.navigateForward(['tabs', 'profile', uid]);
    }
  }

  async presentActionSheet() {
    let buttons = [
      {
        text: 'Share',
        handler: () => console.log('Share')
      },
      {
        text: 'Copy Link',
        handler: () => console.log('Copy Link')
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => console.log('Cancel')
      }
    ];

    if (this.baby.uid === this.user.id) {
      const additionalButtons = [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteBaby()
        },
        {
          text: 'Archive',
          handler: () => console.log('Archive')
        },
        {
          text: 'Edit',
          handler: () => console.log('Edit')
        },
      ];
      buttons = additionalButtons.concat(buttons);
    }

    const actionSheet = await this.actionSheetCtrl.create({ buttons });
    await actionSheet.present();
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

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    this.currentPopover = popover;
    return await popover.present();
  }

  dismissPopover() {
    this.popoverCtrl.dismiss();
  }

  segmentChanged(event: any): void {
    this.segment = event.detail.value;
  }

  ageFromDateOfBirthday(dateOfBirth: any): any {
    const today = Date.now();
    const alive = today - dateOfBirth;
    const month = Math.floor(alive / 2629743000);
    return month;
  }



}
