import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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
        @Inject(MAT_DIALOG_DATA) courseData: Course) {

        this.course = courseData;

        this.editCourseForm = fb.group({
            description: [this.course.description, Validators.required],
            category: [this.course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [this.course.longDescription, Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.editCourseForm.value;

    }

    close() {
        this.dialogRef.close();
    }

}
