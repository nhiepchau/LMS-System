import CourseModel from "@/interface/CourseModel";
import ClassModel from "@/interface/ClassModel";
import { defineStore } from "pinia";
import OutcomeModel from "@/interface/OutcomeModel";
import RawOutcomeModel from "@/interface/RawOutcomeModel";

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
                        Outcomes: [],
                        RawOutcomes: []
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
        resetCourse() {
            this.selectedCourse = {
                CourseName: '',
                Semester: '',
                SemesterId: 0,
                CourseCode: '',
                NumOfLabs: 0,
                Classes: [
                    {
                        Name: '',
                        Default: false,
                        Outcomes: [],
                        RawOutcomes: []
                    }
                ]
            } as CourseModel
        },

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

        setOutcomes(classIdx: number, outcomes: OutcomeModel[]) {
            let classVal = this.selectedCourse.Classes[classIdx];
            if (classVal) {
                this.selectedCourse.Classes[classIdx].Outcomes = outcomes
            }
        },

        setRawOutcomes(classIdx: number, outcomes: RawOutcomeModel[]) {
            let classVal = this.selectedCourse.Classes[classIdx];
            if (classVal) {
                this.selectedCourse.Classes[classIdx].RawOutcomes = outcomes
            }
        },

        addOutcome(classIdx: number, outcome: OutcomeModel) {
            let classVal = this.selectedCourse.Classes[classIdx];
            if (classVal) {
                this.selectedCourse.Classes[classIdx].Outcomes.push(outcome)
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