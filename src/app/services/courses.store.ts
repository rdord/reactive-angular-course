import { MessagesService } from './../messages/messages.service';
import { LoadingService } from './../loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { filter, catchError, tap } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from './../model/course';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesStore {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private loading: LoadingService, private messages: MessagesService) {
    this.loadAllCourses();
  }

  loadAllCourses() {
    const loadCourses$ = this.http.get<Courses[]>('/api/courses').pipe(
      map(res => res.payload),
      catchError(err => {
        const message = 'Could not load courses';
        this.messages.showErrors(message);
        console.error(message, err);
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
    );
  }
}
