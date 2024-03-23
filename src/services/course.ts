import CourseModel from "@/interface/CourseModel";
import ClassModel from "@/interface/ClassModel";
import { defineStore } from "pinia";

const useCourse = defineStore('course', {
    state: () => {
        return {
            tempCourse: {
                Classes: [
                    {
                        Name: '',
                        Default: false
                    }
                ]
            } as CourseModel,
            courses: [{
                CourseName: '',
                Semester: 'HK232',
                NumOfLabs: 10,
                Classes: [
                    {
                        Name: '',
                        Default: false
                    }
                ]
            }] as CourseModel[]
        }
    },

    getters: {
        getCourses: (state) => state.courses,
        getCourseById: (state) => {
            return (idx: number) => {
                let course = idx < 0 ? state.tempCourse : state.courses[idx];
                return course;
            }
        },
        getValidClasses: (state) => {
            return () => {
                return state.tempCourse.Classes.filter(x => x.Name !== '');
            }
        }
    },
    actions: {
        addCourse(course: CourseModel) {
            this.courses.push(course)
        },

        setCourse(idx: number, course: CourseModel) {
            this.courses[idx] = course;
        },

        editCourse(idx: number, attr: 'CourseName' | 'Semester' | 'NumOfLabs', value: string | number) {
            let course = idx < 0 ? this.tempCourse : this.courses[idx];

            if (!course) {
                return 'Course is not found!';
            }

            switch (attr) {
                case 'CourseName':
                    course.CourseName = value.toString();
                    break;

                case 'Semester':
                    course.Semester = value.toString();
                    break;

                case 'NumOfLabs':
                    if (typeof (value) === 'number') {
                        course.NumOfLabs = value
                    }
            }
        },

        addClass(idx: number, newClass: ClassModel) {
            let course = idx < 0 ? this.tempCourse : this.courses[idx];

            if (course) {
                course.Classes.push(newClass);
            }
        },

        setClass(idx: number, classes: ClassModel[]) {
            let course = idx < 0 ? this.tempCourse : this.courses[idx];

            if (course) {
                course.Classes = classes;
            }
        }
    }
})

export default useCourse;