import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyTopics } from './study-topics';

describe('StudyTopics', () => {
  let component: StudyTopics;
  let fixture: ComponentFixture<StudyTopics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTopics],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyTopics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
