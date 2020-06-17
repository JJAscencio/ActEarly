import { Baby } from 'src/models/baby.model';
import { AuthService } from 'src/app/services/auth.service';
import { BabyService } from './../../services/baby.service';
import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {

  user: any;
  babys: Baby[]=[];
  pageSize = 9;
  upToDate = false;
  loadingIndicator: any;
  loading = false;

  constructor(
    private authService: AuthService,
    private babyService: BabyService,
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
      console.log(this.user.id);
      console.log(this.babys);
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

}
