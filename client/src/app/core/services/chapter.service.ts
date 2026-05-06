import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter, CrossReference } from '../../features/wiki/models/chapter.model';

@Injectable({ providedIn: 'root' })
export class ChapterService {
  private readonly baseUrl = 'http://localhost:5000/api/chapters';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(this.baseUrl);
  }

  create(payload: { title: string; summary: string; content: string; pdf: File }): Observable<Chapter> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('summary', payload.summary);
    formData.append('content', payload.content);
    formData.append('pdf', payload.pdf);
    return this.http.post<Chapter>(this.baseUrl, formData);
  }

  update(chapterId: string, payload: { title: string; summary: string; content: string }): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.baseUrl}/${chapterId}`, payload);
  }

  addCrossReference(chapterId: string, reference: CrossReference): Observable<Chapter> {
    return this.http.patch<Chapter>(`${this.baseUrl}/${chapterId}/references`, reference);
  }
}
