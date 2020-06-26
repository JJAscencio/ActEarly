import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateBabyProfilePage } from './create-baby-profile.page';

describe('CreateBabyProfilePage', () => {
  let component: CreateBabyProfilePage;
  let fixture: ComponentFixture<CreateBabyProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBabyProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBabyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
