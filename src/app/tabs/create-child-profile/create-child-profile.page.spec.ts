import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateChildProfilePage } from './create-child-profile.page';

describe('CreateChildProfilePage', () => {
  let component: CreateChildProfilePage;
  let fixture: ComponentFixture<CreateChildProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChildProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChildProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
