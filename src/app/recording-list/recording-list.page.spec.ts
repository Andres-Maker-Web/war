import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordingListPage } from './recording-list.page';

describe('RecordingListPage', () => {
  let component: RecordingListPage;
  let fixture: ComponentFixture<RecordingListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecordingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
