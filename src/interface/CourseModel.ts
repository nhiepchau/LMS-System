import ClassModel from "./ClassModel"

interface CourseModel {
    CourseName: string,
    Semester: string,
    NumOfLabs: number,
    Classes: Array<ClassModel>
}

export default CourseModel