import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Chapter, ChapterRef } from '../models/chapter.model';
import { ChapterService } from '../../../core/services/chapter.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrl: './wiki.component.css'
})
export class WikiComponent implements OnInit {
  chapters: Chapter[] = [];
  selectedFile: File | null = null;

  readonly chapterForm = this.fb.group({
    title: ['', Validators.required],
    summary: [''],
    content: ['']
  });

  readonly referenceForm = this.fb.group({
    sourceChapterId: ['', Validators.required],
    targetChapterId: ['', Validators.required],
    sourcePage: [1, Validators.required],
    targetPage: [1, Validators.required],
    note: ['']
  });

  constructor(private readonly fb: FormBuilder, private readonly chapterService: ChapterService) {}

  ngOnInit(): void {
    this.loadChapters();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  saveChapter(): void {
    if (!this.chapterForm.valid || !this.selectedFile) return;
    const { title, summary, content } = this.chapterForm.getRawValue();

    this.chapterService
      .create({ title: title ?? '', summary: summary ?? '', content: content ?? '', pdf: this.selectedFile })
      .subscribe(() => {
        this.chapterForm.reset();
        this.selectedFile = null;
        this.loadChapters();
      });
  }

  linkPages(): void {
    if (!this.referenceForm.valid) return;
    const values = this.referenceForm.getRawValue();

    this.chapterService
      .addCrossReference(values.sourceChapterId!, {
        chapterId: values.targetChapterId!,
        sourcePage: Number(values.sourcePage),
        targetPage: Number(values.targetPage),
        note: values.note ?? ''
      })
      .subscribe(() => {
        this.referenceForm.reset({ sourcePage: 1, targetPage: 1, note: '' });
        this.loadChapters();
      });
  }

  asRef(value: string | ChapterRef): ChapterRef | null {
    return typeof value === 'string' ? null : value;
  }

  private loadChapters(): void {
    this.chapterService.getAll().subscribe((chapters) => (this.chapters = chapters));
  }
}
