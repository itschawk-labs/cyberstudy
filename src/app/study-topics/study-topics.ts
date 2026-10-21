import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-study-topics',
  styleUrl: './study-topics.css',
  templateUrl: './study-topics.html',
})
export class StudyTopics {
  studyTopicsForm = new FormGroup({
    topicName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl(''),
    difficulty: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    notes: new FormControl('')
  });

onSubmit() {
  if (this.studyTopicsForm.valid) {
    console.log(this.studyTopicsForm.value);
  } else {
    this.studyTopicsForm.markAllAsTouched();
  }
}
}
