import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CoursesService } from '../services/courses.service';
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
    private coursesService: CoursesService,
    private loadingService: LoadingService
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
    const updatedCourse = this.editCourseForm.value;

    const saveCourse$ = this.coursesService.updateCourse(`${this.course.id}`, updatedCourse);

    this.loadingService.showLoaderUntilCompleted(saveCourse$).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
