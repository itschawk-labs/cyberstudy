import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Records are stored in memory for Milestone 1; there is no backend or database.
interface LabEntry {
  id: number;
  title: string;
  category: string;
  labDate: string;
  status: string;
  notes: string;
}

@Component({
  selector: 'app-lab-tracker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lab-tracker.html',
  styleUrl: './lab-tracker.css'
})
export class LabTrackerComponent {
  readonly categories = ['Network Security', 'Digital Forensics', 'Malware Analysis', 'Cloud Security', 'Other'];
  readonly statuses = ['Not Started', 'In Progress', 'Completed'];

  entries: LabEntry[] = [];
  notice = '';
  editingId: number | null = null;
  pendingDeleteId: number | null = null;
  private nextId = 1;

  readonly labForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    labDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl('Not Started', { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] })
  });

  onSubmit(): void {
    if (this.labForm.invalid) {
      this.labForm.markAllAsTouched();
      this.notice = 'Please correct the required fields before saving.';
      return;
    }

    const data = this.labForm.getRawValue();
    if (this.editingId === null) {
      this.entries = [{ id: this.nextId++, ...data }, ...this.entries];
      this.notice = 'Lab added for this browser session. No database is connected.';
    } else {
      this.entries = this.entries.map(entry =>
        entry.id === this.editingId ? { id: entry.id, ...data } : entry
      );
      this.notice = 'Lab updated in memory. No database is connected.';
    }
    this.resetForm();
  }

  editEntry(entry: LabEntry): void {
    this.editingId = entry.id;
    this.pendingDeleteId = null;
    this.labForm.setValue({
      title: entry.title, category: entry.category, labDate: entry.labDate,
      status: entry.status, notes: entry.notes
    });
    this.labForm.markAsPristine();
    this.notice = `Editing: ${entry.title}`;
  }

  requestDelete(id: number): void {
    this.pendingDeleteId = id;
    this.notice = 'Confirm deletion below to remove the entry from this browser session.';
  }

  confirmDelete(): void {
    if (this.pendingDeleteId === null) return;
    const id = this.pendingDeleteId;
    this.entries = this.entries.filter(entry => entry.id !== id);
    if (this.editingId === id) this.resetForm();
    this.pendingDeleteId = null;
    this.notice = 'Entry deleted from this browser session.';
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.notice = 'Deletion cancelled.';
  }

  cancelEdit(): void {
    this.resetForm();
    this.notice = 'Edit cancelled.';
  }

  trackById(_index: number, entry: LabEntry): number { return entry.id; }

  private resetForm(): void {
    this.editingId = null;
    this.pendingDeleteId = null;
    this.labForm.reset({ title: '', category: '', labDate: '', status: 'Not Started', notes: '' });
  }
}
