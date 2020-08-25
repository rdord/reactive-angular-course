import { MessagesService } from './../messages/messages.service';
import { LoadingService } from './../loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { filter, catchError, tap, shareReplay, map } from 'rxjs/operators';
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
    const loadCourses$ = this.http.get<Course[]>('/api/courses').pipe(
      map(res => res['payload']),
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

  saveCourse(id: string, changes: Partial<Course>): Observable<any> {
    const courses = this.subject.getValue();
    const index = courses.findIndex(course => course.id.toString() === id);

    const newCourse: Course = { ...courses[index], ...changes };
    const newCoursesArray: Course[] = [...courses];
    newCoursesArray[index] = newCourse;

    this.subject.next(newCoursesArray);

    return this.http.put<Course>(`/api/courses/${id}`, changes).pipe(
      catchError(err => {
        const message = 'Could not save course';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo))
    );
  }
}
