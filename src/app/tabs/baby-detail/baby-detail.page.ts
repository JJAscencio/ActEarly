import { HttpClientModule } from '@angular/common/http';
import { QuizService } from './../../services/quiz.service';
import { Validators } from '@angular/forms';
import { EditBabyPage } from 'src/app/tabs/modals/edit-baby/edit-baby.page';
import { NavController, ActionSheetController, ModalController, PopoverController, NavParams } from '@ionic/angular';
import { BabyService } from 'src/app/services/baby.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverComponent } from 'src/app/popover/popover.component';
import { Option, Question, Quiz, QuizConfig } from 'src/app/models'


@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.page.html',
  styleUrls: ['./baby-detail.page.scss'],
})
export class BabyDetailPage implements OnInit {

  user: any;
  baby: any;
  babyId: string;
  step: 0;
  segment = 'criticos';
  currentPopover = null;

  // Quizz

  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  // timer: any = null;
  // startTime: Date;
  // endTime: Date;
  // ellapsedTime = '00:00';
  // duration = '';

  constructor(
    private authService: AuthService,
    private babyService: BabyService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private quizService: QuizService,
  ) { }

  ngOnInit() {

    this.babyId = this.activatedRoute.snapshot.paramMap.get('babyId');
    this.getBaby(this.babyId);
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);


  }

  // test


  // Baby Details

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

  // Quiz

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      // this.startTime = new Date();
      // this.ellapsedTime = '00:00';
      // this.timer = setInterval(() => { this.tick(); }, 1000);
      // this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
