import { CoursesStore } from './../services/courses.store';
import { MessagesService } from '../messages/messages.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {
  editCourseForm: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) courseData: Course,
    private coursesStore: CoursesStore,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.course = courseData;

    this.editCourseForm = fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required]
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.editCourseForm.value;

    this.coursesStore.saveCourse(`${this.course.id}`, changes).subscribe();
    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
