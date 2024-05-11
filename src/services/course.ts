import CourseModel from "@/interface/CourseModel";
import ClassModel from "@/interface/ClassModel";
import { defineStore } from "pinia";
import LabModel from "@/interface/LabModel";

const useCourse = defineStore('course', {
    state: () => {
        return {
            selectedCourse: {
                CourseName: '',
                Semester: '',
                SemesterId: 0,
                CourseCode: '',
                NumOfLabs: 0,
                Classes: [
                    {
                        Name: '',
                        Default: false,
                        Labs: []
                    }
                ]
            } as CourseModel
        }
    },

    // Warning: semester is an attribute of class, not course -> in UI, we allow user
    // to add multiple classes in case mapping to same course and semester

    getters: {
        getCourse: (state) => state.selectedCourse,
        getValidClasses: (state) => {
            return () => {
                return state.selectedCourse.Classes.filter(x => x.Name !== '');
            }
        }
    },
    actions: {
        editCourse(attr: 'CourseName' | 'Semester' | 'NumOfLabs' | 'CourseCode' | 'SemesterId', value: string | number) {
            let course = this.selectedCourse;

            switch (attr) {
                case 'CourseName':
                    course.CourseName = value.toString();
                    break;

                case 'CourseCode':
                    course.CourseCode = value.toString();
                    break;

                case 'Semester':
                    course.Semester = value.toString();
                    break;

                case 'SemesterId':
                    if (typeof (value) === 'number') {
                        course.SemesterId = value
                    }
                    break;

                case 'NumOfLabs':
                    if (typeof (value) === 'number') {
                        course.NumOfLabs = value
                    }
            }
        },

        setLabs(classIdx: number, labs: LabModel[]) {
            let classVal = this.selectedCourse.Classes[classIdx];
            if (classVal) {
                this.selectedCourse.Classes[classIdx].Labs = labs
            }
        },

        addClass(newClass: ClassModel) {
            this.selectedCourse.Classes.push(newClass);
        },

        setClassName(idx: number, className: string) {
            let oldClass = this.selectedCourse.Classes[idx];

            if (oldClass) {
                this.selectedCourse.Classes[idx].Name = className;
            }
        },

        setClassDefault(idx: number, isDefault: boolean) {
            let oldClass = this.selectedCourse.Classes[idx];

            if (oldClass) {
                this.selectedCourse.Classes[idx].Default = isDefault;
            }
        },

        setClassFile(idx: number, file: File, type: 'Submission' | 'Exercise' | string) {
            if (type !== 'Submission' && type !== 'Exercise') return

            let oldClass = this.selectedCourse.Classes[idx];

            if (oldClass) {
                this.selectedCourse.Classes[idx][type] = file
            }
        }
    }
})

export default useCourse;