import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {map, shareReplay, tap} from 'rxjs/operators';
import {Lesson} from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses').pipe(
      map(res => res['payload']),
      shareReplay()
    );
  }

  updateCourse(courseId: string, updatedCourse: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, updatedCourse).pipe(
      shareReplay()
    );
  }

  searchLessons(value: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('api/lessons', {
      params: {
        filter: value,
        pageSize: '100'
      }
    }).pipe(
        map(res => res['payload']),
        shareReplay()
    );
  }
}
