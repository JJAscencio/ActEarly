import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBabyPage } from './edit-baby.page';

describe('EditBabyPage', () => {
  let component: EditBabyPage;
  let fixture: ComponentFixture<EditBabyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBabyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBabyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
