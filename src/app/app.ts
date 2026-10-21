import { Component } from '@angular/core';
import { StudyTopics } from './study-topics/study-topics';
import { LabTrackerComponent } from './lab-tracker/lab-tracker';

@Component({
  selector: 'app-root',
  imports: [StudyTopics, LabTrackerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
